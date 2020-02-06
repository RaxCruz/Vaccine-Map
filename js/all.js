var map;
var maskData;
var marker;

//set default location
map = L.map('map').setView([-25.363, 131.044], 5);
//maxZoom: 16 as the maximum zoom
map.locate({ maxZoom: 16 });
//show alert if locate error
// map.on('locationerror', onLocationError);
//find your location
// map.on('locationfound', onLocationFound);
//add mark


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '<a href="https://www.openstreetmap.org/">OSM</a>',
  maxZoom: 18,
}).addTo(map);

var xhr = new XMLHttpRequest();
xhr.open('get', 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json?fbclid=IwAR3XtDf10Tocq8nHU3kLdEtLvAb_yBIPum9i_t2m_wsHMV41ZdufKpWjDu4');
xhr.send(null);
xhr.onload = function () {
  maskData = JSON.parse(xhr.responseText);
}

function getdata() {
  for (let i = 0; i < maskData.features.length; i++) {
    let geometry = maskData.features[i].geometry.coordinates;
    let marker = L.marker(geometry);
    marker.addTo(map);
    // console.log(geometry[0]);
  }
}

//mark the map
// var marker = L.marker([-25.363, 131.044]);


function onLocationFound(e) {
  var radius = e.accuracy;

  L.marker(e.latlng).addTo(map)
  // .bindPopup("You are within " + radius + " meters from this point").openPopup();
  L.circle(e.latlng, radius).addTo(map);

  map.data.loadGeoJson('YOURFILE.json');
}

function onLocationError(e) {
  e.message = "無法使用GPS抓取您的位置，請開啟GPS功能後，重新整理。"
  alert(e.message);
}

