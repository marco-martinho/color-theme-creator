import "./Color.css";

export default function Color({ color }) {
  return (
    <section
      className="color-card"
      style={{ backgroundColor: color.hex, color: color.contrastText }}
    >
      <h1>{color.role}</h1>
      <p>{color.hex}</p>
    </section>
  );
}
