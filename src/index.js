import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/fetchImages.js';
import { clearGallery } from './js/clearGallery.js';
import { renderGallery } from './js/renderGallery.js';

import { getRefs } from './js/getRefs.js';
const refs = getRefs();
let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  scrollZoom: false,
});
let pageNumber = 1;

refs.searchForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  clearGallery();

  const searchValue = evt.currentTarget.elements.searchQuery.value.trim();

  if (!searchValue) {
    clearGallery();
    Notify.info('Please, enter a value for the search query.');
    return;
  }

  fetchImages(searchValue, pageNumber).then(onFetchSuccess);
}

function onFetchSuccess(data) {
  if (data.hits.length === 0) {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  renderGallery(data.hits);

  Notify.success(`Hooray! We found ${data.totalHits} images.`);

  lightbox.refresh();

  refs.loadMoreBtn.classList.remove('is-hidden');
}

refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function onLoadMoreBtnClick(evt) {
  pageNumber += 1;
}
