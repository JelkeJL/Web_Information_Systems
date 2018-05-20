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
              scaledSize: new google.maps.Size(17,17),
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
              url: 'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/129/books_1f4da.png',
              scaledSize: new google.maps.Size(20,20),
              origin: new google.maps.Point(0,0),
              anchor: new google.maps.Point(0,0),
            };

            var newmarker = new google.maps.Marker({
              position: addmarker,
              map: map,
              icon: books
            });

          };

        //test if addmarker functions work: successful
        /*addFaktoMap(50.8772801, 4.6982853)
        addCuditoMap(50.8742119, 4.7050093)*/

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
function retrieve_fak(o, p){

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        FakFunction(this, o, p);
    };
};

xhttp.open("GET", "fakbar_new.xml", true);
xhttp.send();

}


//reference to cudi.xml
function retrieve_cudi(o, p){

  var xhttp_ = new XMLHttpRequest();

  xhttp_.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        CudiFunction(this, o, p);
      };
  };

  xhttp_.open("GET", "cudi.xml", true);
  xhttp_.send();
  }


//function to retrieve fakbar
function FakFunction(xml, i, j) {
  // console.log(xml.responseText);
    var xmlDoc = xml.responseXML;
    
    var fakbarname = xmlDoc.getElementsByTagName("name")[i].childNodes[j].nodeValue;

    coordinates = xmlDoc.getElementsByTagName("coordinates")[i].childNodes[j].nodeValue;
    coordinates = coordinates.split(",");
    //console.log(coordinates);
    fak_lat = coordinates[0]
    fak_lng = coordinates[1]
    //console.log(fakbarname, fak_lat,fak_lng)

    //addFaktoMap(fak_lat,fak_lng)


    document.getElementById("fakbar_from_xml").innerHTML = 
    xmlDoc.getElementsByTagName("name")[i].childNodes[j].nodeValue + ": " 
    + xmlDoc.getElementsByTagName("description")[i].childNodes[j].nodeValue;

    return [fak_lat,fak_lng]
};


//function to retrieve cudi
function CudiFunction(xml, i, j) {

  // console.log(xml.responseText);
  var xmlDoc = xml.responseXML;

  var cudiname = xmlDoc.getElementsByTagName("name")[i].childNodes[j].nodeValue;

  coordinates = xmlDoc.getElementsByTagName("coordinates")[i].childNodes[j].nodeValue;
  coordinates = coordinates.split(",");
  //console.log(coordinates);
  cudi_lat = coordinates[0];
  cudi_lng = coordinates[1];
  //console.log(cudiname, cudi_lat,cudi_lng)

  //addCuditoMap(cudi_lat,cudi_lng)
    
  document.getElementById("cudi_from_xml").innerHTML = 
  xmlDoc.getElementsByTagName("name")[i].childNodes[j].nodeValue + ": " 
  + xmlDoc.getElementsByTagName("description")[i].childNodes[j].nodeValue;

  cudi_coor = [cudi_lat,cudi_lng];
  //console.log(cudi_coor);
  return cudi_coor;

};

retrieve_cudi(8,0)
console.log("test: ", retrieve_cudi(8,0))
retrieve_fak(0,0)

//construct interactive dropdown menus
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






