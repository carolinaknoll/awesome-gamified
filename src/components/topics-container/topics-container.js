import React, {Component}  from 'react';
import Topic from '../topic/topic';
import SubjectsTree from '../subjects-tree/subjects-tree';

export default class TopicsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

	render() {
    return (
      <div className="topics-container">
        <SubjectsTree/>

        <Topic
          isNightlyTheme={this.props.isNightlyTheme}
        />

      </div>
    );
	}
};