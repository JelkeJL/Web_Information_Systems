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
            fak_lat = parseFloat(coordinates[0])
            fak_lng = parseFloat(coordinates[1])
            //console.log(fakbarname, fak_lat,fak_lng)
        
            addFaktoMap(fak_lat,fak_lng)


            document.getElementById("fakbar_from_xml").innerHTML = 
            xmlDoc.getElementsByTagName("name")[i].childNodes[j].nodeValue + ": " 
            + xmlDoc.getElementsByTagName("description")[i].childNodes[j].nodeValue;
        
            fak_coor = [fak_lat,fak_lng];
            console.log(fak_coor);
        };


        //function to retrieve cudi
        function CudiFunction(xml, i, j) {
        
          // console.log(xml.responseText);
          var xmlDoc = xml.responseXML;
        
          var cudiname = xmlDoc.getElementsByTagName("name")[i].childNodes[j].nodeValue;
        
          coordinates = xmlDoc.getElementsByTagName("coordinates")[i].childNodes[j].nodeValue;
          coordinates = coordinates.split(",");
          //console.log(coordinates);
          cudi_lat = parseFloat(coordinates[0]);
          cudi_lng = parseFloat(coordinates[1]);
          //console.log(cudiname, cudi_lat,cudi_lng)
        
          addCuditoMap(cudi_lat,cudi_lng)
            
          document.getElementById("cudi_from_xml").innerHTML = 
          xmlDoc.getElementsByTagName("name")[i].childNodes[j].nodeValue + ": " 
          + xmlDoc.getElementsByTagName("description")[i].childNodes[j].nodeValue;
        
          cudi_coor = [cudi_lat,cudi_lng];
          console.log(cudi_coor);
          //return cudi_coor;
        
        }

        //test if addmarker functions work: successful
        /*addFaktoMap(50.8772801, 4.6982853)
        addCuditoMap(50.8742119, 4.7050093)*/

        $(document).ready(function() {

          $('#group').bind('change', function (e) { 
            //console.log("change");
        
            $('#overview').hide()
        
            if ($('#group').val() == 'empty'){
              $('#faculty_biomedical').hide();      
              $('#faculties_humanities').hide();
              $('#faculties_science').hide();
              $('#degrees_arts').hide();
              $('#overview').hide();
            }
        
            else if($('#group').val() == 'humanities') {     
              $('#faculties_science').hide();
              $('#faculty_biomedical').hide();
        
              $('#faculties_humanities').show();
        
              $('#fac_hum').bind('change', function (e){
                if ($('#fac_hum').val() == 'empty'){
                  $('#overview').hide();
                } else if ($('#fac_hum').val() != 'arts'){
                  $('#degrees_arts').hide();
        
                  if ($('#fac_hum').val() == 'economics'){
                    $('#overview').show();
                    retrieve_cudi(8,0)
                    retrieve_fak(0,0)
                  } else if ($('#fac_hum').val() == 'philosophy'){
                    $('#overview').show();
                    retrieve_cudi(12,0)
                    retrieve_fak(8,0)
                    
                  } else if ($('#fac_hum').val() == "canon"){
                    document.getElementById("cudi_from_xml").innerHTML = "Our dataset does not contain any information on canon law course services. However, check https://katechetika.be/student for more information"
                    document.getElementById("fakbar_from_xml").innerHTML = "Our dataset does not contain any information on canon law fakbars. However, check https://katechetika.be/student for more information"


                  } else if ($('#fac_hum').val() == 'theology'){
                    $('#overview').show();
                    retrieve_fak(8,0)
                    document.getElementById("cudi_from_xml").innerHTML = "Our dataset does not contain any information on theology course services. However, check https://katechetika.be/student for more information"

                    
                  } else if ($('#fac_hum').val() == 'law'){
                    $('#overview').show();
                    retrieve_cudi(7,0)
                    retrieve_fak(5,0)
                  } else if ($('#fac_hum').val() == 'social'){
                    $('#overview').show();
                    retrieve_cudi(13,0)
                    retrieve_fak(6,0)
                  } else if ($('#fac_hum').val() == 'psychology'){
                    $('#overview').show();
                    retrieve_cudi(6,0)
                    retrieve_fak(10,0)
                  } 
        
                } else if ($('#fac_hum').val() == 'arts'){
                  
                  $('#degrees_arts').show();

                  $('#degree').bind('change', function (e){
                    if ($('#degree').val() == 'empty'){
                      $('#overview').hide();
                    } else if ($('#degree').val() == 'literature'){
                      retrieve_fak(3,0)
                      retrieve_cudi(1,0)
                      $('#overview').show();
                    } else {
                      retrieve_fak(3,0)
                      retrieve_cudi(3,0)
                      $('#overview').show();
                    }
                  }).trigger('change');
    
                } 
    
              }).trigger('change');
        }

            else if( $('#group').val() == 'science') {
              $('#faculties_humanities').hide();
              $('#faculty_biomedical').hide();
              $('#degrees_arts').hide()

              $('#faculties_science').show();

              $('#fac_sci').bind('change', function (e){
                if ($('#fac_sci').val() == 'empty'){
                  $('#overview').hide();
                } else if ($('#fac_sci').val() == 'architecture'){
                  retrieve_fak(2,0)
                  retrieve_cudi(4,0)
                  $('#overview').show();
                } else if ($('#fac_sci').val() == 'science'){
                  retrieve_fak(11,0)
                  retrieve_cudi(5,0)
                  $('#overview').show();
                } else if ($('#fac_sci').val() == 'engineering_sc'){
                  retrieve_fak(2,0)
                  retrieve_cudi(4,0)
                  $('#overview').show();
                } else if ($('#fac_sci').val() == 'bioscience'){
                  retrieve_fak(4,0)
                  retrieve_cudi(11,0)
                  $('#overview').show();
                } else if ($('#fac_sci').val() == 'engineering'){
                  retrieve_fak(2,0)
                  retrieve_cudi(1,0)
                  $('#overview').show();
                }
              }).trigger('change');
              

            }
        
            else if( $('#group').val() == 'biomedical') {
              $('#faculties_humanities').hide();
              $('#faculties_science').hide();
              $('#degrees_arts').hide();              

              $('#faculty_biomedical').show();
              $('#fac_bio').bind('change', function (e){

                if ($('#fac_bio').val() == 'empty'){
                  $('#overview').hide();
                } else if ($('#fac_bio').val() == 'medicine'){
                  retrieve_fak(1,0)
                  retrieve_cudi(9,0)
                  $('#overview').show();
                } else if ($('#fac_bio').val() == 'pharma'){
                  retrieve_fak(1,0)
                  retrieve_cudi(9,0)
                  $('#overview').show();
                } else if ($('#fac_bio').val() == 'kine'){
                  retrieve_fak(7,0)
                  retrieve_cudi(2,0)
                  $('#overview').show();
                }

              }).trigger('change');
            }
        
          }).trigger('change');
        
        });


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
            scaledSize: new google.maps.Size(20, 20), // scaled size
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
