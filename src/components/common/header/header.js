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
          <h3><span className="awesome-text-gradient"><i className="fas fa-glasses"></i> 1:</span> Select a subject from the subject list on your right. Click it, and you should see all of the supported Awesome Lists that GitHub users have created for your selected subject.</h3>
          <h3><span className="awesome-text-gradient"><i className="fas fa-glasses"></i> 2:</span> Click on the Awesome List you wish to see, and it will appear right here!</h3>
          <h3><span className="awesome-text-gradient"><i className="fas fa-glasses"></i> 3:</span> You can then scroll, add and remove topics from your selected list, and see all of them on your Saved Items panel, if you click on 'View Saved Items' above.</h3>
          <h3>Now that you know <span className="awesome-text-gradient"> everything you need,</span> make sure to explore and save items you wish to mark as seen, or to bookmark for later review! <i className="fas fa-glasses"></i></h3>

          <hr className="awesome-gradient"></hr>
          <h3>A big thanks to <a href="https://github.com/lockys"><span className="awesome-text-gradient"> Lockys</span></a> for his AwesomeSearch project and <span className="awesome-text-gradient"><a href="https://raw.githubusercontent.com/lockys/awesome.json/master/awesome/awesome.json">Awesome JSON</a></span> file, which feeds all of the subjects on the sidenav on the left! <span className="awesome-text-gradient"><i className="fas fa-glasses"></i></span></h3>
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
