
// TESTING IF THIS DEVICE ALLOWS GEOLOCATION
// if (navigator.geolocation) {
//     console.log('Geolocation is supported!');
// }
// else {
// console.log('Geolocation is not supported for this Browser/OS.');
// }


window.onload = function() {
    var startPos;
    var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
    
    // watchPosition() is for to constantly get the location. 
};


//https://developers.google.com/web/fundamentals/native-hardware/user-location

// GPS TRACKER: https://www.youtube.com/watch?v=UeSKdGzXY18