import React, { Component } from 'react';

export default class Header extends Component {
  showHeaderOnlyWhenClickedTopicIsEmpty = () => {
    if (!this.props.clickedTopic) {
      return (
        <header className="header">
          <h1 className="title">Welcome to Awesome Gamified!</h1>
          <h3 className="subtitle">See your progress and save awesome links you've already seen!</h3>
        </header>
      );
    }
  }

  render() {
    return (
      <div className="header-wrapper">
        {this.showHeaderOnlyWhenClickedTopicIsEmpty()}
      </div>
    );
  }
}
