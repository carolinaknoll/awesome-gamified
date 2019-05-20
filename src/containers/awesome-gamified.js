import React, {Component} from 'react';
import SubjectsTree from '../components/subjects-tree/subjects-tree';
import TopicList from '../components/topic-list/topic-list';
import Navbar from '../components/navbar/navbar';
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
            <Navbar
              toggleTheme={this.toggleTheme}
              isNightlyTheme={this.state.isNightlyTheme}
            />

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
