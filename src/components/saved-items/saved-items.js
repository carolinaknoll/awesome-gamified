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
        return (
          <div key={index} className="saved-item-container">
            <button
              className="button-default"
              onClick={() => this.handleSavedItemsRemoveItemButtonClick(savedItems, savedItemName, index)}
            >
              [Remove]
            </button>
            <a className="saved-item" href={item.itemUrl}>{item.itemName}</a>
          </div>
        );
      });
    }
  }

  handleSavedItemsRemoveItemButtonClick = (savedItems, savedItemName, savedItemIndex) => {
    let savedItemsArrayWithoutRemovedElement = savedItems[0][savedItemName].filter((item, index) => {
      return savedItemIndex !== index;
    });

    savedItems[0][savedItemName] = savedItemsArrayWithoutRemovedElement;

    localStorage.setItem('SavedAwesomeLists', JSON.stringify(savedItems));

    this.props.onSavedItemsChange(savedItems);
  }

  componentDidMount = () => {
    document.addEventListener('click', this.handleClickOutsidePanel)
  }

  handleClickOutsidePanel = (e) => {
    let isSavedItemsPanelOpen = document.querySelector('.saved-items-panel').classList.contains('open');
    let isClickOutsideSavedItemsPanel = !e.target.classList.contains('saved-items-panel');
    let isClickOutsideSavedItemsPanelButton = !e.target.classList.contains('saved-items-button');
    let isClickOutsidePanelItemsContainer = !e.target.parentNode.classList.contains('saved-items-container');
    let isClickOutsidePanelItemContainer = !e.target.parentNode.classList.contains('saved-item-container');

    if (isSavedItemsPanelOpen && isClickOutsideSavedItemsPanel) {
      if (isClickOutsideSavedItemsPanelButton && isClickOutsidePanelItemsContainer && isClickOutsidePanelItemContainer) {
        let savedItemsPanel = document.querySelector('.saved-items-panel');
        savedItemsPanel.classList.remove('open');
      }
    }
  }

	render() {
    return (
      <div className="saved-items-panel-container">
        <button className="button-default saved-items-button" onClick={this.handleSavedItemsButtonClick}>
          <i className="far fa-save"></i>
          View saved items
        </button>

        <div className="saved-items-panel">
          <h2 className="saved-items-type-title">Saved bookmarked items</h2>
          <div className="saved-items-container">
            {this.getSavedBookmarks()}
          </div>

          <h2 className="saved-items-type-title">Saved seen items</h2>
          <div className="saved-items-container">
            {this.getSavedSeen()}
          </div>
        </div>
      </div>
    );
	}
};
