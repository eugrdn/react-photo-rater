import {
  REQUEST_TILES, RECEIVE_TILES, SORT_TILES, INC_RATING, DEC_RATING
} from './constants/action.types';

export const sortTiles = () => ({ type: SORT_TILES });

export const requestTiles = () => ({ type: REQUEST_TILES });

export const reseiveTiles = tiles => ({
  type: RECEIVE_TILES,
  payload: tiles
});

export const incTileRating = id => ({
  type: INC_RATING,
  payload: id
});

export const decTileRating = id => ({
  type: DEC_RATING,
  payload: id
});