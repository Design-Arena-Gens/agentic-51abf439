import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormField from '../components/shared/FormField.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const initialState = {
  name: '',
  email: '',
  password: '',
  age: '',
  gender: '',
};

const genderOptions = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
];

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
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
      await signup({ ...form, age: Number(form.age) });
      navigate('/profile-setup');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="glass-card px-8 py-10">
        <h1 className="font-heading text-3xl text-primary">Create your healing profile</h1>
        <p className="mt-2 text-sm text-forest/70">
          Share your details to receive Ayurvedic insights tailored for you.
        </p>
        <form className="mt-8 grid gap-6 md:grid-cols-2" onSubmit={handleSubmit}>
          <FormField
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <FormField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <FormField
            label="Age"
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
            required
          />
          <FormField
            label="Gender"
            name="gender"
            type="select"
            options={genderOptions}
            value={form.gender}
            onChange={handleChange}
            required
          />
          <div className="md:col-span-2">
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              className="mt-4 w-full rounded-full bg-secondary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-secondary/30 hover:bg-clay disabled:cursor-not-allowed disabled:bg-secondary/40"
              disabled={loading}
            >
              {loading ? 'Aligning energies...' : 'Sign up'}
            </button>
          </div>
        </form>
        <p className="mt-6 text-sm text-forest/70">
          Already initiated?{' '}
          <Link to="/login" className="text-primary hover:text-forest">
            Return to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

