const URL = 'https://pixabay.com/api/';
const KEY = '29748197-52bbc011c9b877a520d9a42a8';
const SEARCH_PARAMS = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 5,
});

export async function fetchImages(searchValue, pageNumber) {
  return await fetch(
    `${URL}?key=${KEY}&q=${searchValue}&${SEARCH_PARAMS}&page=${pageNumber}`
  )
    .then(async response => {
      if (!response.ok || response.status === 404) {
        throw new Error(response.status);
      }
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
}
