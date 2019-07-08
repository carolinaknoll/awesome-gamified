import React, {Component}  from 'react';
import PropTypes from 'prop-types';
import SavedItems from './saved-items';
import ToggleTheme from './toggle-theme';

export default class Navbar extends Component {
  handleToggleThemeClick = () => {
    this.props.toggleTheme();
  }

	render() {
    return (
      <div className="navbar">
        <h3 className="awesome-text-gradient title">
          <i className="fas fa-glasses"></i> Awesome Gamified
        </h3>

        <ToggleTheme
          isNightlyTheme={this.props.isNightlyTheme}
          toggleTheme={this.props.toggleTheme}
        />

        <SavedItems
          onSavedItemsChange={this.props.onSavedItemsChange}
          savedItems={this.props.savedItems}
        />
      </div>
    );
	}
}

Navbar.propTypes = {
  isNightlyTheme: PropTypes.bool.isRequired,
  onSavedItemsChange: PropTypes.func.isRequired,
  savedItems: PropTypes.array,
  toggleTheme: PropTypes.func.isRequired
}
