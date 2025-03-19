import view from './view';
import icons from 'url:../../img/icons.svg';
class PaginationView extends view {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      console.log(btn);
      const gotopage = +btn.dataset.goto;
      console.log(gotopage);
      handler(gotopage);
    });
  }
  _generatemarkup() {
    const currentPage = this._data.page;
    console.log(this._data.results);
    console.log(this._data.resultsPerPage);
    const numpages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numpages);
    //page 1 and there are other pages
    if (currentPage === 1 && numpages > 1) {
      return `<button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> `;
    }

    //last page
    if (currentPage === numpages && numpages > 1) {
      return ` <button data-goto="${
        currentPage - 1
      }"class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
          ///////////////////////////////////////
          `;
    }
    //other pages
    if (currentPage < numpages) {
      return `<button data-goto="${
        currentPage - 1
      }"class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
          <button data-goto="${
            currentPage + 1
          }"class="btn--inline pagination__btn--next">
            <span>Page${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          
          
          `;
    }
    //page 1 and there are no other pages
    return '';
  }
}

export default new PaginationView();
