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

  onSavedItemsChange = (savedItems) => {
    this.setState({
      savedItems: savedItems,
    })
  }

  toggleTheme = () => {
    this.setState({isNightlyTheme: !this.state.isNightlyTheme});
  }

  render() {
    const {isNightlyTheme} = this.state;

    return (
      <div className={isNightlyTheme ? 'nightly-theme' : 'brightly-theme'}>

        <Navbar
          toggleTheme={this.toggleTheme}
          isNightlyTheme={this.state.isNightlyTheme}
          onSavedItemsChange={this.onSavedItemsChange}
          savedItems={this.state.savedItems}
        />

        <div className="content-container">
          <div className="left-container">
            <SubjectsTree
              onTopicClick={this.onTopicClick}
            />
          </div>

          <div className="right-container">
            <TopicList
              clickedTopic={this.state.clickedTopic}
              onSavedItemsChange={this.onSavedItemsChange}
              savedItems={this.state.savedItems}
            />
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}
