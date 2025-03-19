import { API_URL, RES_PER_PAGE, key } from './configure';
import { AJAX } from './view/helpers';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceURL: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingtime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadrecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${key}`);
    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(bm => bm.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }

    // console.log(state.recipe);
  } catch (err) {
    alert(err);
    throw err;
  }
};

export const loadsearchresults = async function (query) {
  try {
    state.search.query = query;
    // console.log(`${API_URL}?search=${query}`);
    const data = await AJAX(`${API_URL}?search=${query}&key=${key}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
    // console.log(state.search.results);
  } catch (err) {
    throw err;
  }
};
// loadsearchresults('pizza');
export const getsearchresultpage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  // console.log(start, end);

  return state.search.results.slice(start, end);
};

export const updateServings = function (newservings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newservings) / state.recipe.servings;
    //NewQ= oldQt+new servings/old servings
  });

  state.recipe.servings = newservings;
};

const savebookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
export const addbookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
  savebookmarks();
};

export const deletebookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }
  savebookmarks();
};
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) {
    state.bookmarks = JSON.parse(storage);
  }
  // console.log(storage);
};
init();

const clearbookmarks = function () {
  localStorage.clear('bookmarks');
};

init();
clearbookmarks();

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        if (ingArr.length != 3) {
          throw new Error('wrong ingredient format');
        }
        const [quantity, unit, description] = ingArr;
        return { quantity, unit, description };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    console.log(recipe);
    const data = await AJAX(`${API_URL}?key=${key}`, recipe);
    // console.log(data);
    state.recipe = createRecipeObject(data);

    //adding it to bookmark
    addbookmark(state.recipe);
    // console.log(ingredients);
  } catch (err) {
    throw err;
  }
};
//bf7625a4-4238-4b3d-8c44-9c6a4cae0cdb
