import {getJson} from './helpers.js';
import { API_URL,SEARCH_RES_PER_PAGE } from './config.js';
export const state={
    recipe:{},
    search:{
        query:'',
        results:[],
        pagination:{
            page:1,
            resultsPerPage:SEARCH_RES_PER_PAGE,
        }
        
        
    }
};
export const loadRecipe=async function(id){
    try{
        const data=await getJson(`${API_URL}${id}`);
        state.recipe={
          id:data.data.recipe.id,
          publisher:data.data.recipe.publisher,
          ingredients:data.data.recipe.ingredients,
          sourceUrl:data.data.recipe.source_url,
          image:data.data.recipe.image_url,
          title:data.data.recipe.title,
          cookingTime:data.data.recipe.cooking_time,
          servings:data.data.recipe.servings
        }
    }catch(err){
        throw err;
    }
    
}
export const updateRecipe=function(id){
    

}
export const loadSearchResults=async function(query)
{

    try{
       state.search.query=query;
       const data=await getJson(`${API_URL}?search=${query}`);
       state.search.results=data.data.recipes.map(rec=>
        {
            return {
                id:rec.id,
                image: rec.image_url,
                publisher: rec.publisher,
                title: rec.title
            }        
        });


    }catch(err){
        throw err;
    }
}
export const getSearchResPage=function(page=state.search.pagination.page){
    state.search.pagination.page=page;
    const start=(page-1)*SEARCH_RES_PER_PAGE;
    const end=page*state.search.pagination.resultsPerPage;
    return state.search.results.slice(start,end);
}
export const updateServings=function(newServings){
    state.recipe.ingredients.forEach(ing => {
        ing.quantity=ing.quantity*newServings/state.recipe.servings;
    });
    state.recipe.servings=newServings;
}