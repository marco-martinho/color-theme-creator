import { useState } from "react";
import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/Color/ColorForm/ColorForm";

import "./App.css";

export default function App() {
  const [colors, setColors] = useState(initialColors);

  function handleAddColor(newColor) {
    setColors([newColor, ...colors]);
  }

  function handleDeleteColor(id) {
    setColors((currentColors) =>
      currentColors.filter((color) => color.id !== id),
    );
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onAddColor={handleAddColor} />

      {colors.length === 0 && <p>No colors left. Add some new colors!</p>}
      {colors.map((color) => (
        <Color key={color.id} color={color} onDeleteColor={handleDeleteColor} />
      ))}
    </>
  );
}
