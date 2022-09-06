import { getRefs } from './getRefs.js';
const refs = getRefs();

export function clearGallery() {
  refs.gallery.innerHTML = '';
  pageNumber = 1;
  console.log('clear');
}
