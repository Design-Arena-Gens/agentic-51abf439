import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormField from '../components/shared/FormField.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
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
      const user = await login(form);
      if (user.profileCompleted) {
        navigate('/dashboard');
      } else {
        navigate('/profile-setup');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      <div className="glass-card px-8 py-10">
        <h1 className="font-heading text-3xl text-primary">Welcome back, seeker</h1>
        <p className="mt-2 text-sm text-forest/70">
          Enter your sacred space to continue your Ayurvedic journey.
        </p>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-primary/30 hover:bg-forest disabled:cursor-not-allowed disabled:bg-primary/40"
            disabled={loading}
          >
            {loading ? 'Opening gates...' : 'Login'}
          </button>
        </form>
        <p className="mt-6 text-sm text-forest/70">
          New to AnnapurnaAI?{' '}
          <Link to="/signup" className="text-primary hover:text-forest">
            Create your account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

