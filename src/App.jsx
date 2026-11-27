import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { nanoid } from "nanoid";
import { initialColors, initialThemes } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/Color/ColorForm/ColorForm";
import "./App.css";

export default function App() {
  // #5 Persist colours and themes in localStorage
  const [legacyColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

  // #8 Store multiple independent themes
  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: [
      {
        ...initialThemes[0],
        colors: legacyColors,
      },
    ],
  });

  const [activeThemeId, setActiveThemeId] = useLocalStorageState(
    "activeThemeId",
    {
      defaultValue: "t1",
    },
  );

  const [newThemeName, setNewThemeName] = useState("");

  const activeTheme =
    themes.find((theme) => theme.id === activeThemeId) || themes[0];

  // #8 Create a new theme with independent colour IDs
  function handleAddTheme(event) {
    event.preventDefault();

    const trimmedName = newThemeName.trim();

    if (!trimmedName || !activeTheme) return;

    const newTheme = {
      id: nanoid(),
      name: trimmedName,
      colors: activeTheme.colors.map((color) => ({
        ...color,
        id: nanoid(),
      })),
    };

    setThemes((currentThemes) => [...currentThemes, newTheme]);
    setActiveThemeId(newTheme.id);
    setNewThemeName("");
  }

  // #8 Delete the selected theme (except the default)
  function handleDeleteTheme() {
    if (!activeTheme || activeTheme.id === "t1") return;

    setThemes((currentThemes) =>
      currentThemes.filter((theme) => theme.id !== activeTheme.id),
    );

    setActiveThemeId("t1");
  }

  // #2 Add a colour to the active theme
  // #8 Keep colour changes independent between themes
  function handleAddColor(newColor) {
    setThemes((currentThemes) =>
      currentThemes.map((theme) =>
        theme.id === activeTheme.id
          ? { ...theme, colors: [newColor, ...theme.colors] }
          : theme,
      ),
    );
  }

  // #3 Delete a colour from the active theme
  // #8 Keep colour changes independent between themes
  function handleDeleteColor(id) {
    setThemes((currentThemes) =>
      currentThemes.map((theme) =>
        theme.id === activeTheme.id
          ? {
              ...theme,
              colors: theme.colors.filter((color) => color.id !== id),
            }
          : theme,
      ),
    );
  }

  // #4 Update a colour in the active theme
  // #8 Keep colour changes independent between themes
  function handleUpdateColor(updatedColor) {
    setThemes((currentThemes) =>
      currentThemes.map((theme) =>
        theme.id === activeTheme.id
          ? {
              ...theme,
              colors: theme.colors.map((color) =>
                color.id === updatedColor.id ? updatedColor : color,
              ),
            }
          : theme,
      ),
    );
  }

  if (!activeTheme) {
    return <p>No themes available.</p>;
  }

  const isDefaultTheme = activeTheme.id === "t1";

  return (
    <>
      <h1 className="app-title">Theme Creator</h1>

      {/* #8 Select, create and delete themes */}
      <section className="theme-controls">
        <label htmlFor="theme-select">Select Theme</label>

        <select
          id="theme-select"
          value={activeTheme.id}
          onChange={(event) => setActiveThemeId(event.target.value)}
        >
          {themes.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.name}
            </option>
          ))}
        </select>

        <form onSubmit={handleAddTheme}>
          <label htmlFor="new-theme-name">New Theme Name</label>

          <input
            id="new-theme-name"
            value={newThemeName}
            onChange={(event) => setNewThemeName(event.target.value)}
            placeholder="Enter theme name"
            required
          />

          <button type="submit">Create Theme</button>
        </form>

        {!isDefaultTheme && (
          <button type="button" onClick={handleDeleteTheme}>
            Delete Theme
          </button>
        )}
      </section>

      <h2>{activeTheme.name}</h2>

      {/* #2 Add colours; the default theme remains read-only */}
      {!isDefaultTheme && <ColorForm onAddColor={handleAddColor} />}

      {/* #1 Display the colours belonging to the selected theme */}
      {activeTheme.colors.length === 0 && (
        <p>No colors left. Add some new colors!</p>
      )}

      <div className="color-grid">
        {activeTheme.colors.map((color) => (
          <Color
            key={color.id}
            color={color}
            onDeleteColor={handleDeleteColor}
            onUpdateColor={handleUpdateColor}
            isReadOnly={isDefaultTheme}
          />
        ))}
      </div>
    </>
  );
}
