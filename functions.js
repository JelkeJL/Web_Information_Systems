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

/* load geodata */


/* slide show */

<<<<<<< HEAD
=======
$(document).ready(function(){

    $(".pics").cycle('fade');

});

$(document).ready(function(){

    $(".cudipics").cycle('fade');

});

>>>>>>> origin/master
// Code source: https://developers.google.com/maps/documentation/javascript/examples/map-geolocation (Google API), last accessed 24 April 2018


var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 50.863002, lng: 4.678974},
          zoom: 15
        });
        infoWindow = new google.maps.InfoWindow;

        //var image = 'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/129/woman-walking_1f6b6-200d-2640-fe0f.png'
        //walk = new google.maps.Marker({
          //icon: image
        //});

// Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

           infoWindow.setPosition(pos);
           infoWindow.setContent('You are here.');
           infoWindow.open(map);
            map.setCenter(pos);

          var image = {
            url : 'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/129/woman-walking_1f6b6-200d-2640-fe0f.png',
            scaledSize: new google.maps.Size(40, 40), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0), // anchor
          }
          var marker = new google.maps.Marker({
            position: pos,
            map:map,
            icon: image,
          });

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
        infoWindow.open(map,marker);
      }

// for displaying the images

//$(".pics").cycle('fade');

//var elem = document.getElementById("group");
//elem.onchange = function(){
//    var hiddenDiv = document.getElementById("faculties_humanities");
//    hiddenDiv.style.display = (this.value == "humanities") ? "none":"block";
//};

$(document).ready(function() {

  $('#group').bind('change', function (e) { 
    //console.log("change");
    if($('#group').val() == 'humanities') {
      $('#faculties_humanities').show();
      
      $('#faculties_science').hide();
      $('#faculty_biomedical').hide();
    }
    else if( $('#group').val() == 'science') {
      $('#faculties_science').show();
      
      $('#faculties_humanities').hide();
      $('#faculty_biomedical').hide();
    }
    else if( $('#group').val() == 'biomedical') {
      $('#faculty_biomedical').show();
      
      $('#faculties_humanities').hide();
      $('#faculties_science').hide();
    }
  }).trigger('change');




});
