const User = require('../models/User');

const deriveGoals = ({ weightKg, activityLevel }) => {
  let waterMl = 2500;
  let calories = 2000;
  let sleepHours = 7;

  if (weightKg) {
    waterMl = Math.round(weightKg * 30 + 500);
  }

  switch (activityLevel) {
    case 'sedentary':
      calories = 1800;
      sleepHours = 8;
      break;
    case 'light':
      calories = 2000;
      sleepHours = 7.5;
      break;
    case 'moderate':
      calories = 2200;
      sleepHours = 7;
      break;
    case 'active':
      calories = 2400;
      sleepHours = 7;
      break;
    case 'very-active':
      calories = 2600;
      sleepHours = 6.5;
      break;
    default:
      break;
  }

  return { waterMl, calories, sleepHours };
};

const getMe = async (req, res) => {
  res.json({ user: req.user });
};

const updateProfile = async (req, res) => {
  const { heightCm, weightKg, activityLevel, diseases = [] } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const nextDiseases = Array.isArray(diseases) ? diseases : user.profile?.diseases || [];

    user.profile = {
      heightCm: heightCm !== undefined ? Number(heightCm) : user.profile?.heightCm,
      weightKg: weightKg !== undefined ? Number(weightKg) : user.profile?.weightKg,
      activityLevel: activityLevel ?? user.profile?.activityLevel,
      diseases: nextDiseases,
    };

    user.goals = deriveGoals({
      weightKg: user.profile?.weightKg,
      activityLevel: user.profile?.activityLevel,
    });

    user.profileCompleted = true;
    await user.save();

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMe,
  updateProfile,
};
