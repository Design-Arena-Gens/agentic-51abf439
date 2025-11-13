const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
  options,
}) => (
  <label className="flex flex-col gap-2 text-sm font-semibold uppercase tracking-widest text-forest/70">
    {label}
    {type === 'select' ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="rounded-2xl border border-primary/20 bg-white/70 px-4 py-3 text-base font-normal normal-case text-forest shadow-inner focus:border-primary focus:outline-none"
      >
        <option value="">Select...</option>
        {options?.map((option) => (
          <option key={option.value || option} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    ) : type === 'textarea' ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="h-32 rounded-2xl border border-primary/20 bg-white/70 px-4 py-3 text-base font-normal normal-case text-forest shadow-inner focus:border-primary focus:outline-none"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="rounded-2xl border border-primary/20 bg-white/70 px-4 py-3 text-base font-normal normal-case text-forest shadow-inner focus:border-primary focus:outline-none"
      />
    )}
  </label>
);

export default FormField;

