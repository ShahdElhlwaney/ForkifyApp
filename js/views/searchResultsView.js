import View from './View.js';
import icons from '../../img/icons.svg';
class SearchResultsView extends View{
    _parentEl=document.querySelector('.results');
    _errorMessage='No results Found for your query. please try again ;)';
   _generateMarkup(){
    const id=window.location.hash.slice(1);
    return this._data.map(res=>`
          <li class="preview" data-id=${res.id}>
            <a class="preview__link ${res.id===id?'preview__link--active':''} "  href="#${res.id}">
              <figure class="preview__fig">
                <img src="${res.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${res.title}</h4>
                <p class="preview__publisher">${res.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>`).join('') ;
        
   }
  //  update(data,id){
  //   if(!data || Array.isArray(data)&&data.length===0){return this.renderError()};
  //   this._data=data;
  //   const curEls=Array.from(this._parentEl.querySelectorAll('.preview'));
  //   curEls.forEach(curEl=>curEl.classList.remove('preview__link--active'));
  //   const [curEl]= curEls.filter(el=>el.dataset.id===id);
  //   const newMarkup=this._generateMarkup();
  //   const newDom=document.createRange().createContextualFragment(newMarkup);
  //   const [newEl]= Array.from(newDom.querySelectorAll('.preview')).filter(el=>el.dataset.id===id);
  //   console.log(newEl);
  //   newEl.classList.add('preview__link--active');
  //   newEl.classList.forEach(cl=>{
  //     curEl.classList.add(cl);
  //   });
  // }
  //  addActiveHandlerRender(handler){
  //   window.addEventListener('hashchange',function(e){
  //     handler();
  //   });
  //  }
   
  // addActiveHandlerRender(handler){
  //     this._parentEl.addEventListener('click',function(e){

  //       const el=e.target.closest('.preview');
  //       if(!el)return;
  //       const id=el.dataset.id;
  //       console.log(id,el);
  //       handler(id);
  //     });
  //    }
 

   
}


export default new SearchResultsView();