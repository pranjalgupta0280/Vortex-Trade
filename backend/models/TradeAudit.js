import mongoose from 'mongoose';

const tradeAuditSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  symbol: {
    type: String,
    required: true,
    default: 'ETHUSDC',
  },
  action: {
    type: String,
    enum: ['LONG', 'SHORT', 'HOLD', 'CLOSE'],
    required: true,
  },
  confidence: {
    type: Number,
    min: 0,
    max: 100,
  },
  price: {
    type: Number,
    required: true,
  },
  stopLoss: Number,
  takeProfit: Number,
  positionSizeEth: Number,
  technicalContext: {
    emaShort: Number,
    emaLong: Number,
    macd: Number,
    macdSignal: Number,
    macdHist: Number,
    rsi: Number,
  },
  llmRationale: {
    type: String,
    required: true,
  },
  riskValidation: {
    passed: { type: Boolean, default: true },
    reason: String,
    maxDrawdownLimit: Number,
    positionExposureLimit: Number,
  },
  executionNetwork: {
    type: String,
    default: 'Lighter Protocol Testnet',
  },
  txHash: {
    type: String,
    default: () => '0x' + Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10) + '...testnet',
  },
  status: {
    type: String,
    enum: ['SIMULATED_FILLED', 'REJECTED_RISK', 'SUBMITTED_TESTNET', 'HELD'],
    default: 'SIMULATED_FILLED',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const TradeAudit = mongoose.model('TradeAudit', tradeAuditSchema);
