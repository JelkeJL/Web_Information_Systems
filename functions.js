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

function initMap() {
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

