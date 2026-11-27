import { useState, useEffect } from "react";

export default function CopyToClipboard({ hex }) {
  const [isCopied, setIsCopied] = useState(false);

  // #6 Copy the colour hex value to the clipboard
  async function handleCopy() {
    await navigator.clipboard.writeText(hex);
    setIsCopied(true);
  }

  // Reset the confirmation message after three seconds
  useEffect(() => {
    if (isCopied) {
      const timeoutId = setTimeout(() => {
        setIsCopied(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [isCopied]);

  return (
    <>
      <button onClick={handleCopy}>Copy to Clipboard</button>
      {isCopied && <p>Color copied successfully!</p>}
    </>
  );
}
