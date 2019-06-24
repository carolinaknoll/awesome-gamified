import React, {Component}  from 'react';
import SavedItems from '../saved-items/saved-items';
export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  handleToggleThemeClick = () => {
    this.props.toggleTheme();
  }

	render() {
    const {isNightlyTheme} = this.props;

    return (
      <div className="navbar">
        <h3 className="title">Awesome Gamified</h3>

        <div className="toggle-theme-container">
          <button className="button-default" onClick={this.handleToggleThemeClick}>
            <i className={isNightlyTheme ? 'fas fa-sun' : 'fas fa-moon'}></i>
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
};
