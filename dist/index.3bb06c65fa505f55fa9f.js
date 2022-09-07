(()=>{"use strict";var e={};const l=`
<form id="add-form">
  <h3 class="review__title">Отзыв:</h3>
  <input type="text"  class="review__input" placeholder="Укажите ваше имя" name="author">
  <input type="text"  class="review__input" placeholder="Укажите место" name="place">
  <textarea class="review__textarea"  placeholder="Оставить отзыв" name="review"></textarea>
  <button id="review__button">Добавить</button>
</form>`;let a;function t(){ymaps.ready(()=>{const o=new ymaps.Map("map",{center:[55.75,37.62],zoom:13.5,controls:["zoomControl"]},{balloonMaxWidth:353,balloonMaxHeight:501,searchControlProvider:"yandex#search"});o.events.add("click",function(e){const t=e.get("coords");s(o,t,[])});a=new ymaps.Clusterer({clusterDisableClickZoom:true});a.options.set("hasBalloon",false);n(o);a.events.add("click",function(e){let t=e.get("target").getGeoObjects();s(o,e.get("coords"),t)});let r=(new Date).toLocaleDateString();function i(){const e=localStorage.reviews;return JSON.parse(e||"[]")}function t(e){let t="";for(const o of i()){if(e.some(e=>JSON.stringify(e.geometry._coordinates)===JSON.stringify(o.coords))){t+=`
                    <div class="review">
                        <div class="review__content">
                            <div class="review__info">${o.author}</div>
                            <div class="review__place">${o.place}</div>
                            <div class="review__time">${r}</div>
                        </div>
                        <div class="review__text">${o.reviewText}</div>
                    </div>`}}return t}function n(t){const e=[];for(const o of i()){const r=new ymaps.Placemark(o.coords);r.events.add("click",e=>{e.stopPropagation();s(t,e.get("coords"),[e.get("target")])});e.push(r)}a.removeAll();t.geoObjects.remove(a);a.add(e);t.geoObjects.add(a)}async function s(s,a,e){await s.balloon.open(a,{content:`<div class="reviews">${t(e)}</div>`+l});document.querySelector("#add-form").addEventListener("submit",function(e){let t=document.getElementsByClassName("review__input");let o=document.querySelector(".review__textarea");e.preventDefault();const r={coords:a,author:this.elements.author.value,place:this.elements.place.value,reviewText:this.elements.review.value};if(!this.elements.author.value||!this.elements.place.value||!this.elements.review.value){for(let e=0;e<t.length;e++){t[e].style.border="1px solid red"}o.style.border="1px solid red";return}localStorage.reviews=JSON.stringify([...i(),r]);n(s);s.balloon.close()})}})}t()})();
//# sourceMappingURL=index.3bb06c65fa505f55fa9f.js.map