import React, {Component}  from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {sortByNameAscending, toggleDifferentClasses} from '../common/helpers';

SubjectsTree.propTypes = {
  onTopicClick: PropTypes.func.isRequired,
}

export default class SubjectsTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
      subjects: {},
    };
  }

  getSubjectEntries = () => {
    axios.get('https://raw.githubusercontent.com/lockys/awesome.json/master/awesome/awesome.json')
    .then((subjects) => {
      this.setState({
        subjects: subjects.data,
        errorMessage: '',
      });

      if (!this.state.subjects) {
        this.setState({
          errorMessage: 'There was an error. Unable to load the Awesome subjects.'
        });
      }
    }).catch((error) => {
      this.setState({
        errorMessage: `There was an error. Unable to load the Awesome subjects: ${error}.`
      });
    });
  }

  componentDidMount() {
    this.getSubjectEntries();
  }

  renderSubjectTree = () => {
    const {subjects} = this.state;

    if (subjects) {
      return (
        Object.keys(subjects).sort().map((subject) => {
          return (
            <div key={subject} className="subjects-tree-container">
              <div className="subject-container" onClick={(e) => this.toggleTopicOpenClass(e)}>
                <i className='chevron-icon tree-icon fas fa-chevron-circle-right'></i>
                <h3 className="subject-title">{subject}</h3>
              </div>

              <div className='subject-topic-list-container'>
                {this.renderSubjectTopics(subjects, subject)}
              </div>
            </div>
          )
        })
      )
    }
  }

  toggleTopicOpenClass = (e) => {
    e.target.nextSibling.classList.toggle('open');
    this.toggleChevronClass(e);
  }

  toggleChevronClass = (e) => {
    if (e) {
      let chevronIcon = e.target.querySelector('.chevron-icon');

      toggleDifferentClasses(chevronIcon, 'fa-chevron-circle-right', 'fa-chevron-circle-down');
    }
  }

  toggleChevronClassWithoutEvent = () => {
    let chevronIconElements = Array.from(document.getElementsByClassName('chevron-icon'));

    chevronIconElements.map((element) => {
      toggleDifferentClasses(element, 'fa-chevron-circle-right', 'fa-chevron-circle-down');
    });
  }

  renderSubjectTopics = (subjects, subject) => {
    sortByNameAscending(subjects[subject]);

    return subjects[subject].map((topic) => {
      return (
        <div key={topic.url} className="topic-container" onClick={(e) => this.handleTopicClick(e, topic)}>
          <i className="topic-icon far fa-bookmark"></i>
          <p className="topic-name">{topic.name}</p>
        </div>
      )
    })
  }

  handleTopicClick = (e, topic) => {
    let topicNameContainers = Array.from(document.getElementsByClassName('topic-container'));

    topicNameContainers.map((name) => {
      if (name.classList.contains('selected')) {
        name.classList.remove('selected');
      }
    })

    e.target.classList.add('selected');

    this.props.onTopicClick(topic);
  }

  toggleSubjectTopics = () => {
    let topicContainers = Array.from(document.getElementsByClassName('subject-topic-list-container'));

    topicContainers.map((container) => {
      container.classList.toggle('open');
    })

    this.toggleChevronClassWithoutEvent();
  }

	render() {
    return (
      <div className="subjects">
        <div className="awesome-text-gradient subjects-tree-title-container">
          <i className="awesome-text-gradient tree-icon fas fa-book-open"></i>
          <h3 className="subject-title">Choose a subject below:</h3>
          <p className="toggle-subject-topics" onClick={this.toggleSubjectTopics}>
            <i className="awesome-text-gradient topic-icon far fa-bookmark"></i>
            Open/Close all subject topics
          </p>
        </div>
        {this.renderSubjectTree()}
      </div>
    );
	}
}
