import "./Color.css";
import { useState } from "react";

export default function Color({ color, onDeleteColor }) {
  const [isConfirming, setIsConfirming] = useState(false);
  return (
    <section
      className="color-card"
      style={{ backgroundColor: color.hex, color: color.contrastText }}
    >
      <h1>{color.role}</h1>

      {isConfirming ? (
        <>
          <p>Are you sure?</p>
          <button onClick={() => onDeleteColor(color.id)}>Confirm</button>
          <button onClick={() => setIsConfirming(false)}>Cancel</button>
        </>
      ) : (
        <button onClick={() => setIsConfirming(true)}>Delete</button>
      )}
    </section>
  );
}
