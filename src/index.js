import { Notify } from 'notiflix';
import smoothScroll from './js/smoothScroll.js';
import getRefs from './js/getRefs.js';
import { addImagesMarkup, clearImagesMarkup } from './js/markupImages.js';

import ImagesApiServise from './js/imagesApiServise.js';
import LoadMoreBtn from './js/loadMoreBtn.js';

const refs = getRefs();
const imgApiService = new ImagesApiServise();
const loadMoreBtn = new LoadMoreBtn({ hidden: true });

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(evt) {
  evt.preventDefault();

  imgApiService.searchValue =
    evt.currentTarget.elements.searchQuery.value.trim();

  if (!imgApiService.searchValue) {
    return Notify.info('Please, enter a value for the search query.');
  }

  clearImagesMarkup();
  loadMoreBtn.hide();
  imgApiService.resetPage();

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
    loadMoreBtn.enable();

    return Notify.success(`Hooray! We found ${totalHits} images.`);
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
      smoothScroll(2);
      loadMoreBtn.hide();

      return Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }

    addImagesMarkup(hits);
    smoothScroll(2);
    loadMoreBtn.enable();
  });
}
