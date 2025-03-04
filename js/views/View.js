
export default class View{
    _data;
    render(data){

       if(!data || Array.isArray(data)&&data.length===0){return this.renderError()};
        this._data=data;
        let markup=this._generateMarkup();
        this._clear();
        this._parentEl.insertAdjacentHTML('afterbegin',markup);
    }
    update(data){
      this._data=data;
      const newMarkup=this._generateMarkup();
      const newDom=document.createRange().createContextualFragment(newMarkup);
      const newEls=Array.from(newDom.querySelectorAll('*'));
      const curEls=Array.from(this._parentEl.querySelectorAll('*')) ;
      newEls.forEach((newEl,i)=>{
        const curEl=curEls[i];
        if(!newEl.isEqualNode(curEl) 
          && newEl.firstChild?.nodeValue.trim()!=='')
        {
          curEl.textContent=newEl.textContent;
        }
        if(!newEl.isEqualNode(curEl))
        {
          Array.from(newEl.attributes).forEach((attr)=>{
            curEl.setAttribute(attr.name,attr.value);
          })
        }
      });   
    }
   
    renderSpinner(){
        const markup=`
        <div class="spinner">
          <svg>
            <use href="img/icons.svg#icon-loader"></use>
          </svg>
        </div>
        `;
        this._clear();
        this._parentEl.insertAdjacentHTML('afterbegin',markup);
    }
    _clear(){
      this._parentEl.innerHTML =''; 
    }
    renderError(err=this._errorMessage){
        const markup=
          `<div class="error">
              <div>
                <svg>
                  <use href="src/img/icons.svg#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${err}</p>
          </div>`;
        this._parentEl.insertAdjacentHTML('afterbegin',markup);
    }
    renderMessage(){
        const markup=`
            <div class="message">
              <div>
                <svg>
                  <use href="img/icons.svg#icon-smile"></use>
                </svg>
              </div>
              <p>${this._message}</p>
            </div>`;
    }
}