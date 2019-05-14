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

  getRawAwesomeListContent = (readmeUrl) => {
    axios.get(readmeUrl)
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
        errorMessage: `There was an error. Unable to load the Awesome list: ${error}.`,
        topicMarkdown: ''
      });
    });
  }

  prepareRawAwesomeListRequest = () => {
    const uppercasedReadmeUrl = `https://raw.githubusercontent.com/${this.props.clickedTopic}/master/README.md`;
    const lowercasedReadmeUrl = `https://raw.githubusercontent.com/${this.props.clickedTopic}/master/readme.md`;

    this.getRawAwesomeListContent(uppercasedReadmeUrl);

    if (this.state.errorMessage.includes('404')) {
      this.getRawAwesomeListContent(lowercasedReadmeUrl);
    }
  }

  componentWillReceiveProps() {
    this.prepareRawAwesomeListRequest();
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
      <div className="topic-list-container">
        {this.renderTopicList()}
      </div>
    );
	}
};
