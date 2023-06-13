import React, { PureComponent } from 'react';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';

class SearchResults extends PureComponent {
  launchPop(name, id, russian_name) {
    this.props.onSearchItemSelected(name, id, russian_name);
  }

  handleClose = () => {
    this.props.onClose();
  };

  componentDidMount() {
    console.log('SearchResults component did mount:');
  }

  onComponentDidUpdate() {
    console.log('SearchResults component updated:');
  }

  render() {
    return (
      <div>
        <Fade in={true}>
          <div className="search-results">
            <div className="closeSearchResultsIcon-desktop">
              <CloseIcon onClick={this.handleClose} color="secondary" />
            </div>
            <div className="search-results__content">
              {/* common */}
              <div className="search-result__category">
                <div className="category-title" style={{ padding: '16px', textTransform: 'uppercase' }}>
                  <div>Common</div>
                  <div className="closeSearchResultsIcon-device">
                    <CloseIcon onClick={this.handleClose} color="primary" />
                  </div>
                </div>
                {this.props.common.map((item, index) => (
                  <div key={index} className="search-result__item" onClick={() => this.launchPop(item.food_name, null, item.russian_name)}>
                    <div className="search-result__item-image">
                      <img src={item.photo.thumb} alt="select this item" title="select this item" />
                    </div>
                    <div className="search-result__item-name">
                      <span>{item.russian_name}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* branded */}
              <div className="search-result__category">
                <div className="category-title" style={{ padding: '16px', textTransform: 'uppercase' }}>
                  Branded
                </div>

                {this.props.branded.map((item, index) => (
                  <div
                    key={index}
                    className="search-result__item"
                    onClick={() => this.launchPop(item.food_name, item.nix_item_id, item.russian_name)}
                  >
                    <div className="search-result__item-image">
                      <img src={item.photo.thumb} alt="select this item" title="select this item" />
                    </div>
                    <div className="search-result__item-name">
                      <span>{item.russian_name.substr(0, 23)}...</span>
                      <small>{item.brand_name}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Fade>
      </div>
    );
  }
}

export default SearchResults;
