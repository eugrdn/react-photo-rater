import {
  REQUEST_TILES, RECEIVE_TILES, INC_RATING, DEC_RATING, SORT_TILES
} from '../../constants/action.types';

const initialState = {
  tiles: [
    { id: 1, picture: '', rating: 100 },
    { id: 2, picture: '', rating: 200 }
  ],
  isFetching: false,
  orderByRating: [2, 1]
};

function gridReducer(state = initialState, action) {
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
        tiles: state.tiles.map(tile => tile.id === action.payload ? { ...tile, rating: tile.rating++ } : tile)
      };
    case DEC_RATING:
      return {
        ...state,
        tiles: state.tiles.map(tile => tile.id === action.payload ? { ...tile, rating: tile.rating-- } : tile)
      };
    case SORT_TILES:
      return {
        ...state,
        tiles: state.tiles.sort((t1, t2) => t1.rating > t2.rating),
        orderByRating: state.tiles.map(tile => tile.id)
      };
    default:
      return state;
  }
}

export default gridReducer;