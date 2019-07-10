import React, {Component} from 'react';
import SubjectsTree from '../components/subjects-tree';
import TopicList from '../components/topic-list';
import Navbar from '../components/navbar';
import Header from '../components/header';
import Footer from '../components/footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default class AwesomeGamified extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clickedTopic: '',
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

  onNavbarClick = () => {
    this.setState({clickedTopic: ''});
  }

  render() {
    const {isNightlyTheme} = this.state;

    return (
      <div className={isNightlyTheme ? 'nightly-theme' : 'brightly-theme'}>
        <ToastContainer
          toastClassName='toast-container'
          bodyClassName='toast-container'
          autoClose={4000}
        />

        <Navbar
          toggleTheme={this.toggleTheme}
          isNightlyTheme={this.state.isNightlyTheme}
          onSavedItemsChange={this.onSavedItemsChange}
          onNavbarClick={this.onNavbarClick}
          savedItems={this.state.savedItems}
        />

        <div className="content-container">
          <div className="left-container">
            <SubjectsTree
              onTopicClick={this.onTopicClick}
            />
          </div>

          <div className="right-container">
            <Header
              clickedTopic={this.state.clickedTopic}
            />

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
