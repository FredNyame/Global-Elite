//AIzaSyA_t6258unESVqLLPkTSBi2oWM_oK-j2nU
let map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}
console.log('worked')