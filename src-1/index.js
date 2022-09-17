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
let searchValue = '';
let pageNumber = '';

refs.searchForm.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function onFormSubmit(evt) {
  evt.preventDefault();
  clearGallery();

  searchValue = evt.currentTarget.elements.searchQuery.value.trim();

  if (!searchValue) {
    clearGallery();

    return Notify.info('Please, enter a value for the search query.');
  }

  pageNumber = 1;

  fetchImages(searchValue, pageNumber)
    .then(onFetchSuccess)
    .catch(error => console.error(error));
}

function onFetchSuccess(data) {
  if (data.hits.length === 0) {
    refs.searchForm.reset();

    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  if (data.hits.length === 40) {
    refs.loadMoreBtn.classList.remove('is-hidden');
  }

  renderGallery(data.hits);
  lightbox.refresh();

  return Notify.success(`Hooray! We found ${data.totalHits} images.`);
}

function onLoadMoreBtnClick() {
  pageNumber += 1;

  fetchImages(searchValue, pageNumber)
    .then(onFetchSuccessLoadMore)
    .catch(error => console.error(error));
}

function onFetchSuccessLoadMore(data) {
  if (data.hits.length < 40 || refs.gallery.children.length >= 480) {
    renderGallery(data.hits);
    lightbox.refresh();
    refs.loadMoreBtn.classList.add('is-hidden');

    return Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }

  renderGallery(data.hits);
  lightbox.refresh();
}
