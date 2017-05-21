const config = {
  ROW_SIDE_GAP: 50,
  COLUMN_COUNT: 3,
  COLUMN_SIDE_GAP: 50,
}

function getColumnCount() {
  return config.COLUMN_COUNT;
}

function getColumnGap() {
  return config.COLUMN_SIDE_GAP;
}

function getRowGap(params) {
  return config.ROW_SIDE_GAP;
}

function caclulateRowsCount(tilesCount) {
  config.ROW_COUNT = Math.ceil(tilesCount / config.COLUMN_COUNT);
  return config.ROW_COUNT;
}

function selectTile(id, tiles) {
  return tiles.find(t => t.id === id);
}

function caclulateRowRect(gridScale) {
  const width = gridScale.width - config.ROW_SIDE_GAP;
  let height = Math.floor(gridScale.height / config.ROW_COUNT) - config.ROW_SIDE_GAP * 1.5;

  return { width, height };
}

function calculateTileRect(rowScale) {
  let height = rowScale.height; //- config.ROW_SIDE_GAP; 
  let width = Math.floor(rowScale.width / config.COLUMN_COUNT) - config.COLUMN_SIDE_GAP * 1.5;

  if (height < rowScale.height) {
    height = rowScale.height;
  }

  // since the tile is a square
  if (width > height) {
    width = height;
  } else {
    height = width;
  }

  return { width, height };
}

function getScaleByWindow(windowScale) {
  const gridScale = {
    width: Math.ceil(windowScale.width),
    height: Math.ceil(windowScale.height) - config.ROW_SIDE_GAP
  };

  const rowScale = caclulateRowRect(gridScale);
  const tileScale = calculateTileRect(rowScale);

  return {
    ...gridScale,
    row: { ...rowScale },
    tile: { ...tileScale }
  };
}

export default {
  getRowGap,
  getColumnGap,
  getColumnCount,
  caclulateRowsCount,
  selectTile,
  caclulateRowRect,
  calculateTileRect,
  getScaleByWindow
};