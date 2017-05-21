import { createStore, combineReducers } from 'redux';

import {
  REQUEST_TILES, RECEIVE_TILES, INC_RATING, DEC_RATING, SORT_TILES
} from './constants/action.types';

import { gridState } from './containers';

const initialState = {
  tiles: [],
  isFetching: false,
  orderByRating: []
};

function raterState(state = initialState, action) {
  switch (action.type) {
    case REQUEST_TILES:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_TILES:
      return {
        ...state,
        tiles: action.payload,
        isFetching: false
      };
    case INC_RATING:
      return {
        ...state,
        tiles: state.tiles.map(tile => tile.id === action.payload ? { ...tile, rating: ++tile.rating } : tile)
      };
    case DEC_RATING:
      return {
        ...state,
        tiles: state.tiles.map(tile => tile.id === action.payload ? { ...tile, rating: --tile.rating } : tile)
      };
    case SORT_TILES:
      return {
        ...state,
        orderByRating: state.tiles.sort((t1, t2) => t2.rating - t1.rating).map(tile => tile.id)
      };
    default:
      return state;
  }
}

const store = combineReducers({
  rater: raterState,
  grid: gridState
})

export default createStore(
  store,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);