import { useState } from "react";
import { nanoid } from "nanoid";
import ColorInput from "../ColorInput/ColorInput";

export default function ColorForm({
  onAddColor,
  initialColor,
  onUpdateColor,
  onPreviewChange,
  onCancel,
}) {
  // #2 Add a new colour or #4 edit an existing one
  const [color, setColor] = useState(
    initialColor || {
      role: "",
      hex: "#000000",
      contrastText: "#FFFFFF",
    },
  );

  // #4 Update the colour preview while editing
  function handleChange(event) {
    const updatedColor = {
      ...color,
      [event.target.name]: event.target.value,
    };

    setColor(updatedColor);
    onPreviewChange?.(updatedColor);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // #4 Save changes to the existing colour
    if (initialColor) {
      onUpdateColor({
        ...color,
        id: initialColor.id,
      });
      onCancel();
    } else {
      // #2 Add a new colour with a unique ID
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
  }

  return (
    <form className="color-form" onSubmit={handleSubmit}>
      <div className="color-form-field">
        <label htmlFor="role">Role</label>
        <input
          id="role"
          name="role"
          value={color.role}
          onChange={handleChange}
          required
        />
      </div>

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

      <button type="submit">
        {initialColor ? "Save Changes" : "Add Color"}
      </button>

      {initialColor && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}
