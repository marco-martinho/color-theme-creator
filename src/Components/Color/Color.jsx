import "./Color.css";
import { useState } from "react";
import ColorForm from "./ColorForm/ColorForm";
import CopyToClipboard from "./CopyToClipboard/CopyToClipboard";
import ContrastChecker from "./ContrastChecker/ContrastChecker";

export default function Color({ color, onDeleteColor, onUpdateColor }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [previewColor, setPreviewColor] = useState(color);

  const displayedColor = isEditing ? previewColor : color;

  function handleStartEditing() {
    setPreviewColor(color);
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setPreviewColor(color);
    setIsEditing(false);
  }

  return (
    <section
      className="color-card"
      style={{
        backgroundColor: displayedColor.hex,
        color: displayedColor.contrastText,
      }}
    >
      <h1>{displayedColor.role}</h1>

      <CopyToClipboard hex={displayedColor.hex} />
      <ContrastChecker
        hex={displayedColor.hex}
        contrastText={displayedColor.contrastText}
      />

      {isEditing ? (
        <ColorForm
          initialColor={color}
          onUpdateColor={onUpdateColor}
          onPreviewChange={setPreviewColor}
          onCancel={handleCancelEditing}
        />
      ) : isConfirming ? (
        <>
          <p>Are you sure?</p>
          <button onClick={() => onDeleteColor(color.id)}>Confirm</button>
          <button onClick={() => setIsConfirming(false)}>Cancel</button>
        </>
      ) : (
        <>
          <button onClick={() => setIsConfirming(true)}>Delete</button>
          <button onClick={handleStartEditing}>Edit</button>
        </>
      )}
    </section>
  );
}
