function myMap() {
var mapProp= {
  center:new google.maps.LatLng(23.177536,75.791861),
  zoom:15,
};
var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

  var uluru = {lat: 23.177536, lng: 75.791861};

  var marker = new google.maps.Marker({position: uluru, map: map});

}
