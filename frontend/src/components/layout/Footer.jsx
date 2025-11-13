const Footer = () => (
  <footer className="mt-16 bg-forest text-sand">
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row md:justify-between md:px-6 lg:px-8">
      <div>
        <h3 className="font-heading text-2xl">AnnapurnaAI</h3>
        <p className="mt-3 max-w-xs text-sm text-sand/80">
          Blending the wisdom of Ayurveda with intelligent insights to nourish modern lifestyles.
        </p>
      </div>
      <div>
        <h4 className="text-lg font-semibold uppercase tracking-wide text-accent">Resources</h4>
        <ul className="mt-3 space-y-2 text-sm">
          <li>Daily Dinacharya</li>
          <li>Dosha Balancing Meals</li>
          <li>Mindful Living Guides</li>
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-semibold uppercase tracking-wide text-accent">Connect</h4>
        <ul className="mt-3 space-y-2 text-sm">
          <li>support@annapurnai.com</li>
          <li>+91 90000 12345</li>
          <li>108 Ayurveda Street, Pune</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-white/10">
      <p className="mx-auto max-w-6xl px-4 py-4 text-center text-xs uppercase tracking-widest text-sand/60">
        © {new Date().getFullYear()} AnnapurnaAI – Honouring Ancient Indian Healing
      </p>
    </div>
  </footer>
);

export default Footer;

