import axios from 'axios';

export default class ImagesApiServise {
  constructor() {
    this.searchValue = '';
    this.perPage = 40;
    this.page = 1;
  }

  fetchImages() {
    const URL = 'https://pixabay.com/api/';
    const SEARCH_PARAMS = new URLSearchParams({
      key: '29748197-52bbc011c9b877a520d9a42a8',
      q: this.searchValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: this.perPage,
      page: this.page,
    });

    return fetch(`${URL}?${SEARCH_PARAMS}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.incrementPage();
        return data;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get inputValue() {
    return this.searchValue;
  }

  set inputValue(newValue) {
    this.searchValue = newValue;
  }
}
