import view from './view';
import icons from 'url:../../img/icons.svg';
class AddRecipeView extends view {
  _parentElement = document.querySelector('.upload');
  _message = 'Your Recipe was successfully Saved';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnopen = document.querySelector('.nav__btn--add-recipe');
  _btnclose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addhandlershowwindow();
    this._addhandlerHidewindow();
  }
  togglewindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _addhandlershowwindow() {
    this._btnopen.addEventListener('click', this.togglewindow.bind(this));
  }
  _addhandlerHidewindow() {
    this._btnclose.addEventListener('click', this.togglewindow.bind(this));
    this._overlay.addEventListener('click', this.togglewindow.bind(this));
  }
  _addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      console.log(dataArr);
      handler(data);
    });
  }
  _generatemarkup() {}
}

export default new AddRecipeView();
