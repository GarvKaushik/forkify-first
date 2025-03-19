import view from './view';
import icons from 'url:../../img/icons.svg';
import previewview from './previewview';

class ResultsView extends view {
  _parentElement = document.querySelector('.results');
  _errormsg = `No recipe found for your search`;
  _message = '';

  _generatemarkup() {
    // console.log(this._data);
    return this._data.map(result => previewview.render(result, false)).join('');
  }
}

export default new ResultsView();
