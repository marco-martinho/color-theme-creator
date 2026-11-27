import "./Color.css";
import { useState } from "react";
import ColorForm from "./ColorForm/ColorForm";
import CopyToClipboard from "./CopyToClipboard/CopyToClipboard";
import ContrastChecker from "./ContrastChecker/ContrastChecker";

export default function Color({
  color,
  onDeleteColor,
  onUpdateColor,
  isReadOnly = false,
}) {
  // #3 Delete confirmation and #4 editing state
  const [isConfirming, setIsConfirming] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // #4 Preview colour changes before saving
  const [previewColor, setPreviewColor] = useState(color);

  const displayedColor = isEditing ? previewColor : color;

  function handleStartEditing() {
    setPreviewColor(color);
    setIsEditing(true);
  }

  // #4 Restore the original colour when cancelling
  function handleCancelEditing() {
    setPreviewColor(color);
    setIsEditing(false);
  }

  return (
    <section className="color-card">
      {/* #1 Display the colour role */}
      <h2>{displayedColor.role}</h2>

      <div
        className="color-swatch"
        style={{
          backgroundColor: displayedColor.hex,
          color: displayedColor.contrastText,
        }}
      >
        {displayedColor.hex}
      </div>

      {/* #6 Copy the colour hex value */}
      <CopyToClipboard hex={displayedColor.hex} />

      {/* #7 Check contrast using the current colour values */}
      <ContrastChecker
        hex={displayedColor.hex}
        contrastText={displayedColor.contrastText}
      />

      {/* #8 Keep the default theme read-only */}
      {!isReadOnly &&
        (isEditing ? (
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
            {/* #3 Delete and #4 edit the colour */}
            <button onClick={() => setIsConfirming(true)}>Delete</button>
            <button onClick={handleStartEditing}>Edit</button>
          </>
        ))}
    </section>
  );
}
