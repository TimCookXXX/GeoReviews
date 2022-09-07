# Выпускной проект курса: "Комплексное обучение JavaScript" (Loftschool)

### ⚡️⚡️ Описание:

Приложение, которое отображает Яндекс карту. На карте можно выбирать объекты и оставлять отзывы о них. Проект выполнялся в сборщике Webpack.

### ⚙ Функционал:

При клике на карту - открывается балун с формой для отзыва. После заполнения формы и нажатия на кнопку "Добавить", балун с формой закрывается, а на карту добавляется плейсмарк по тем координатам, по которым был открыт балун. Отзывы поблизости группируются в одну метку. У сгруппированных меток выводится их количество.

При масштабировании карты, происходит группировка меток. После нажатия на плейсмарк, открывается форма для составления нового отзыва по этим координатам, на форме присутствуют все ранее оставленные для этих координат отзывы.

При перезагрузке страницы, все отзывы и плейсмарки восстанавливаются (используется LocalStorage). При нажатии на сгруппированный объект открывается карусель отзывов.

### 🔧 Стек:
- JavaScript
- Webpack
- Handlebars
- API Яндекс-карт
- HTML, CSS

![](https://github.com/TimCookXXX/GeoReviews/blob/master/ymaps.png)

### ⚡️🕺 Теперь, благодаря отзывам, мы можем выбирать комфортные и интересные для нас места:
<p align="center">
  <img src="https://github.com/TimCookXXX/GeoReviews/blob/master/ymaps.gif"/>
</p>




