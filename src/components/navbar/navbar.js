import React, {Component}  from 'react';
import SavedItems from '../saved-items/saved-items';

export default class Navbar extends Component {
  handleToggleThemeClick = () => {
    this.props.toggleTheme();
  }

	render() {
    const {isNightlyTheme} = this.props;

    return (
      <div className="navbar">
        <h3 className="awesome-text-gradient title">
          <i className="fas fa-glasses"></i> Awesome Gamified
        </h3>

        <div className="toggle-theme-container">
          <button className="button-default" onClick={this.handleToggleThemeClick}>
            <i className={isNightlyTheme ? 'awesome-text-gradient fas fa-sun' : 'awesome-text-gradient fas fa-moon'}></i>
            Switch to {isNightlyTheme ? 'brightly' : 'nightly'} theme
          </button>
        </div>

        <SavedItems
          onSavedItemsChange={this.props.onSavedItemsChange}
          savedItems={this.props.savedItems}
        />
      </div>
    );
	}
}
