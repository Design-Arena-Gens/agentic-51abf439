const StatCard = ({ title, value, unit, trend, accent }) => (
  <div className="glass-card flex flex-col justify-between p-6">
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">{title}</p>
      <p className="mt-4 text-4xl font-bold text-primary">
        {value}
        {unit && <span className="ml-1 text-base font-semibold text-forest/50">{unit}</span>}
      </p>
    </div>
    {trend && (
      <p className={`mt-4 text-sm font-semibold ${accent || 'text-primary/70'}`}>{trend}</p>
    )}
  </div>
);

export default StatCard;

