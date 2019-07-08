import React from "react";
import PropTypes from "prop-types";

export default function ToggleTheme({ isNightlyTheme, toggleTheme }) {
  return (
    <div className="toggle-theme-container">
      <button className="button-default" onClick={toggleTheme}>
        <i
          className={
            isNightlyTheme
              ? "awesome-text-gradient fas fa-sun"
              : "awesome-text-gradient fas fa-moon"
          }
        ></i>
        Switch to {isNightlyTheme ? "brightly" : "nightly"} theme
      </button>
    </div>
  );
}

ToggleTheme.propTypes = {
  isNightlyTheme: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired
};
