import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

console.log('Testing connection to MongoDB with Google DNS...');
try {
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
  console.log('MongoDB connected successfully!');
  await mongoose.disconnect();
} catch (err) {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
}

