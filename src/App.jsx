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

  return (
    <>
      <h1>Theme Creator</h1>

      <ColorForm onAddColor={handleAddColor} />

      {colors.map((color) => (
        <Color key={color.id} color={color} />
      ))}
    </>
  );
}
