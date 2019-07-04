import React, { Component } from 'react';

export default class Header extends Component {
  showHeaderOnlyWhenClickedTopicIsEmpty = () => {
    if (!this.props.clickedTopic) {
      return (
        <header className="header">
          <h1 className="awesome-text-gradient"><i className="fas fa-glasses"></i> Welcome to Awesome Gamified!</h1>
          <h3 className="subtitle">See your progress and save awesome links you've already seen!</h3>
          <hr className="awesome-gradient"></hr>

          <h2>The process is simple, just follow the <span className="awesome-text-gradient">1-2-3!</span></h2>
          <div className="instructions-container">
            <h3><span className="awesome-text-gradient"><i className="fas fa-glasses"></i> 1: </span>
              Select a subject from the subject list on your left. Click it, and you should see all of the supported Awesome Lists that
              GitHub users have created for your selected subject.
            </h3>

            <h3><span className="awesome-text-gradient"><i className="fas fa-glasses"></i> 2: </span>
              Click on the Awesome List you wish to see, and it will appear right here!
            </h3>

            <h3><span className="awesome-text-gradient"><i className="fas fa-glasses"></i> 3: </span>
              You can then scroll, add and remove topics from your selected list, and see all of them on your Saved Items panel, if you click
              on <span className="awesome-text-gradient">'View Saved Items'</span> above.
            </h3>
          </div>

          <h3>
            Now that you know <span className="awesome-text-gradient"> everything you need,</span> make sure to explore and save items you
            wish to mark as seen, or to bookmark for later review! <i className="awesome-text-gradient fas fa-glasses"></i>
          </h3>

          <hr className="awesome-gradient"></hr>

          <h3><i className="awesome-text-gradient fas fa-hand-holding-heart"></i> Huge thanks to
            <span className="awesome-text-gradient"> <a href="https://github.com/lockys">Lockys</a></span> for his
            <span className="awesome-text-gradient"> AwesomeSearch</span> project and <span className="awesome-text-gradient">
            <a href="https://raw.githubusercontent.com/lockys/awesome.json/master/awesome/awesome.json">Awesome JSON</a></span> file, which
            feeds all of the subjects on the sidenav on the left!
          </h3>
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
