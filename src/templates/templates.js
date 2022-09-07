export const formTemplate = `
<form id="add-form">
  <h3 class="review__title">Отзыв:</h3>
  <input type="text"  class="review__input" placeholder="Укажите ваше имя" name="author">
  <input type="text"  class="review__input" placeholder="Укажите место" name="place">
  <textarea class="review__textarea"  placeholder="Оставить отзыв" name="review"></textarea>
  <button id="review__button">Добавить</button>
</form>`