const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const activityLevels = ['sedentary', 'light', 'moderate', 'active', 'very-active'];

const profileSchema = new mongoose.Schema(
  {
    heightCm: Number,
    weightKg: Number,
    activityLevel: {
      type: String,
      enum: activityLevels,
    },
    diseases: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const goalSchema = new mongoose.Schema(
  {
    waterMl: { type: Number, default: 2000 },
    calories: { type: Number, default: 2000 },
    sleepHours: { type: Number, default: 7 },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    age: { type: Number, min: 12, max: 100 },
    gender: {
      type: String,
      enum: ['male', 'female', 'non-binary', 'prefer-not-to-say'],
      default: 'prefer-not-to-say',
    },
    profile: profileSchema,
    goals: goalSchema,
    profileCompleted: { type: Boolean, default: false },
    lastLoginAt: Date,
  },
  { timestamps: true }
);

userSchema.pre('save', async function preSave(next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  return next();
});

userSchema.methods.comparePassword = async function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);

