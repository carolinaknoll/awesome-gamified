import React, {Component}  from 'react';
import topicsEn from '../../data/topics-en';

export default class Topic extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  addThemedStyles = (topic) => {
    if (this.props.isNightlyTheme) {
      return {
        backgroundColor: topic.nightlyBackground,
        borderColor: '#FFF'
      }
    } else {
      return {
        backgroundColor: topic.brightlyBackground,
        borderColor: '#000'
      }
    }
  }

	render() {
    return (
      <div className="topic">
        {
          topicsEn.map((topic) =>
            <div className="topic-box" style={this.addThemedStyles(topic)}>
              <i className={`icon ${topic.icon}`} style={this.addThemedStyles(topic)}></i>

              <h2>{topic.name}</h2>

              <ul>
                {
                  Object.keys(topic.subtopics).map((subtopic, i) =>
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