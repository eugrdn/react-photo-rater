import { RESIZE_GRID } from '../../constants/action.types';

function gridReducer(state = {}, action) {
  switch (action.type) {
    case RESIZE_GRID:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

export default gridReducer;