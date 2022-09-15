import { lightbox } from './sliderLightbox.js';
import getRefs from './getRefs.js';
const refs = getRefs();

function createImagesMarkup(array) {
  return array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
    <div class="photo-card">
        <a href="${largeImageURL}" class="photo-link">
            <img
                class="photo-image"
                src="${webformatURL}"
                alt="${tags}"
                loading="lazy"
            />
        </a>
        <div class="info">
            <p class="info-item">
                <b>Likes</b>
                <span class="info-api">${likes}</span>
            </p>
            <p class="info-item">
                <b>Views</b>
                <span class="info-api">${views}</span>
            </p>
            <p class="info-item">
                <b>Comments</b>
                <span class="info-api">${comments}</span>
            </p>
            <p class="info-item">
                <b>Downloads</b>
                <span class="info-api">${downloads}</span>
            </p>
        </div>
    </div>`;
      }
    )
    .join('');
}

export function addImagesMarkup(array) {
  refs.gallery.insertAdjacentHTML('beforeend', createImagesMarkup(array));
  lightbox.refresh();
}

export function clearImagesMarkup() {
  refs.gallery.innerHTML = '';
}
