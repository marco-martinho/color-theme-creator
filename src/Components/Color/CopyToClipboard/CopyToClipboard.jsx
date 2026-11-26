import { useState, useEffect } from "react";

export default function CopyToClipboard({ hex }) {
  const [isCopied, setIsCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(hex);
    setIsCopied(true);
  }

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
