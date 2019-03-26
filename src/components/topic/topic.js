import React, {Component}  from 'react';
import topicsEn from '../../data/topics-en';

export default class Topic extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

	render() {
    return (
      <div className="topic">
        {
          topicsEn.map((topic) =>
            <div>
              <h2>{topic.name}</h2>

              <ul>
                {
                  Object.keys(topic.topics).map((subtopic, i) =>
                    <li key={i}>{subtopic}</li>
                  )
                }
              </ul>

            </div>
          )
        }

      </div>
    );
	}
};