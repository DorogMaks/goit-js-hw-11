import { Notify } from 'notiflix';
import smoothScroll from './js/smoothScroll.js';
import getRefs from './js/getRefs.js';
import { addImagesMarkup, clearImagesMarkup } from './js/markupImages.js';

import ImagesApiServise from './js/imagesApiServise.js';
import LoadMoreBtn from './js/loadMoreBtn.js';

const refs = getRefs();
const imagesApiService = new ImagesApiServise();
const loadMoreBtn = new LoadMoreBtn({ hidden: true });

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

async function onSearch(evt) {
  evt.preventDefault();

  imagesApiService.searchValue =
    evt.currentTarget.elements.searchQuery.value.trim();

  if (!imagesApiService.searchValue) {
    return Notify.info('Please, enter a value for the search query.');
  }

  clearImagesMarkup();
  loadMoreBtn.hide();
  imagesApiService.resetPage();

  const { hits, totalHits } = await imagesApiService.fetchImages();

  if (hits.length === 0) {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  if (totalHits > imagesApiService.perPage) {
    loadMoreBtn.show();
  }

  addImagesMarkup(hits);
  loadMoreBtn.enable();

  return Notify.success(`Hooray! We found ${totalHits} images.`);
}

async function onLoadMore() {
  loadMoreBtn.disable();

  const { hits, totalHits } = await imagesApiService.fetchImages();

  if (imagesApiService.page > Math.ceil(totalHits / imagesApiService.perPage)) {
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
}
