mapboxgl.accessToken = myToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

const  nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'bottom-left');

new mapboxgl.Marker()
.setLngLat( campground.geometry.coordinates)
.setPopup(
    new mapboxgl.Popup({offset: 15})
    .setHTML(
        `<h3>${campground.title}</h3><p>${campground.location}</P>`
    )
)
.addTo(map)
