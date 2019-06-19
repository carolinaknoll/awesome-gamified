import React, {Component}  from 'react';

export default class SavedItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  handleSavedItemsButtonClick = () => {
    let savedItemsPanel = document.querySelector('.saved-items-panel');

    savedItemsPanel.classList.toggle('open');
  }

  getSavedSeen = () => {
    return this.getSavedItems('savedSeen');
  }

  getSavedBookmarks = () => {
    return this.getSavedItems('savedBookmarks');
  }

  getSavedItems = (savedItemName) => {
    let savedItems = JSON.parse(localStorage.getItem('SavedAwesomeLists'));

    if (savedItems === null) {
      return (<p>You don't currently have saved items in this category.</p>);
    }

    if (savedItems.length > 0) {
      return savedItems[0][savedItemName].map((item, index) => {
        return (<a key={index} className="saved-item" href={item.itemUrl}>{item.itemName}</a>);
      });
    }
  }

	render() {
    return (
      <div className="saved-items-container">
        <button className="button-default" onClick={this.handleSavedItemsButtonClick}>
          <i className="far fa-save"></i>
          View saved items
        </button>

        <div className="saved-items-panel">
          <h2>Saved seen items</h2>
          {this.getSavedSeen()}

          <h2>Saved bookmarked items</h2>
          {this.getSavedBookmarks()}
        </div>
      </div>
    );
	}
};
