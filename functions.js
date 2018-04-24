// this is the javascript hi jelke

// $(document).ready(function(){
//     function initMap() {
//         var ArenbergIII = {lat: 50.863002, lng: 4.678974};
//         var map = new google.maps.Map(document.getElementById('map'), {
//             zoom: 4,
//             center: ArenbergIII
//         });
//         var marker = new google.maps.Marker({
//             position: ArenbergIII,
//             map: map
//         });
//     }
//     async defer
//     src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAZHYymzYflI1c7mbhFTcsb6NN4ss7LBwU&callback=initMap"
// });

/** function initMap() {
    var ArenbergIII = {lat: 50.863002, lng: 4.678974};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: ArenbergIII
    });
    var marker = new google.maps.Marker({
        position: ArenbergIII,
        map: map
    });
}
**/

// Code source: https://developers.google.com/maps/documentation/javascript/examples/map-geolocation (Google API), last accessed 24 April 2018
var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 50.863002, lng: 4.678974},
          zoom: 15
        });
        infoWindow = new google.maps.InfoWindow;

// Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
