const config = {
  COLUMN_COUNT: 3,
  COLUMN_SIDE_GAP: 50,
  ROW_SIDE_GAP: 50,
  ROW_MIN_HEIGHT: 50,
  ROW_MAX_HEIGHT: 300,
  ROW_COUNT: null,
  ROWS_ON_SCREEN: 2,
  SPACE_BETWEEN: 1
}

function getColumnCount() {
  return config.COLUMN_COUNT;
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
  var height = Math.floor(gridScale.height / config.ROW_COUNT) - config.ROW_SIDE_GAP * config.SPACE_BETWEEN;

  if (height < config.ROW_MIN_HEIGHT) {
    height = config.ROW_MIN_HEIGHT;
  } else if (height > config.ROW_MAX_HEIGHT) {
    height = config.ROW_MAX_HEIGHT;
  }

  return { width, height };
}

function calculateTileRect(rowScale) {
  let height = rowScale.height - config.ROW_SIDE_GAP;
  let width = Math.floor(rowScale.width / config.COLUMN_COUNT) - config.COLUMN_SIDE_GAP * config.SPACE_BETWEEN;

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

  if (config.ROW_COUNT > config.ROWS_ON_SCREEN) {
    gridScale.height += (config.ROW_COUNT - config.ROWS_ON_SCREEN) * (gridScale.height / config.ROWS_ON_SCREEN);
  }

  const rowScale = caclulateRowRect(gridScale);
  const tileScale = calculateTileRect(rowScale);

  return {
    ...gridScale,
    row: { ...rowScale },
    tile: { ...tileScale }
  };
}

export default {
  getColumnCount,
  caclulateRowsCount,
  selectTile,
  getScaleByWindow
};