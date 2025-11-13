import { useEffect, useState } from 'react';
import Hero from '../components/home/Hero.jsx';
import { recommendationApi, remedyApi } from '../services/api.js';

const defaultFoods = [
  {
    name: 'Moong Dal Khichdi',
    description: 'A sattvic blend to soothe digestion and kindle gentle Agni.',
    mealType: 'Lunch ritual',
    benefits: ['Balances all doshas', 'Easy on digestion'],
  },
  {
    name: 'Tulsi Ginger Tea',
    description: 'Sacred infusion to clear Ama and uplift prana.',
    mealType: 'Morning tonic',
    benefits: ['Boosts immunity', 'Deeply grounding'],
  },
  {
    name: 'Saffron Almond Milk',
    description: 'Cooling elixir that nourishes Ojas and invites restful sleep.',
    mealType: 'Evening elixir',
    benefits: ['Improves sleep', 'Supports hormonal balance'],
  },
];

const HomePage = () => {
  const [foods, setFoods] = useState(defaultFoods);
  const [remedy, setRemedy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [foodRes, remedyRes] = await Promise.all([
          recommendationApi.getFoods({ disease: 'digestion' }),
          remedyApi.getToday(),
        ]);

        if (foodRes.data?.foods?.length) {
          setFoods(foodRes.data.foods.slice(0, 3));
        }
        setRemedy(remedyRes.data?.remedy);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="space-y-16">
      <Hero />

      <section>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="section-title">Featured Foods</h2>
            <p className="mt-2 text-forest/70">
              Curated dishes that restore harmony between body, mind, and spirit.
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {foods.map((food) => (
            <article key={food.name} className="glass-card p-6">
              <h3 className="font-heading text-2xl text-primary">{food.name}</h3>
              <p className="mt-3 text-sm uppercase tracking-widest text-secondary">
                {food.mealType}
              </p>
              <p className="mt-4 text-forest/80">{food.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-forest/70">
                {food.benefits?.slice(0, 3).map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                      ✽
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="glass-card grid gap-10 px-8 py-10 md:grid-cols-2">
        <div>
          <h2 className="section-title">Remedy of the Day</h2>
          {loading && !remedy ? (
            <p className="mt-4 text-forest/60">Invoking ancient wisdom...</p>
          ) : remedy ? (
            <>
              <h3 className="mt-6 font-heading text-2xl text-primary">{remedy.title}</h3>
              <p className="mt-4 text-forest/80">{remedy.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-forest/70">
                {remedy.instructions?.map((step) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-secondary/20 font-semibold text-secondary">
                      ॐ
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="mt-4 text-forest/80">
              Begin your healing with simple rituals—sip warm water, breathe deeply, and eat with
              presence.
            </p>
          )}
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/20 p-8">
          <h3 className="font-heading text-2xl text-primary">About Ayurveda</h3>
          <p className="mt-4 text-forest/80">
            Ayurveda views food as medicine, aligning meals with your dosha, season, and digestive
            fire. AnnapurnaAI bridges millennium-old kitchen wisdom with modern analytics, guiding
            you to cultivate Ojas—radiant vitality.
          </p>
          <div className="mt-6 grid gap-4">
            {['Seasonal Eating', 'Mindful Rituals', 'Dosha Balance'].map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center justify-center rounded-full bg-white/70 px-4 py-2 text-sm font-medium uppercase tracking-wide text-primary shadow shadow-primary/5"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

