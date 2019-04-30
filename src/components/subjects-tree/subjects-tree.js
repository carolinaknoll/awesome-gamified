import React, {Component}  from 'react';
import axios from 'axios';

export default class SubjectsTree extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
            <div>
              <h3>{subject}</h3>
              {this.renderSubjectSubjects(subjects, subject)}
            </div>
          )
        })
      )
    }
  }


  renderSubjectSubjects = (subjects, subject) => {
    return subjects[subject].map((entry) => {
      return (
        <div>
          <a href={entry.url}>
            <p>{entry.name}</p>
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
