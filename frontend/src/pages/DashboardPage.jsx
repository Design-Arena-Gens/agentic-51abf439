import { useEffect, useMemo, useState } from 'react';
import { dashboardApi } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import StatCard from '../components/dashboard/StatCard.jsx';
import TrendChart from '../components/dashboard/TrendChart.jsx';
import AddStatForm from '../components/dashboard/AddStatForm.jsx';

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState([]);
  const [health, setHealth] = useState({ score: 0, breakdown: [] });
  const [goals, setGoals] = useState({});
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const latest = useMemo(() => (stats.length ? stats[stats.length - 1] : null), [stats]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const { data } = await dashboardApi.getStats();
      setStats(data.stats || []);
      setHealth(data.healthScore || { score: 0, breakdown: [] });
      setGoals(data.goals || {});
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleAddStat = async (payload) => {
    await dashboardApi.addStat(payload);
    await fetchStats();
  };

  const hydrationTrend = latest
    ? `${latest.waterMl || 0} ml / ${goals.waterMl || 2000} ml`
    : 'Awaiting logs';
  const nutritionTrend = latest
    ? `${latest.calories || 0} kcal / ${goals.calories || 2000} kcal`
    : 'Log today’s meals';
  const sleepTrend = latest
    ? `${latest.sleepHours || 0} hrs / ${goals.sleepHours || 7} hrs`
    : 'Rest wisely tonight';

  const chartData = stats.map((entry) => ({
    ...entry,
    date: entry.date,
  }));

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <p className="uppercase tracking-[0.3em] text-secondary">Welcome {user?.name}</p>
        <h1 className="font-heading text-4xl text-primary">Your Wellness Dashboard</h1>
        <p className="text-forest/70">
          Trace your daily rituals, stay hydrated, and let AnnapurnaAI craft balanced recommendations.
        </p>
      </div>

      {loading ? (
        <div className="flex min-h-[30vh] items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-4">
            <StatCard
              title="Health Score"
              value={health.score}
              unit="/100"
              trend={health.breakdown?.map((item) => `${item.label}: ${item.value}`).join(' • ')}
              accent="text-secondary"
            />
            <StatCard title="Water Intake" value={latest?.waterMl || 0} unit="ml" trend={hydrationTrend} />
            <StatCard title="Calories" value={latest?.calories || 0} unit="kcal" trend={nutritionTrend} />
            <StatCard title="Sleep" value={latest?.sleepHours || 0} unit="hrs" trend={sleepTrend} />
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="section-title">Trends</h2>
              <p className="mt-2 text-forest/70">Observe how your body responds to nurturing rituals.</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-secondary/30 hover:bg-clay"
            >
              Add Today&apos;s Stats
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <TrendChart
              title="Weight Journey"
              data={chartData}
              lines={[{ dataKey: 'weightKg', label: 'Weight (kg)', color: '#2f5233' }]}
            />
            <TrendChart
              title="Calorie Rhythm"
              data={chartData}
              lines={[
                { dataKey: 'calories', label: 'Calories', color: '#a6905d' },
                { dataKey: 'waterMl', label: 'Water ml', color: '#2f5233' },
              ]}
            />
          </div>
        </>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="glass-card w-full max-w-2xl p-8">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-2xl text-primary">Log Today&apos;s Rituals</h3>
              <button
                onClick={() => setShowForm(false)}
                className="rounded-full border border-primary/20 p-2 text-primary hover:bg-primary/10"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="mt-6">
              <AddStatForm onSubmit={handleAddStat} onClose={() => setShowForm(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;

