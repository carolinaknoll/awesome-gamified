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

  renderTopicSubtopicEntries = () => {
    return topicsEn.map((topic) =>
      <div className="topic-box" style={this.addThemedStyles(topic)}>
        <i className={`icon ${topic.icon}`} style={this.addThemedStyles(topic)}></i>
        <h2>{topic.name}</h2>

        {
          topic.subtopics.map((subtopic, index) => {

            return Object.keys(subtopic).map((subject) => {

              return subtopic[subject].map((entry) => {

                return  <div className="topics-content">
                          <h3>{subject}</h3>
                          <a href={entry.url}>{entry.name}</a>
                        </div>
              })
            })
          })
        }

      </div>
    )
  }

	render() {
    return (
      <div className="topic">
        {this.renderTopicSubtopicEntries()}
      </div>
    );
	}
};