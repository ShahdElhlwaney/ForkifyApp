import View from './View';
import * as model from '../../js/model.js';

class PaginationView extends View{
    _parentEl=document.querySelector('.pagination');
    _generateMarkup(){
        const curPage= this._data.pagination.page;
        console.log(`Cur=>${curPage}`);

        const numPages= Math.ceil(this._data.results.length/ this._data.pagination.resultsPerPage);
        console.log(`numPage=>${numPages}`);
        // First page and there are other pages=> right-btn
        if(curPage===1 &&  numPages>1){
            return `
            <button data-goto=${curPage+1} class="btn--inline pagination__btn--next">
              <span>Page ${curPage+1}</span>
              <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-right"></use>
              </svg>
            </button>`;
        }
            // Last page => left-btn
        if(curPage===numPages)
        {
            return `
            <button data-goto=${curPage-1} class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-left"></use>
              </svg>
              <span>Page ${curPage-1}</span>
            </button>`;
        }
        // Other page =>left-btn,right-btn
        if(curPage<numPages)
        {
            return `
            <button data-goto=${curPage-1} class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-left"></use>
              </svg>
              <span>Page ${curPage-1}</span>
            </button>
            <button data-goto=${curPage+1} class="btn--inline pagination__btn--next">
              <span>Page ${curPage+1}</span>
                <svg class="search__icon">
                  <use href="src/img/icons.svg#icon-arrow-right"></use>
                </svg>
            </button`;
        }
        // First page =>no btns
         return '';
    }
    addHandlerRender(handler){
        this._parentEl.addEventListener('click',function(e){
           const btn= e.target.closest('.btn--inline');
           if(!btn)return;
            const goto=+btn.dataset.goto;
           handler(goto); 
        });
    }
    

}
export default new PaginationView();