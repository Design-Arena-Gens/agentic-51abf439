import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="mx-auto max-w-xl text-center">
    <div className="glass-card px-10 py-12">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">404</p>
      <h1 className="mt-4 font-heading text-4xl text-primary">Path not found</h1>
      <p className="mt-4 text-forest/70">
        The herbs you seek are in another garden. Return to the home mandala to continue your
        journey.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow shadow-primary/30 hover:bg-forest"
      >
        Back to Home
      </Link>
    </div>
  </div>
);

export default NotFoundPage;

