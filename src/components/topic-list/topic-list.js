import React, {Component}  from 'react';
import axios from 'axios';
import marked from 'marked';

export default class TopicList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
      topicMarkdown: '',
    };
  }

  //todo: if url with uppercased 'README.md' not found, try url with lowercased 'readme.md'
  getRawAwesomeListContent = () => {
    axios.get(`https://raw.githubusercontent.com/${this.props.clickedTopic}/master/README.md`)
    .then((topicMarkdown) => {
      this.setState({
        topicMarkdown: topicMarkdown.data,
        errorMessage: '',
      });

      if (!this.state.topicMarkdown) {
        this.setState({
          errorMessage: 'There was an error. Unable to load the Awesome list.'
        });
      }
    }).catch((error) => {
      this.setState({
        errorMessage: `There was an error. Unable to load the Awesome list: ${error}.`
      });
    });
  }

  componentWillReceiveProps() {
    this.getRawAwesomeListContent();
  }

  setupCustomMarked() {
    let customMarked = marked;

    customMarked.setOptions({
      breaks: true,
    });

    return customMarked;
  }

  renderTopicList = () => {
    let customMarked = this.setupCustomMarked();

    if (this.state.topicMarkdown) {
      return (
        <div dangerouslySetInnerHTML={{__html: customMarked(this.state.topicMarkdown)}}></div>
      )
    }
  }

	render() {
    return (
      <div className="topic-container">
        {this.renderTopicList()}
      </div>
    );
	}
};
