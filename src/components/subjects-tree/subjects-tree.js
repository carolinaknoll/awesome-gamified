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

	render() {
    return (
      <div className="subjects">
      </div>
    );
	}
};