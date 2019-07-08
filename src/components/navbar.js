import React from "react";
import PropTypes from "prop-types";
import SavedItems from "./saved-items";
import ToggleTheme from "./toggle-theme";

export default function Navbar({
  isNightlyTheme,
  toggleTheme,
  onSavedItemsChange,
  savedItems
}) {
  return (
    <div className="navbar">
      <h3 className="awesome-text-gradient title">
        <i className="fas fa-glasses"></i> Awesome Gamified
      </h3>

      <ToggleTheme isNightlyTheme={isNightlyTheme} toggleTheme={toggleTheme} />

      <SavedItems
        onSavedItemsChange={onSavedItemsChange}
        savedItems={savedItems}
      />
    </div>
  );
}

Navbar.propTypes = {
  isNightlyTheme: PropTypes.bool.isRequired,
  onSavedItemsChange: PropTypes.func.isRequired,
  savedItems: PropTypes.array,
  toggleTheme: PropTypes.func.isRequired
};
