import React, {Component} from 'react';
import SubjectsTree from '../components/subjects-tree/subjects-tree';
import TopicList from '../components/topic-list/topic-list';
import Header from '../components/common/header';
import Footer from '../components/common/footer';

export default class AwesomeGamified extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNightlyTheme: true,
    }
  }

  onTopicClick = (topic) => {
    this.setState({
      clickedTopic: topic.repo,
    })
  }

  toggleTheme = (event) => {
    this.setState({isNightlyTheme: !this.state.isNightlyTheme});
  }

  render() {
    const {isNightlyTheme} = this.state;

    return (
      <div className={isNightlyTheme ? 'nightly-theme' : 'brightly-theme'}>
        <div className="content-container">
          <div className="left-container">
            <SubjectsTree
              onTopicClick={this.onTopicClick}
            />
          </div>

          <div className="right-container">
            <Header/>

            <div className="toggle-theme-container">
              <button className="toggle-theme" onClick={this.toggleTheme}>
                Switch to {isNightlyTheme ? 'brightly' : 'nightly'} theme
                <i className={isNightlyTheme ? 'fas fa-sun' : 'fas fa-moon'}></i>
              </button>
            </div>

            <TopicList
              clickedTopic={this.state.clickedTopic}
            />
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}
