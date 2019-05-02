import React, {Component}  from 'react';
import axios from 'axios';

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
        Object.keys(subjects).map((subject) => {
          return (
            <div className="subjects-tree-container">
              <div className="subject-container" onClick={(e) => this.toggleTopicOpenClass(e)}>
                <i className='chevron-icon fas fa-chevron-circle-right'></i>
                <h3 className="subject-title">{subject}</h3>
              </div>

              <div className='topic-list-container'>
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
    return subjects[subject].map((topic) => {
      return (
        <div className="topic-container">
          <i className="topic-icon far fa-bookmark"></i>

          <a href={topic.url}>
            <p className="topic-name">{topic.name}</p>
          </a>
        </div>
      )
    })
  }

	render() {
    return (
      <div className="subjects">
        {this.renderSubjectTree()}
      </div>
    );
	}
};
