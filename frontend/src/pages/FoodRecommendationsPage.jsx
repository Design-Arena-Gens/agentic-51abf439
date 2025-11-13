import { useEffect, useState } from 'react';
import FormField from '../components/shared/FormField.jsx';
import { recommendationApi } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

const diseaseOptions = [
  'Diabetes',
  'Hypertension',
  'Digestive issues',
  'Arthritis',
  'Respiratory issues',
  'Skin disorders',
  'Anxiety',
  'Thyroid imbalance',
];

const doshaOptions = [
  { value: 'vata', label: 'Vata' },
  { value: 'pitta', label: 'Pitta' },
  { value: 'kapha', label: 'Kapha' },
];

const FoodRecommendationsPage = () => {
  const { user } = useAuth();
  const [query, setQuery] = useState({
    disease: '',
    activityLevel: user?.profile?.activityLevel || '',
    dosha: '',
  });
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadFoods = async (params) => {
    setLoading(true);
    try {
      const { data } = await recommendationApi.getFoods(params);
      setFoods(data.foods || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFoods({ disease: 'digestive issues' });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    loadFoods({
      disease: query.disease,
      activityLevel: query.activityLevel,
      dosha: query.dosha,
    });
  };

  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h1 className="font-heading text-4xl text-primary">Food Recommendations</h1>
        <p className="text-forest/70">
          Choose your condition or dosha emphasis to receive curated meals and rituals.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card grid gap-6 px-6 py-6 md:grid-cols-4">
        <FormField
          label="Disease Focus"
          name="disease"
          type="select"
          options={diseaseOptions.map((option) => ({ value: option.toLowerCase(), label: option }))}
          value={query.disease}
          onChange={(event) => setQuery((prev) => ({ ...prev, disease: event.target.value }))}
        />
        <FormField
          label="Activity Level"
          name="activityLevel"
          type="select"
          options={[
            { value: 'sedentary', label: 'Sedentary' },
            { value: 'light', label: 'Light' },
            { value: 'moderate', label: 'Moderate' },
            { value: 'active', label: 'Active' },
            { value: 'very-active', label: 'Very Active' },
          ]}
          value={query.activityLevel}
          onChange={(event) => setQuery((prev) => ({ ...prev, activityLevel: event.target.value }))}
        />
        <FormField
          label="Dosha Emphasis"
          name="dosha"
          type="select"
          options={doshaOptions}
          value={query.dosha}
          onChange={(event) => setQuery((prev) => ({ ...prev, dosha: event.target.value }))}
        />
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow shadow-primary/30 hover:bg-forest disabled:cursor-not-allowed disabled:bg-primary/40"
            disabled={loading}
          >
            {loading ? 'Infusing wisdom...' : 'Get Recommendations'}
          </button>
        </div>
      </form>

      {loading ? (
        <div className="flex min-h-[20vh] items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {foods.map((food) => (
            <article key={food.name} className="glass-card px-7 py-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="font-heading text-2xl text-primary">{food.name}</h2>
                <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                  {food.mealType}
                </span>
              </div>
              <p className="mt-4 text-forest/80">{food.description}</p>
              <p className="mt-4 text-sm uppercase tracking-widest text-secondary">
                Balances: {food.dosha?.join(', ')}
              </p>
              <div className="mt-4">
                <p className="text-sm font-semibold uppercase tracking-widest text-forest/70">
                  Benefits
                </p>
                <ul className="mt-2 space-y-2 text-sm text-forest/70">
                  {food.benefits?.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary/20 text-xs text-secondary">
                        ✺
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <p className="text-sm font-semibold uppercase tracking-widest text-forest/70">
                  Sacred Ingredients
                </p>
                <p className="mt-1 text-sm text-forest/70">{food.ingredients?.join(', ')}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodRecommendationsPage;

