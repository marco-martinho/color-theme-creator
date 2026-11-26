export default function ColorInput({ label, name, value, onChange }) {
  return (
    <div className="color-form-field">
      <label htmlFor={name}>{label}</label>

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
