import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
  Row,
  Loading
} from '../../components';

import { getTiles } from '../../utils/api';
import { TileGridService } from '../../services';

import {
  requestTiles,
  reseiveTiles,
  sortTiles
} from '../../rater.actions';

import { resizeGrid } from './grid.actions';

import './grid.css';

class TileGrid extends Component {
  constructor() {
    super();

    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);

    this.fetchTiles();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    const windowScale = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    const gridProportions = TileGridService.getScaleByWindow(windowScale);

    this.props.resizeGrid(gridProportions);
  }

  fetchTiles() {
    const { requestTiles, reseiveTiles, updateTiles } = this.props;

    requestTiles();

    getTiles()
      .then(tiles => {
        reseiveTiles(tiles)
        updateTiles()
        this.handleResize()
      });
  }

  createRows(tiles, tilesOrder, rowCount, columnCount) {
    let colStart = 0;
    let colEnd = columnCount;
    let rows = [];

    for (var index = 0; index < rowCount; index++) {
      let tilesIDs = tilesOrder.slice(colStart, colEnd);
      const selectedTiles = tilesIDs.map(id => TileGridService.selectTile(id, tiles));

      rows.push({
        key: tilesIDs.reduce((prev, cur) => prev + '*' + cur, ''),
        tiles: selectedTiles
      });

      colStart += columnCount;
      colEnd += columnCount
    }

    return rows;
  }

  render() {
    const { isFetching, tiles, tilesOrder, grid } = this.props;

    if (isFetching) {
      return <Loading speed={200} />;
    }

    const rowsCount = TileGridService.caclulateRowsCount(tilesOrder.length);
    const columnCount = TileGridService.getColumnCount();
    const rows = this.createRows(tiles, tilesOrder, rowsCount, columnCount);

    const gridScale = {
      width: grid.width,
      height: grid.height
    };

    return (
      <div className='tiles-grid' style={gridScale}>
        {
          rows.map(({ key, tiles }) => <Row key={key} tiles={tiles} size={grid} />)
        }
      </div>
    );
  }
}

TileGrid.propTypes = {
  requestTiles: PropTypes.func,
  reseiveTiles: PropTypes.func,
  updateGrid: PropTypes.func,
  isFetching: PropTypes.bool.isRequired,
  tiles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired
  })),
  grid: PropTypes.object.isRequired,
  tilesOrder: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default connect(
  state => ({
    isFetching: state.rater.isFetching,
    tiles: state.rater.tiles,
    tilesOrder: state.rater.orderByRating,
    grid: state.grid
  }),
  dispatch => ({
    requestTiles: () => dispatch(requestTiles()),
    reseiveTiles: (tiles) => dispatch(reseiveTiles(tiles)),
    updateTiles: () => dispatch(sortTiles()),
    resizeGrid: (proportions) => dispatch(resizeGrid(proportions))
  })
)(TileGrid);