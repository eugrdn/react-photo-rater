import shortid from 'shortid';
import mockData from '../example/mock.data';

function fetchPhotos(url) {
  return fetch(url)
    .catch(handleError);
}
// for dev
function createTiles(photos) {
  return mockData.map(photo => ({
    id: shortid.generate(),
    photo,
    rating: Math.ceil(Math.random() * 19)
  }));
}

export function getTiles() {
  return fetchPhotos()
    .then(createTiles)
    .catch(handleError);
}

function handleError(err) {
  console.warn(err);
  return null;
}