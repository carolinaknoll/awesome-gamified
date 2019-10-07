import React, {Component}  from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import marked from 'marked';
import {SAVED_ITEM_TYPES} from '../common/variables';
import {compareObjects, notifyAction} from '../common/helpers';

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
          errorMessage: `There was an error. Unable to load the Awesome list for ${this.props.clickedTopic}.`
        });
      }
    }).catch((error) => {
      this.setState({
        errorMessage: `There was an error. Unable to load the Awesome list for ${this.props.clickedTopic}. ${error}.`,
        topicMarkdown: ''
      });
    });
  }

  getReadmeFile = () => {
    if (!this.props.clickedTopic) {
      return;
    }

    axios.get(`https://api.github.com/repos/${this.props.clickedTopic}/readme`)
    .then((res) => {
      const { data: { download_url } } = res;
      return this.getRawAwesomeListContent(download_url);
    })
    .catch((error) => {
      this.setState({
        errorMessage: `There was an error. Unable to load the Awesome list for ${this.props.clickedTopic}. ${error}.`,
        topicMarkdown: ''
      })
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.clickedTopic !== prevProps.clickedTopic) {
      this.getReadmeFile();
    }
  }

  setupCustomMarked() {
    let customMarked = marked;

    customMarked.setOptions({
      breaks: true,
    });

    return customMarked;
  }

  addButtonsToListElements = (parsedMarkdown) => {
    let startingHtmlString = `<li><span><button class="seen button-default">[Seen]</button><button class="bookmark button-default">[<i class="fas fa-star"></i>]</button>`;
    let endingHtmlString = `</span></li>`;

    parsedMarkdown = parsedMarkdown
      .replace(/<li>/g, startingHtmlString)
      .replace(/<\/li>/g, endingHtmlString);

    return parsedMarkdown;
  }

  handleTopicHtmlClick = (e) => {
    let hasSeenClass = e.target.classList.contains('seen');
    let hasBookmarkClass = e.target.classList.contains('bookmark');

    if (!hasSeenClass && !hasBookmarkClass) {
      return;
    }

    let itemSubjectInfoContainer = document.querySelector('.topic-container.selected');

    let itemSubjectName = itemSubjectInfoContainer.parentElement.parentElement.getElementsByClassName('subject-title')[0].innerHTML;
    let itemTopicName = itemSubjectInfoContainer.getElementsByClassName('topic-name')[0].innerHTML;

    let itemToSave = {
      itemSubjectName: itemSubjectName,
      itemTopicName: itemTopicName,
    }

    if (hasSeenClass) {
      itemToSave.itemName = e.target.parentElement.getElementsByTagName('a')[0].text;
      itemToSave.itemUrl = e.target.parentElement.getElementsByTagName('a')[0].href;
      itemToSave.itemLocation = 'savedSeen';
    }

    if (hasBookmarkClass) {
      itemToSave.itemName = e.target.parentElement.parentElement.getElementsByTagName('a')[0].text;
      itemToSave.itemUrl = e.target.parentElement.parentElement.getElementsByTagName('a')[0].href;
      itemToSave.itemLocation = 'savedBookmarks';
    }

    this.saveNewItem(itemToSave);
  }

  saveNewItem = (itemToSave) => {
    let savedItems = JSON.parse(localStorage.getItem('SavedAwesomeLists')) || [SAVED_ITEM_TYPES];

    let locationToSave = itemToSave.itemLocation;

    const itemArray = savedItems[0][locationToSave];

    // This checks if itemToSave is already present in the bookmark list
    if (itemArray.some(ob => compareObjects(ob, itemToSave))) {
      // Item already exists
      notifyAction(
        itemToSave.itemName,
        itemToSave.itemLocation,
        "fa-smile-wink",
        "already added to"
      );
    } else {
      savedItems[0][locationToSave].push(itemToSave);

      localStorage.setItem("SavedAwesomeLists", JSON.stringify(savedItems));

      this.props.onSavedItemsChange(savedItems);

      notifyAction(
        itemToSave.itemName,
        itemToSave.itemLocation,
        "fa-smile-wink",
        "saved to"
      );
    }
  }

  renderTopicList = () => {
    let customMarked = this.setupCustomMarked();

    if (this.state.topicMarkdown) {
      let parsedMarkdown = customMarked(this.state.topicMarkdown);
      parsedMarkdown = this.addButtonsToListElements(parsedMarkdown);

      return (
        <div dangerouslySetInnerHTML={{__html: parsedMarkdown}} onClick={this.handleTopicHtmlClick}></div>
      )
    }
  }

	render() {
    return (
      <div className="topic-list-container">
      {this.props.clickedTopic ? (
        this.renderTopicList()
      ) : null}
      </div>
    );
	}
}

TopicList.propTypes = {
  onSavedItemsChange: PropTypes.func.isRequired,
  clickedTopic: PropTypes.string.isRequired
}
