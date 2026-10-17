import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { getDBStatus } from '../db.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret_jwt_key_fallback';

// Fallback in-memory store if DB is offline
const memoryUsers = new Map();

// Helper to authenticate token
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token invalid or expired' });
    req.user = user;
    next();
  });
};

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, plan } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password required' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const dbStatus = getDBStatus();
    let savedUser;

    if (dbStatus.connected) {
      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) return res.status(400).json({ error: 'Email already registered' });

      savedUser = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        plan: plan || 'free',
        balanceUsdc: 10000.0,
      });
    } else {
      // Memory fallback
      if (memoryUsers.has(email.toLowerCase())) {
        return res.status(400).json({ error: 'Email already registered (Local)' });
      }
      savedUser = {
        _id: 'local_' + Date.now(),
        name,
        email: email.toLowerCase(),
        plan: plan || 'free',
        balanceUsdc: 10000.0,
        savedStrategies: [],
        createdAt: new Date(),
      };
      memoryUsers.set(email.toLowerCase(), { ...savedUser, password: hashedPassword });
    }

    const token = jwt.sign(
      { id: savedUser._id, email: savedUser.email, name: savedUser.name, plan: savedUser.plan },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        plan: savedUser.plan,
        balanceUsdc: savedUser.balanceUsdc,
        savedStrategies: savedUser.savedStrategies || [],
      },
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Failed to create user account' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const dbStatus = getDBStatus();
    let user;
    let isMatch = false;

    if (dbStatus.connected) {
      user = await User.findOne({ email: email.toLowerCase() });
      if (user) {
        isMatch = await bcrypt.compare(password, user.password);
      }
    } else {
      user = memoryUsers.get(email.toLowerCase());
      if (user) {
        isMatch = await bcrypt.compare(password, user.password);
      }
    }

    if (!user || !isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name, plan: user.plan },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        balanceUsdc: user.balanceUsdc,
        savedStrategies: user.savedStrategies || [],
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const dbStatus = getDBStatus();
    let user;
    if (dbStatus.connected) {
      user = await User.findById(req.user.id).select('-password');
    } else {
      user = memoryUsers.get(req.user.email);
    }

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update Plan (Pricing selection)
router.post('/plan', authenticateToken, async (req, res) => {
  try {
    const { plan } = req.body;
    if (!['free', 'pro', 'institutional'].includes(plan)) {
      return res.status(400).json({ error: 'Invalid plan selected' });
    }

    const dbStatus = getDBStatus();
    if (dbStatus.connected) {
      const updated = await User.findByIdAndUpdate(
        req.user.id,
        { plan },
        { new: true }
      ).select('-password');
      return res.json({ message: `Plan upgraded to ${plan}`, user: updated });
    } else {
      const user = memoryUsers.get(req.user.email);
      if (user) user.plan = plan;
      return res.json({ message: `Plan upgraded to ${plan}`, user });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update plan' });
  }
});

export default router;
