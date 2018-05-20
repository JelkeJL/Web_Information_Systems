/* load geodata */
// Code source: https://developers.google.com/maps/documentation/javascript/examples/map-geolocation (Google API), last accessed 24 April 2018


var map, infoWindow;
      function initMap() {

        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 50.863002, lng: 4.678974},
          zoom: 15
        });

        infoWindow = new google.maps.InfoWindow;


        // function to add Fakbar markers 

        function addFaktoMap (a,b){

            var addmarker = {lat: a, lng: b};

            var beer = {
              url: 'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/129/beer-mug_1f37a.png',
              scaledSize: new google.maps.Size(40,40),
              origin: new google.maps.Point(0,0),
              anchor: new google.maps.Point(0,0),
            };

            var newmarker = new google.maps.Marker({
              position: addmarker,
              map: map,
              icon: beer
            });

          };


        //function to add cudi markers

        function addCuditoMap (a,b){

            var addmarker = {lat: a, lng: b};

            var books = {
              url: 'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/129/beer-mug_1f37a.png',
              scaledSize: new google.maps.Size(40,40),
              origin: new google.maps.Point(0,0),
              anchor: new google.maps.Point(0,0),
            };

            var newmarker = new google.maps.Marker({
              position: addmarker,
              map: map,
              icon: books
            });

          };

        // Try HTML5 geolocation; code based on Google documentation
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

          var walk = {
            url : 'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/129/woman-walking_1f6b6-200d-2640-fe0f.png',
            scaledSize: new google.maps.Size(40, 40), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0), // anchor
          }

          var marker = new google.maps.Marker({
            position: pos,
            map:map,
            icon: walk,
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
      };


//reference to fakbar_new.xml
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
    };

};

xhttp.open("GET", "fakbar_new.xml", true);
xhttp.send();

//reference to cudi.xml
var xhttp_ = new XMLHttpRequest();
xhttp_.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        myFunction_(this);
    };
};
xhttp_.open("GET", "cudi.xml", true);
xhttp_.send();


//function to retrieve fakbar
function myFunction(xml) {
  // console.log(xml.responseText);
    var xmlDoc = xml.responseXML;
    
    var fakbarname = xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue;

    document.getElementById("fakbar_from_xml").innerHTML = 
    xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue + ": " 
    + xmlDoc.getElementsByTagName("description")[0].childNodes[0].nodeValue;
    //+ xmlDoc.getElementsByTagName("Point")[0]childNodes[0].nodeValue;
    //console.log(xmlDoc.getElementsByTagName("coordinates")[0].childNodes[0].nodeValue);
    coordinates = xmlDoc.getElementsByTagName("coordinates")[0].childNodes[0].nodeValue;
    coordinates = coordinates.split(",");
    //console.log(coordinates);
    ecofaklat = coordinates[0]
    ecofaklng = coordinates[1]
    console.log(fakbarname, ecofaklat,ecofaklng)

    eco = [ecofaklat, ecofaklng]
   
   //$('#overview').show()
};

//function to retrieve cudi
function myFunction_(xml) {
  // console.log(xml.responseText);
    var xmlDoc = xml.responseXML;
    
    document.getElementById("cudi_from_xml").innerHTML = 
    xmlDoc.getElementsByTagName("name")[8].childNodes[0].nodeValue + ": " 
    + xmlDoc.getElementsByTagName("description")[8].childNodes[0].nodeValue;
    //+ xmlDoc.getElementsByTagName("Point")[0]childNodes[0].nodeValue;
    //console.log(xmlDoc.getElementsByTagName("coordinates")[0].childNodes[0].nodeValue);
    coordinates = xmlDoc.getElementsByTagName("coordinates")[8].childNodes[0].nodeValue;
    coordinates = coordinates.split(",");
    //console.log(coordinates);
    lat = coordinates[0]
    lng = coordinates[1]
    console.log(lat,lng)


   
   //$('#overview').show()
};


//http://jsfiddle.net/VLQKw/1/ used as a reference for conditional dropdown menus

$(document).ready(function() {

  $('#group').bind('change', function (e) { 
    //console.log("change");

    $('#overview').hide()

    if ($('#group').val() == 'empty'){
      $('#faculty_biomedical').hide();      
      $('#faculties_humanities').hide();
      $('#faculties_science').hide();
      $('#degrees_arts').hide();
    }

    else if($('#group').val() == 'humanities') {     
      $('#faculties_science').hide();
      $('#faculty_biomedical').hide();

      $('#faculties_humanities').show();

      $('#fac_hum').bind('change', function (e){
        if ($('#fac_hum').val() != 'arts'){
          $('#degrees_arts').hide();

          if ($('#fac_hum').val() == 'economics'){
            $('#overview').show();
          };

        }

        else if ($('#fac_hum').val() == 'arts'){
          $('#degrees_arts').show();
        };

      }).trigger('change');
    }

    else if( $('#group').val() == 'science') {
      $('#faculties_science').show();
      
      $('#faculties_humanities').hide();
      $('#faculty_biomedical').hide();
      $('#degrees_arts').hide()
    }

    else if( $('#group').val() == 'biomedical') {
      $('#faculty_biomedical').show();
      
      $('#faculties_humanities').hide();
      $('#faculties_science').hide();

      $('#degrees_arts').hide();
    }

  }).trigger('change');

});






