import {
  RESIZE_GRID
} from '../../constants/action.types';

export const resizeGrid = proportions => ({
  type: RESIZE_GRID,
  payload: proportions
});
