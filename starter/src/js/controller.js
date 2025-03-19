// import icons from '../img/icons.svg';
import * as model from './model.js';
import recipeview from './view/recipeview.js';
import resultsview from './view/resultsview.js';
import paginationview from './view/paginationview.js';
import bookmarksview from './view/bookmarksview.js';
import addrecipeview from './view/addrecipeview.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// console.log(icons);
import searchview from './view/searchview.js';
import bookmarksview from './view/bookmarksview.js';

// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) {
      return;
    }
    recipeview.renderspinner();

    ////0 result view
    resultsview.update(model.getsearchresultpage());
    bookmarksview.update(model.state.bookmarks);
    //loading recipe

    await model.loadrecipe(id);

    // rendering recipe
    recipeview.render(model.state.recipe);
  } catch (err) {
    alert(err);
    recipeview.renderError();
  }
};
const controlsearchResults = async function () {
  try {
    resultsview.renderspinner();
    // get search query
    const query = searchview.getquery();
    if (!query) return;
    //load search query
    await model.loadsearchresults(query);

    //render results
    // console.log(model.state.search.results);
    resultsview.render(model.getsearchresultpage());

    // redner pagination
    paginationview.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (gotopage) {
  // console.log(gotopage);
  resultsview.render(model.getsearchresultpage(gotopage));

  // redner pagination
  paginationview.render(model.state.search);
};

const controlServings = function (newservings) {
  //Update the Recipe servings (in state)
  model.updateServings(newservings);

  //Update the recipe view
  recipeview.update(model.state.recipe);
};

const controlAddBookmarks = function () {
  // Add/Remove
  if (!model.state.recipe.bookmarked) {
    model.addbookmark(model.state.recipe);
  } else if (model.state.recipe.bookmarked) {
    model.deletebookmark(model.state.recipe.id);
  }
  //Update te recipe's bookmark tag
  recipeview.update(model.state.recipe);

  //render bookmark
  bookmarksview.render(model.state.bookmarks);
};
const controlbookmarks = function () {
  bookmarksview.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newrecipe) {
  try {
    addrecipeview.renderspinner();
    await model.uploadRecipe(newrecipe);
    console.log(model.state.recipe);
    recipeview.render(model.state.recipe);
    addrecipeview.rendermessage();

    bookmarksview.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      addrecipeview.togglewindow();
    }, 2000);
  } catch (err) {
    console.error(err);
    addrecipeview.renderError(err.message);
  }
};
const init = function () {
  bookmarksview.addhandlerrender(controlbookmarks);
  recipeview.addHandlerRender(controlRecipes);
  recipeview.addHandlerUpdateservings(controlServings);
  recipeview.addhandlerbookmark(controlAddBookmarks);
  searchview.addhandlersearch(controlsearchResults);
  paginationview.addHandlerClick(controlPagination);
  addrecipeview._addHandlerUpload(controlAddRecipe);
};
init();
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
