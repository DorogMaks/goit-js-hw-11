import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import getRefs from './js/getRefs.js';
import { addImagesMarkup, clearImagesMarkup } from './js/markupImages.js';

import ImagesApiServise from './js/imagesApiServise.js';
import LoadMoreBtn from './js/loadMoreBtn.js';

const refs = getRefs();
const imgApiService = new ImagesApiServise();
const loadMoreBtn = new LoadMoreBtn({ hidden: true });

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

  if (!imgApiService.searchValue) {
    return Notify.info('Please, enter a value for the search query.');
  }

  imgApiService.resetPage();
  loadMoreBtn.hide();
  clearImagesMarkup();

  imgApiService.fetchImages().then(({ hits, totalHits }) => {
    if (hits.length === 0) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    if (totalHits > imgApiService.perPage) {
      loadMoreBtn.show();
    }

    addImagesMarkup(hits);
    lightbox.refresh();
    loadMoreBtn.enable();
    Notify.success(`Hooray! We found ${totalHits} images.`);
  });
}

function onLoadMore() {
  loadMoreBtn.disable();

  imgApiService.fetchImages().then(({ hits }) => {
    if (
      hits.length < imgApiService.perPage ||
      refs.gallery.children.length >= 480
    ) {
      addImagesMarkup(hits);
      lightbox.refresh();
      loadMoreBtn.hide();

      return Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }

    addImagesMarkup(hits);
    lightbox.refresh();
    loadMoreBtn.enable();
  });
}
