import { formTemplate } from "../templates/templates"
let clusterer

function mapInit() {
    ymaps.ready(() => {
        const myMap = new ymaps.Map('map', {
            center: [55.75, 37.62],
            zoom: 13.5,
            controls: ['zoomControl']
        }, {
            balloonMaxWidth: 353,
            balloonMaxHeight: 501,
            searchControlProvider: 'yandex#search'
        })
        myMap.events.add('click', function (e) {
            const coords = e.get('coords')
            openBalloon(myMap, coords, [])
        })

        clusterer = new ymaps.Clusterer({ clusterDisableClickZoom: true })
        clusterer.options.set('hasBalloon', false)
        renderGeoObjects(myMap)

        clusterer.events.add('click', function (e) {
            let geoObjectsInCluster = e.get('target').getGeoObjects()
            openBalloon(myMap, e.get('coords'), geoObjectsInCluster)
        })

        let now = new Date().toLocaleDateString();

        function getReviewsFromLS() {
            const reviews = localStorage.reviews
            return JSON.parse(reviews || '[]')
        }

        function getReviewList(currentGeoObjects) {
            let reviewListHTML = ''

            for (const review of getReviewsFromLS()) {
                if (currentGeoObjects.some(geoObject => JSON.stringify(geoObject.geometry._coordinates) === JSON.stringify(review.coords))) {
                    reviewListHTML += `
                    <div class="review">
                        <div class="review__content">
                            <div class="review__info">${review.author}</div>
                            <div class="review__place">${review.place}</div>
                            <div class="review__time">${now}</div>
                        </div>
                        <div class="review__text">${review.reviewText}</div>
                    </div>`
                }
            }

            return reviewListHTML
        }

        function renderGeoObjects(map) {
            const geoObjects = []

            for (const review of getReviewsFromLS()) {
                const placemark = new ymaps.Placemark(review.coords)
                placemark.events.add('click', e => {
                    e.stopPropagation()
                    openBalloon(map, e.get('coords'), [e.get('target')])
                })
                geoObjects.push(placemark)
            }

            clusterer.removeAll()
            map.geoObjects.remove(clusterer)
            clusterer.add(geoObjects)
            map.geoObjects.add(clusterer)
        }

        async function openBalloon(map, coords, currentGeoObjects) {
            await map.balloon.open(coords, {
                content: `<div class="reviews">${getReviewList(currentGeoObjects)}</div>` + formTemplate
            })

            document.querySelector('#add-form').addEventListener('submit', function (e) {
                let reviewInput = document.getElementsByClassName('review__input')
                let reviewTextarea = document.querySelector('.review__textarea')
                e.preventDefault()
                const review = {
                    coords,
                    author: this.elements.author.value,
                    place: this.elements.place.value,
                    reviewText: this.elements.review.value
                }

                if (!this.elements.author.value || !this.elements.place.value || !this.elements.review.value) {
                    for (let i = 0; i < reviewInput.length; i++) {
                        reviewInput[i].style.border = '1px solid red'
                    }
                    reviewTextarea.style.border = '1px solid red'
                    return
                }

                localStorage.reviews = JSON.stringify([...getReviewsFromLS(), review])

                renderGeoObjects(map)
                map.balloon.close()
            })
        }
    })
}

export {
    mapInit
}