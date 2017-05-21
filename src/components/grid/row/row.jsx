import React, { Component } from 'react';

import Tile from '../tile/tile';

import './row.css';

class Row extends Component {

  // shouldComponentUpdate(nextProps) {
  //   return JSON.stringify(nextProps.tiles.map(t=>({id: t.id, rating: t.rating}))) !== JSON.stringify(this.props.tiles.map(t=>({id: t.id, rating: t.rating})))
  // }

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

export default Row;