import { useState } from 'react';
import FormField from '../shared/FormField.jsx';

const initialState = {
  waterMl: '',
  calories: '',
  sleepHours: '',
  weightKg: '',
  mood: 'balanced',
  notes: '',
};

const moodOptions = [
  { value: 'energised', label: 'Energised' },
  { value: 'balanced', label: 'Balanced' },
  { value: 'tired', label: 'Tired' },
  { value: 'stressed', label: 'Stressed' },
  { value: 'unwell', label: 'Unwell' },
];

const AddStatForm = ({ onSubmit, onClose }) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onSubmit({
        ...form,
        waterMl: Number(form.waterMl),
        calories: Number(form.calories),
        sleepHours: Number(form.sleepHours),
        weightKg: form.weightKg ? Number(form.weightKg) : undefined,
      });
      onClose();
      setForm(initialState);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save stats right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          label="Water Intake (ml)"
          name="waterMl"
          type="number"
          value={form.waterMl}
          onChange={handleChange}
          required
        />
        <FormField
          label="Calories"
          name="calories"
          type="number"
          value={form.calories}
          onChange={handleChange}
          required
        />
        <FormField
          label="Sleep (hours)"
          name="sleepHours"
          type="number"
          value={form.sleepHours}
          onChange={handleChange}
          required
        />
        <FormField
          label="Weight (kg)"
          name="weightKg"
          type="number"
          value={form.weightKg}
          onChange={handleChange}
        />
        <FormField
          label="Mood"
          name="mood"
          type="select"
          options={moodOptions}
          value={form.mood}
          onChange={handleChange}
        />
      </div>
      <FormField
        label="Notes"
        name="notes"
        type="textarea"
        value={form.notes}
        onChange={handleChange}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-primary/30 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary hover:bg-primary/10"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-primary/30 hover:bg-forest disabled:cursor-not-allowed disabled:bg-primary/40"
          disabled={loading}
        >
          {loading ? 'Recording...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default AddStatForm;

