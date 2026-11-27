export default function ColorInput({ label, name, value, onChange }) {
  return (
    <div className="color-form-field">
      <label htmlFor={name}>{label}</label>

      {/* #2 and #4 Pick a colour or enter its hex value */}
      <input
        type="color"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}
