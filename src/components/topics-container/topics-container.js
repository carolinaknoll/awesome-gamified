import React, {Component}  from 'react';
import Topic from '../topic/topic';

export default class TopicsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

	render() {
    return (
      <div className="topics-container">
        <Topic />
      </div>
    );
	}
};