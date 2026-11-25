import { useState } from "react";
import { nanoid } from "nanoid";
import ColorInput from "../ColorInput/ColorInput";

export default function ColorForm({ onAddColor }) {
  const [color, setColor] = useState({
    role: "",
    hex: "#000000",
    contrastText: "#FFFFFF",
  });

  function handleChange(event) {
    setColor({
      ...color,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    onAddColor({
      id: nanoid(),
      ...color,
    });

    setColor({
      role: "",
      hex: "#000000",
      contrastText: "#FFFFFF",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="role">Role</label>
      <input
        id="role"
        name="role"
        value={color.role}
        onChange={handleChange}
        required
      />

      <ColorInput
        label="Hex"
        name="hex"
        value={color.hex}
        onChange={handleChange}
      />

      <ColorInput
        label="Contrast Text"
        name="contrastText"
        value={color.contrastText}
        onChange={handleChange}
      />

      <button type="submit">Add Color</button>
    </form>
  );
}
