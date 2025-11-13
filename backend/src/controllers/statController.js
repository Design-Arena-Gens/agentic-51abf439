const dayjs = require('dayjs');
const { validationResult } = require('express-validator');
const DailyStat = require('../models/DailyStat');
const calculateHealthScore = require('../utils/calculateHealthScore');

const normalizeDate = (date) => dayjs(date).startOf('day').toDate();

const getStats = async (req, res) => {
  try {
    const recentStats = await DailyStat.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(14)
      .lean();

    const latestStat = recentStats[0];
    const health = calculateHealthScore({
      user: req.user,
      latestStat,
      recentStats,
    });

    res.json({
      healthScore: health,
      stats: recentStats.reverse(),
      goals: req.user.goals,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addStat = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { date, waterMl, calories, sleepHours, weightKg, mood, notes } = req.body;
  const normalizedDate = normalizeDate(date || new Date());

  try {
    const stat = await DailyStat.findOneAndUpdate(
      { user: req.user._id, date: normalizedDate },
      {
        user: req.user._id,
        date: normalizedDate,
        waterMl,
        calories,
        sleepHours,
        weightKg,
        mood,
        notes,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(201).json({ stat });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Stat for this date already exists' });
    }
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStats,
  addStat,
};
