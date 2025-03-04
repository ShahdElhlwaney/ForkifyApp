
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import  recipeView from '../js/views/recipeView.js';
import searchView from '../js/views/searchView.js';
import resultsView from './views/searchResultsView.js';
import paginationView from './views/paginationView.js';
if(module.hot){
  module.hot.accept();
}
const controlRecipes=async function(){
    try{
      const id=window.location.hash.slice(1);
      if(!id)return;
      recipeView.renderSpinner();
      await model.loadRecipe(id); 
      resultsView.update(model.getSearchResPage());
      recipeView.render(model.state.recipe);
    }catch(err){
       recipeView.renderError();
    }
}
const controlSearchResults= async function(){
  try{
     const query=searchView.getQuery();
     if(!query)return;
     await model.loadSearchResults(query);
     // render pagination results
     resultsView.render(model.getSearchResPage());
     // render pagination btns
     paginationView.render(model.state.search);


  }catch(err){
    resultsView.renderError();
  }

}

const controlSearchPages=function(goto){
  resultsView.render(model.getSearchResPage(goto));
  paginationView.render(model.state.search);
}
const controlServings=function(newServings){
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
}
// const controlActiveResults=function(id){
//   resultsView.update(model.getSearchResPage(),id);
//   // resultsView.render(model.getSearchResPage());
// }
const init=function(){
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addUpdateServingsHandler(controlServings);
  searchView.searchHandlerRender(controlSearchResults);
  // resultsView.addActiveHandlerRender(controlActiveResults);
  paginationView.addHandlerRender(controlSearchPages);

}
init();



