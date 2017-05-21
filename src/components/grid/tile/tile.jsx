import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  incTileRating,
  decTileRating,
  sortTiles
} from '../../../rater.actions';

import * as events from '../../../constants/event.types';

import './tile.css';

class Tile extends Component {
  constructor(props) {
    super(props);

    this.handlePictureClick = this.handlePictureClick.bind(this);
  }

  handlePictureClick(e) {
    e.preventDefault();
    const { id, dispatch } = this.props;

    if (e.type === events.CONTEXT_MENU) {
      dispatch(decTileRating(id))
    } else if (e.type === events.CLICK) {
      dispatch(incTileRating(id))
    }

    dispatch(sortTiles());
  }

  render() {
    const { photo, rating, style } = this.props;

    return (
      <div className='tile-item' style={style}>
        <span className='tile-rank' style={{ backgroundColor: rating > 0 ? '#3ce135' : rating < 0 ? '#ee3021' : '#f7f7f7' }}>{rating}</span>
        <img
          className='tile-photo'
          src={photo}
          alt={photo}
          onClick={this.handlePictureClick}
          onContextMenu={this.handlePictureClick}
          style={style}
        />
      </div>
    );
  }
};

export default connect()(Tile);