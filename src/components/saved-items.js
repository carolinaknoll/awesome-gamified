import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { notifyAction } from '../common/helpers';

export default class SavedItems extends Component {
  state = {
    open: false
  }

  handleSavedItemsButtonClick = () => {
    this.setState({ open: !this.state.open });
  }

  getSavedSeen = () => {
    return this.getSavedItems('savedSeen');
  }

  getSavedBookmarks = () => {
    return this.getSavedItems('savedBookmarks');
  }

  getItemCount = (item) => {
    const savedItems = JSON.parse(localStorage.getItem('SavedAwesomeLists'));
    return (<span className="badge-count">{savedItems && savedItems[0] && savedItems[0][item].length}</span>)
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
            <p className="saved-item">{item.itemSubjectName} > {item.itemTopicName} > </p>
            <a className="saved-item" href={item.itemUrl}>{item.itemName}</a>
          </div>
        );
      });
    }
  }

  handleSavedItemsRemoveItemButtonClick = (savedItems, savedItemLocation, savedItemIndex) => {
    let removedItemName = savedItems[0][savedItemLocation][savedItemIndex].itemName;
    let removedItemLocation = savedItems[0][savedItemLocation][savedItemIndex].itemLocation;

    let savedItemsArrayWithoutRemovedElement = savedItems[0][savedItemLocation].filter((item, index) => {
      return savedItemIndex !== index;
    });

    savedItems[0][savedItemLocation] = savedItemsArrayWithoutRemovedElement;

    localStorage.setItem('SavedAwesomeLists', JSON.stringify(savedItems));

    this.props.onSavedItemsChange(savedItems);

    notifyAction(removedItemName, removedItemLocation, 'fa-trash-alt', 'removed from');
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

  exportSavedBookmarks = () => {
    const savedItems = localStorage.getItem('SavedAwesomeLists')

    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(savedItems)}`);
    element.setAttribute('download', 'SavedList.json');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  importSavedBookmarks = () => {
    const fileInputField = document.querySelector('.file-input');
    fileInputField.click();
  }

  handleImportedFileChange = (e) => {
    let importedFile = e.target.files[0];
    let formattedMessage = null;

    if (importedFile.type === "application/json") {
      formattedMessage = (
        <span><i className="awesome-text-gradient fas fa-smile-wink"></i> Your file <span className="awesome-text-gradient bold">{importedFile.name}</span> has been <span className="bold">imported</span> succesfully</span>
      );

      const reader = new FileReader();
      reader.readAsText(importedFile);
      reader.onload = (e) => {
        localStorage.setItem('SavedAwesomeLists', e.target.result);
      }
    } else {
      formattedMessage = (
        <span><i className="awesome-text-gradient far fa-frown"></i> Your file <span className="awesome-text-gradient bold">{importedFile.name}</span> couldn't be <span className="bold">imported</span></span>
      );
    }

    toast(formattedMessage);
    e.target.value = null;
  }

  render() {
    const { open } = this.state;

    return (
      <div className="saved-items-panel-container">
        <button className="button-default saved-items-button" onClick={this.handleSavedItemsButtonClick}>
          <i className="awesome-text-gradient far fa-save"></i>
          {this.props.showText ? 'View saved items' : null}
        </button>

        <div className={`saved-items-panel ${open ? `open` : ''}`}>
          <h2 className="saved-items-type-title awesome-text-gradient heading-divider">
            <i className="icon bookmark fas fa-archive"></i> Saved items
          </h2>

          <p>The items you have marked as seen or bookmarked are shown below.</p>

          <div className="import-export-button-container">
            <button className="button-default saved-items-button" onClick={this.exportSavedBookmarks}>
              <i className="awesome-text-gradient fas fa-file-download"></i>
              Export items
            </button>

            <div className="import-container">
              <input className="file-input" type="file" accept=".json" onChange={this.handleImportedFileChange} />
              <button className="button-default saved-items-button" onClick={this.importSavedBookmarks}>
                <i className="awesome-text-gradient fas fa-file-upload"></i>
                Import items
              </button>
            </div>
          </div>

          <h2 className="saved-items-type-title awesome-text-gradient heading-divider">
            <i className="icon bookmark fas fa-star"></i> Bookmarked{this.getItemCount('savedBookmarks')}
          </h2>

          <div className="saved-items-container">
            {this.getSavedBookmarks()}
          </div>

          <h2 className="saved-items-type-title awesome-text-gradient heading-divider">
            <i className="icon bookmark fas fa-eye"></i>Seen{this.getItemCount('savedSeen')}
          </h2>

          <div className="saved-items-container">
            {this.getSavedSeen()}
          </div>
        </div>
      </div>
    );
  }
}

SavedItems.propTypes = {
  onSavedItemsChange: PropTypes.func.isRequired,
  savedItems: PropTypes.array,
  showText: PropTypes.bool
};

SavedItems.defaultProps = {
  showText: true
};