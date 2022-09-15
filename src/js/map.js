export function initMap() {
    const mapElement = document.getElementById('map');

    if (!mapElement) {
        return;
    }

    ymaps.ready(init);

    function init() {
        const myMap = new ymaps.Map(mapElement, {
                center: [55.76, 37.64],
                zoom: 10,
            }, {
                searchControlProvider: 'yandex#search',
            }),
            objectManager = new ymaps.ObjectManager({
                clusterize: true,
                gridSize: 32,
                clusterDisableClickZoom: true,
            });
        objectManager.objects.options.set('preset', 'islands#orangeDotIcon');
        objectManager.clusters.options.set('preset', 'islands#orangeClusterIcons');
        myMap.geoObjects.add(objectManager);

        return fetch('http://card.zoupe.ru/sites.1.json', {
            method: 'GET',
            mode: 'cors',
        })
            .then((response) => response.json())
            .then((response) => {
                objectManager.add(response)
            })
    }
}