import React from "react";
import PropTypes from "prop-types";
import SavedItems from "./saved-items";
import ToggleTheme from "./toggle-theme";

export default function Navbar({
  isNightlyTheme,
  toggleTheme,
  onSavedItemsChange,
  onNavbarClick,
  onListButtonClick,
  savedItems
}) {
  return (
    <div className="navbar">
      <i className="awesome-text-gradient fas fa-list list-button" onClick={onListButtonClick}></i>

      <h3 className="awesome-text-gradient title" onClick={onNavbarClick}>
        <i className="fas fa-glasses"></i> Awesome Gamified
      </h3>

      <div className="desktop">
        <SavedItems
          onSavedItemsChange={onSavedItemsChange}
          savedItems={savedItems}
        />
      </div>

      <div className="mobile">
        <SavedItems
          onSavedItemsChange={onSavedItemsChange}
          savedItems={savedItems}
          showText={false}
        />
      </div>

      <div className="desktop">
        <ToggleTheme isNightlyTheme={isNightlyTheme} toggleTheme={toggleTheme} />
      </div>

      <div className="mobile">
        <ToggleTheme isNightlyTheme={isNightlyTheme} toggleTheme={toggleTheme} showText={false} />
      </div>      
    </div>
  );
}

Navbar.propTypes = {
  isNightlyTheme: PropTypes.bool.isRequired,
  onSavedItemsChange: PropTypes.func.isRequired,
  onNavbarClick: PropTypes.func.isRequired,
  savedItems: PropTypes.array,
  toggleTheme: PropTypes.func.isRequired
};
