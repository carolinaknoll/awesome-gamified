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

	render() {
    return (
      <div className="saved-items-container">
        <button className="button-default" onClick={this.handleSavedItemsButtonClick}>
          <i className="far fa-save"></i>
          View saved items
        </button>

        <div className="saved-items-panel">
          <h2>Saved items</h2>
        </div>
      </div>
    );
	}
};
