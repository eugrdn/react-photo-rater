export function fetchPhotos() {
  return fetch()
    .then(photos => photos)
    .catch(handleError);
}

function handleError(err) {
  console.warn(err);
  return null;
}