import React, {Component}  from 'react';
import axios from 'axios';
import {sortByNameAscending} from '../../common/helpers';

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

      if (chevronIcon.classList.contains('fa-chevron-circle-right')) {
        chevronIcon.classList.remove('fa-chevron-circle-right');
        chevronIcon.classList.add('fa-chevron-circle-down');
      } else {
        chevronIcon.classList.remove('fa-chevron-circle-down');
        chevronIcon.classList.add('fa-chevron-circle-right');
      }
    }
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
      container.classList.contains('open')
        ? container.classList.remove('open')
        : container.classList.add('open');
    })
  }

	render() {
    return (
      <div className="subjects">
        <div className="subjects-tree-title-container">
          <i className="tree-icon fas fa-book-open"></i>
          <h3 className="subject-title">Choose a subject below:</h3>
          <p className="toggle-subject-topics" onClick={this.toggleSubjectTopics}>
            <i className="topic-icon far fa-bookmark"></i>
            Open/Close all subject topics
          </p>
        </div>
        {this.renderSubjectTree()}
      </div>
    );
	}
};
