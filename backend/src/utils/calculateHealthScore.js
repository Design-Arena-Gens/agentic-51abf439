const dayjs = require('dayjs');

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const scoreFromWater = (value, goal) => {
  if (!goal) return 10;
  const ratio = clamp(value / goal, 0, 2);
  if (ratio >= 1) return 20;
  if (ratio >= 0.75) return 15;
  if (ratio >= 0.5) return 10;
  return 5;
};

const scoreFromCalories = (value, goal) => {
  if (!goal) return 10;
  const diff = Math.abs(value - goal);
  if (diff <= 100) return 20;
  if (diff <= 250) return 15;
  if (diff <= 400) return 10;
  return 5;
};

const scoreFromSleep = (value, goal) => {
  if (!goal) return 10;
  const diff = Math.abs(value - goal);
  if (diff <= 0.5) return 20;
  if (diff <= 1) return 15;
  if (diff <= 2) return 10;
  return 5;
};

const scoreFromWeightTrend = (recentStats = []) => {
  if (recentStats.length < 2) return 10;
  const sorted = [...recentStats].sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());
  const first = sorted[0].weightKg;
  const last = sorted[sorted.length - 1].weightKg;
  if (!first || !last) return 10;
  const change = last - first;
  if (Math.abs(change) <= 0.5) return 20;
  if (Math.abs(change) <= 1) return 15;
  if (Math.abs(change) <= 2) return 10;
  return 5;
};

const calculateHealthScore = ({ user, latestStat, recentStats }) => {
  if (!user) return { score: 50, breakdown: [] };

  const goals = user.goals || {};
  const breakdown = [];
  let total = 0;

  if (latestStat) {
    const waterScore = scoreFromWater(latestStat.waterMl, goals.waterMl);
    breakdown.push({ label: 'Hydration', value: waterScore });
    total += waterScore;

    const calorieScore = scoreFromCalories(latestStat.calories, goals.calories);
    breakdown.push({ label: 'Nutrition', value: calorieScore });
    total += calorieScore;

    const sleepScore = scoreFromSleep(latestStat.sleepHours, goals.sleepHours);
    breakdown.push({ label: 'Sleep', value: sleepScore });
    total += sleepScore;
  } else {
    breakdown.push({ label: 'Hydration', value: 10 });
    breakdown.push({ label: 'Nutrition', value: 10 });
    breakdown.push({ label: 'Sleep', value: 10 });
    total += 30;
  }

  const trendScore = scoreFromWeightTrend(recentStats);
  breakdown.push({ label: 'Weight Trend', value: trendScore });
  total += trendScore;

  const average = Math.round((total / (breakdown.length * 20)) * 100);

  return {
    score: clamp(average, 0, 100),
    breakdown,
  };
};

module.exports = calculateHealthScore;

