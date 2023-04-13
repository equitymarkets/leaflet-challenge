//Create map object
let myMap = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 5
});

//Create tile layer 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//Store API endpoint as URL
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//Set style object
function markerSize(magnitude) {
    if(magnitude > 0) {
        return Math.sqrt(magnitude) * 25000;
    }
    else return 0;
  }


//Run GET request 
d3.json(url).then(function(data) {
    //Loop to set colors of the markers
    for (let i = 0; i < data.features.length; i++) {
        var location = data.features[i];
        console.log(i, location.properties.mag)
        var color = "";

        if (location.geometry.coordinates[2] < 10) {
            color = "#008000";
        }
        else if (location.geometry.coordinates[2] < 30) {
            color = "#9ACD32";
        }
        else if (location.geometry.coordinates[2] < 50) {
            color = "#FFFF00";
        }
        else if (location.geometry.coordinates[2] < 70) {
            color = "#FFD580";
        }
        else if (location.geometry.coordinates[2] < 90) {
            color = "#FFA500";
        }
        else {
            color = "#FF0000";
        }
        //Sets circle objects with all criteria
        let markers = L.circle([location.geometry.coordinates[1],location.geometry.coordinates[0]], {
            fillOpacity: 0.8,
            color: "black",
            fillColor: color,
            weight: .3,
            radius: markerSize(location.properties.mag)
        }).bindPopup(`<h3>Location: ${location.properties.place}<hr>Latitude: ${location.geometry.coordinates[1]}
        <hr>Longitude: ${location.geometry.coordinates[0]}<hr>Magnitude: ${location.properties.mag}
        <hr>Depth: ${location.geometry.coordinates[2]}</h3>`).addTo(myMap);

        markers.bindTooltip(`Magnitude: ${location.properties.mag} <hr>Latitude: ${location.geometry.coordinates[1]}<hr>Longitude: ${location.geometry.coordinates[0]} <hr>Depth: ${location.geometry.coordinates[2]}`);

    }
//Defines the legend
var legend = L.control({ position: "bottomright" });
//Sets HTML to render color legend for depth
legend.onAdd = function(myMap) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<span style='float: left; width: 1em; height: 1em; background-color: #008000; margin: 2px;'></span><span>-10 - 10</br>"; 
  div.innerHTML += "<span style='float: left; width: 1em; height: 1em; background-color: #9ACD32; margin: 2px;'></span><span>10 - 30</span></br>";
  div.innerHTML += "<span style='float: left; width: 1em; height: 1em; background-color: #FFFF00; margin: 2px;'></span><span>30 - 50</span></br>";
  div.innerHTML += "<span style='float: left; width: 1em; height: 1em; background-color: #FFD580; margin: 2px;'></span><span>50 - 70</span><br>";
  div.innerHTML += "<span style='float: left; width: 1em; height: 1em; background-color: #FFA500; margin: 2px;'></span><span>70 - 90</span><br>";
  div.innerHTML += "<span style='float: left; width: 1em; height: 1em; background-color: #FF0000; margin: 2px;'></span><span>70 - 90</span><br>";
  
  return div;
};

legend.addTo(myMap);

});
 