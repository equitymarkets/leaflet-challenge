//Create map object
myMap = L.map("map", {
    enter: [44.5802, -103.4617],
    zoom: 1
});

//Create tile layer 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//Store API endpoint as URL
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//Run GET request 
d3.json(url).then(data => {
    dataFeatures = data.features;
    L.geoJson(data).addTo(myMap);
    //createFeatures(dataFeatures);

});

// function createFeatures(data) {
//     //Include popups that provide additional information about 
//     //the earthquake when its associated marker is clicked.
//     onEachFeature(feature, layer) {
//         layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    
//     }
//     }
