import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    enum: ['free', 'pro', 'institutional'],
    default: 'free',
  },
  balanceUsdc: {
    type: Number,
    default: 10000.0,
  },
  savedStrategies: [
    {
      name: String,
      symbol: { type: String, default: 'ETHUSDC' },
      emaShort: { type: Number, default: 9 },
      emaLong: { type: Number, default: 21 },
      riskPerTradePercent: { type: Number, default: 2 },
      maxLeverage: { type: Number, default: 3 },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model('User', userSchema);
