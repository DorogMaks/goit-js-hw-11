import axios from 'axios';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import getRefs from './js/getRefs.js';
import { addImagesMarkup, clearImagesMarkup } from './js/markupImages.js';

import ImagesApiServise from './js/fetchImages.js';
import LoadMoreBtn from './js/loadMoreBtn.js';

const refs = getRefs();
const imgApiService = new ImagesApiServise();
const loadMoreBtn = new LoadMoreBtn({ hidden: true }); // { hidden: true }

let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  scrollZoom: false,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(evt) {
  evt.preventDefault();

  imgApiService.searchValue =
    evt.currentTarget.elements.searchQuery.value.trim();

  imgApiService.fetchImages().then(images => {
    clearImagesMarkup();
    addImagesMarkup(images);
    lightbox.refresh();
  });
}

function onLoadMore() {
  console.log('click');
}

loadMoreBtn.enable();
// loadMoreBtn.disable();
loadMoreBtn.show();
// loadMoreBtn.hide();
