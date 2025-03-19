import view from './view';
import previewview from './previewview';
import icons from 'url:../../img/icons.svg';

class BookMarksView extends view {
  _parentElement = document.querySelector('.bookmarks__list');
  _errormsg = `Go ahead and bookmark some recipes`;
  _message = '';
  addhandlerrender(handler) {
    window.addEventListener('load', handler);
  }
  _generatemarkup() {
    // console.log(this._data);
    return this._data.map(result => previewview.render(result, false)).join('');
  }
}

export default new BookMarksView();
