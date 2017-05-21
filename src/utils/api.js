import shortid from 'shortid';
import mockData from '../example/mock.data';

function fetchPhotos() {
  return Promise.resolve(mockData);
}

function createTiles(photos) {
  return photos.map(photo => ({
    id: shortid.generate(),
    photo,
    rating: Math.ceil(Math.random() * 10) - 3
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