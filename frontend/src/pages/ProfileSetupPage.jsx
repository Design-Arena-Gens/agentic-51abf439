import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../components/shared/FormField.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const activityOptions = [
  { value: 'sedentary', label: 'Sedentary' },
  { value: 'light', label: 'Light Activity' },
  { value: 'moderate', label: 'Moderate Activity' },
  { value: 'active', label: 'Active' },
  { value: 'very-active', label: 'Very Active' },
];

const diseaseOptions = [
  'Diabetes',
  'Hypertension',
  'Thyroid imbalance',
  'Digestive issues',
  'Arthritis',
  'Anxiety',
  'PCOS',
];

const ProfileSetupPage = () => {
  const navigate = useNavigate();
  const { updateProfile, user } = useAuth();
  const [form, setForm] = useState({
    heightCm: user?.profile?.heightCm || '',
    weightKg: user?.profile?.weightKg || '',
    activityLevel: user?.profile?.activityLevel || '',
    diseases: user?.profile?.diseases || [],
  });
  const [customDisease, setCustomDisease] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleDisease = (value) => {
    setForm((prev) => {
      const exists = prev.diseases.includes(value);
      return {
        ...prev,
        diseases: exists ? prev.diseases.filter((item) => item !== value) : [...prev.diseases, value],
      };
    });
  };

  const addCustomDisease = () => {
    if (customDisease && !form.diseases.includes(customDisease)) {
      setForm((prev) => ({ ...prev, diseases: [...prev.diseases, customDisease] }));
      setCustomDisease('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await updateProfile({
        heightCm: Number(form.heightCm),
        weightKg: Number(form.weightKg),
        activityLevel: form.activityLevel,
        diseases: form.diseases,
      });
      setMessage('Profile aligned! Redirecting to dashboard...');
      setTimeout(() => navigate('/dashboard'), 800);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to update profile right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="glass-card px-8 py-10">
        <h1 className="font-heading text-3xl text-primary">Tune your Ayurvedic profile</h1>
        <p className="mt-2 text-sm text-forest/70">
          These details fine-tune your food recommendations and daily rituals.
        </p>
        <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              label="Height (cm)"
              name="heightCm"
              type="number"
              value={form.heightCm}
              onChange={handleChange}
              required
            />
            <FormField
              label="Weight (kg)"
              name="weightKg"
              type="number"
              value={form.weightKg}
              onChange={handleChange}
              required
            />
            <FormField
              label="Activity Level"
              name="activityLevel"
              type="select"
              options={activityOptions}
              value={form.activityLevel}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-forest/70">
              Health conditions
            </p>
            <p className="mt-1 text-sm text-forest/60">
              Select what applies so we can balance doshas with precision.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {diseaseOptions.map((option) => {
                const active = form.diseases.includes(option);
                return (
                  <button
                    type="button"
                    key={option}
                    onClick={() => toggleDisease(option)}
                    className={`rounded-full px-4 py-2 text-sm font-medium uppercase tracking-wide transition-all ${
                      active
                        ? 'bg-primary text-white shadow shadow-primary/30'
                        : 'bg-white/80 text-forest hover:bg-primary/10'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex gap-3">
              <input
                type="text"
                value={customDisease}
                onChange={(event) => setCustomDisease(event.target.value)}
                placeholder="Add another condition"
                className="flex-1 rounded-2xl border border-primary/20 bg-white/70 px-4 py-3 text-base text-forest focus:border-primary focus:outline-none"
              />
              <button
                type="button"
                onClick={addCustomDisease}
                className="rounded-2xl border border-primary/30 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-primary hover:bg-primary/10"
              >
                Add
              </button>
            </div>
            {form.diseases.length > 0 && (
              <p className="mt-2 text-sm text-primary/80">
                Selected: {form.diseases.join(', ')}
              </p>
            )}
          </div>

          {message && <p className="text-sm text-primary">{message}</p>}

          <button
            type="submit"
            className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-primary/30 hover:bg-forest disabled:cursor-not-allowed disabled:bg-primary/40"
            disabled={loading}
          >
            {loading ? 'Balancing doshas...' : 'Save profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetupPage;

