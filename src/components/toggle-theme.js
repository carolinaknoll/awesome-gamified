import React, {Component}  from 'react';

export default class ToggleTheme extends Component {
  handleToggleThemeClick = () => {
    this.props.toggleTheme();
  }

	render() {
    const {isNightlyTheme} = this.props;

    return (
      <div className="toggle-theme-container">
        <button className="button-default" onClick={this.handleToggleThemeClick}>
          <i className={isNightlyTheme ? 'awesome-text-gradient fas fa-sun' : 'awesome-text-gradient fas fa-moon'}></i>
          Switch to {isNightlyTheme ? 'brightly' : 'nightly'} theme
        </button>
      </div>
    );
	}
}
