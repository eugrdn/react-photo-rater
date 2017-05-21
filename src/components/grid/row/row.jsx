import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tile from '../tile/tile';

import './row.css';

class Row extends Component {
  render() {
    const { tiles, size: { row, tile } } = this.props;

    return (
      <div className='tiles-row' style={row}>
        {
          tiles.map(({ id, photo, rating }) => (
            <Tile
              key={id}
              id={id}
              photo={photo}
              rating={rating}
              style={tile} />
          ))
        }
      </div>
    );
  }
};

Row.propTypes = {
  tiles: PropTypes.array.isRequired,
  size: PropTypes.object.isRequired
}

export default Row;