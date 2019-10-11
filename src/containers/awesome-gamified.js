import React, {Component} from 'react';
import SubjectsTree from '../components/subjects-tree';
import TopicList from '../components/topic-list';
import Navbar from '../components/navbar';
import Header from '../components/header';
import Footer from '../components/footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { connect } from "react-redux";
import { fetchSubjects } from "../actions/actions";

class AwesomeGamified extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clickedTopic: '',
      isNightlyTheme: true,
      isSubjectsTreeOpen: false
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

  onListButtonClick = () => {
    this.setState({isSubjectsTreeOpen: !this.state.isSubjectsTreeOpen});
  }

  render() {
    const {isNightlyTheme, isSubjectsTreeOpen, clickedTopic} = this.state;

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
          onListButtonClick={this.onListButtonClick}
          savedItems={this.state.savedItems}
        />

        <div className="content-container">
          <div className="left-container desktop">
            <SubjectsTree
              onTopicClick={this.onTopicClick}
              isNightlyTheme={this.state.isNightlyTheme}
            />
          </div>

          <div className="right-container desktop">
            <Header
              clickedTopic={this.state.clickedTopic}
            />

            { clickedTopic ?
              <TopicList
                clickedTopic={this.state.clickedTopic}
                onSavedItemsChange={this.onSavedItemsChange}
                savedItems={this.state.savedItems}
              /> : null }
          </div>

            <div className={`mobile mobile-subjectsTree ${!isSubjectsTreeOpen ? 'mobile-none' : ''}`}>
              <SubjectsTree
                onTopicClick={this.onTopicClick}
              />
            </div>

            <div className={`right-container mobile ${isSubjectsTreeOpen ? 'mobile-none' : ''}`}>
              <Header
                clickedTopic={this.state.clickedTopic}
              />

            { clickedTopic ?
              <TopicList
                clickedTopic={this.state.clickedTopic}
                onSavedItemsChange={this.onSavedItemsChange}
                savedItems={this.state.savedItems}
              /> : null }
            </div>
        </div>

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { subjects } = state;
  return { subjects };
}

export default connect(mapStateToProps, {fetchSubjects})(AwesomeGamified);
