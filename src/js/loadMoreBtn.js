export default class LoadMoreBtn {
  constructor({ hidden = false }) {
    this.refs = this.getRefs();

    if (hidden) {
      this.hide();
    }
  }

  getRefs() {
    const refs = {};
    refs.button = document.querySelector('.load-more');
    refs.label = document.querySelector('.label');
    refs.spinner = document.querySelector('.spinner');

    return refs;
  }

  enable() {
    this.refs.button.disabled = false;
    this.refs.button.classList.remove('is-disabled');
    this.refs.label.textContent = 'Load more';
    this.refs.spinner.style.display = 'none';
  }

  disable() {
    this.refs.button.disabled = true;
    this.refs.button.classList.add('is-disabled');
    this.refs.label.textContent = 'Loading...';
    this.refs.spinner.style.display = 'block';
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}
