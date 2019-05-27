import React, {Component}  from 'react';

export default class SavedItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  handleSavedItemsButtonClick = () => {
    // this.props.handleSavedItemsButtonClick();
  }

	render() {
    return (
      <div className="saved-items-container">
        <button className="button-default" onClick={this.handleSavedItemsButtonClick}>
        <i className="far fa-save"></i>
          View saved items
        </button>
      </div>
    );
	}
};
