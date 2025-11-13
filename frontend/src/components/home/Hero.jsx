import { Link } from 'react-router-dom';

const Hero = () => (
  <section className="glass-card mx-auto mt-6 grid gap-10 px-8 py-12 md:grid-cols-[2fr,1fr]">
    <div>
      <p className="uppercase tracking-[0.3em] text-secondary">Ancient Nourishment</p>
      <h1 className="mt-4 font-heading text-4xl leading-tight text-primary md:text-5xl">
        Discover Ancient Foods for Modern Health
      </h1>
      <p className="mt-6 text-lg text-forest/70">
        Personalised Ayurvedic recommendations rooted in the Himalayan wisdom of Annapurna,
        blending seasonal foods, mindful rituals, and holistic insights.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          to="/signup"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md shadow-primary/30 hover:bg-forest"
        >
          Begin Your Journey
        </Link>
        <Link
          to="/recommendations"
          className="rounded-full border border-primary/30 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary hover:bg-primary/10"
        >
          Explore Foods
        </Link>
      </div>
    </div>
    <div className="relative hidden md:block">
      <div className="absolute inset-0 -translate-x-6 -translate-y-6 rounded-3xl bg-gradient-to-br from-secondary/20 to-primary/10 blur-xl" />
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
        alt="Ayurvedic ingredients"
        className="relative h-full w-full rounded-3xl object-cover shadow-soft"
      />
    </div>
  </section>
);

export default Hero;

