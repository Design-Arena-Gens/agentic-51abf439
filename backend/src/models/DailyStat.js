const mongoose = require('mongoose');

const dailyStatSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: () => new Date(), index: true },
    waterMl: { type: Number, default: 0 },
    calories: { type: Number, default: 0 },
    sleepHours: { type: Number, default: 0 },
    weightKg: Number,
    mood: {
      type: String,
      enum: ['energised', 'balanced', 'tired', 'stressed', 'unwell'],
      default: 'balanced',
    },
    notes: String,
  },
  { timestamps: true }
);

dailyStatSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('DailyStat', dailyStatSchema);

