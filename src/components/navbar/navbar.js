import React, {Component}  from 'react';

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
            <button className="toggle-theme" onClick={this.handleToggleThemeClick}>
              Switch to {isNightlyTheme ? 'brightly' : 'nightly'} theme
              <i className={isNightlyTheme ? 'fas fa-sun' : 'fas fa-moon'}></i>
            </button>
          </div>
      </div>
    );
	}
};
