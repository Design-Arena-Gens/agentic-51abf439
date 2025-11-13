import { useEffect, useState } from 'react';
import { remedyApi } from '../services/api.js';

const RemediesPage = () => {
  const [remedies, setRemedies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRemedies = async () => {
      try {
        const { data } = await remedyApi.getAll();
        setRemedies(data.remedies || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRemedies();
  }, []);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-heading text-4xl text-primary">Healing Remedies</h1>
        <p className="mt-2 text-forest/70">
          Traditional protocols distilled from Ayurvedic scriptures to support your healing.
        </p>
      </div>

      {loading ? (
        <div className="flex min-h-[30vh] items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
        </div>
      ) : (
        <div className="space-y-6">
          {remedies.map((remedy) => (
            <article key={remedy.title} className="glass-card px-8 py-10">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
                {remedy.focus}
              </p>
              <h2 className="mt-3 font-heading text-3xl text-primary">{remedy.title}</h2>
              <p className="mt-4 text-forest/80">{remedy.description}</p>
              <ol className="mt-6 space-y-3 text-sm text-forest/70">
                {remedy.instructions?.map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default RemediesPage;

