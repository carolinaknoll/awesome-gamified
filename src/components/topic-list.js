import React, {Component}  from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import marked from 'marked';
import {SAVED_ITEM_TYPES} from '../common/variables';
import {notifyAction} from '../common/helpers';
import firebase, { auth, provider } from '../firebase/firebase';

export default class TopicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      topicMarkdown: '',
      selected: '',
      email:'',
      user: ''
    }
    this.login = this.login.bind(this); 
    this.logout = this.logout.bind(this); 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /* **********************************
  * Controller of firebase applications
  * Developed by Elio Neto
  * From OpenSource Community 
  ********************************** */

 componentDidMount() {
  auth.onAuthStateChanged((user, email) => {
    if (user) {
      this.setState({ user, email });
    } 
  });
}

logout() {
  auth.signOut()
  .then(() => {
    this.setState({
      user: null,
      email:null
    });
  });
}
login() {
  auth.signInWithPopup(provider) 
    .then((result) => {
      const user = result.user;
      const email = result.email;
      this.setState({
        user,
        email
      });
    });
}
handleChange(e) {
  this.setState({
    [e.target.name]: e.target.value
  });
}
handleSubmit(e) {
  e.preventDefault();
  const itemsRef = firebase.database().ref('sharedPreferences');
  const item = {
    user: this.state.user.displayName,
    email: this.state.user.email, 
    selected: this.state.selected
  }
  itemsRef.push(item);
  this.setState({
    username: '',
    email: '',
    selected: ''
  });
}



/* *********************************************** */
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

  prepareRawAwesomeListRequest = () => {
    if (!this.props.clickedTopic) {
      return;
    }

    const uppercasedReadmeUrl = `https://raw.githubusercontent.com/${this.props.clickedTopic}/master/README.md`;
    console.log(uppercasedReadmeUrl);
    const lowercasedReadmeUrl = `https://raw.githubusercontent.com/${this.props.clickedTopic}/master/readme.md`;

    this.getRawAwesomeListContent(uppercasedReadmeUrl, function() {
      if (this.state.errorMessage.includes('404')) {
        this.getRawAwesomeListContent(lowercasedReadmeUrl);
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.clickedTopic !== prevProps.clickedTopic) {
      this.prepareRawAwesomeListRequest(prevProps);
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
    let startingHtmlString = `<li><span><button class="seen button-default">[Seen]</button><button class="button-default">[<i class="bookmark fas fa-star"></i>]</button>`;
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

    savedItems[0][locationToSave].push(itemToSave);

    localStorage.setItem('SavedAwesomeLists', JSON.stringify(savedItems));

    this.props.onSavedItemsChange(savedItems);

    notifyAction(itemToSave.itemName, itemToSave.itemLocation, 'fa-smile-wink', 'saved to');
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
        {/* <p>{this.props.clickedTopic}</p> */}
        {this.state.user ? 
          <div>
            <button onClick={this.handleSubmit}>Submit</button>
            <input type='hidden' value = {this.state.user.email} ></input>
            <input type='hidden' value = {this.state.selected = this.props.clickedTopic} ></input>
          </div>
          : 
          <div>
            <button onClick={this.login}>Log In</button>   
          </div>
        }
        {this.renderTopicList()}
      </div>
    );
	}
}

TopicList.propTypes = {
  onSavedItemsChange: PropTypes.func.isRequired,
  clickedTopic: PropTypes.string.isRequired
}
