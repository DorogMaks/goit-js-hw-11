const URL = 'https://pixabay.com/api/';

export async function fetchImages(searchValue, pageNumber) {
  const SEARCH_PARAMS = new URLSearchParams({
    key: '29748197-52bbc011c9b877a520d9a42a8',
    q: searchValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: pageNumber,
  });
  try {
    const response = await fetch(`${URL}?${SEARCH_PARAMS}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
