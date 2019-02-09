// Log location Data
//todo alert needs to be changed to a modal
var userLocation = {};
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    userLocation.userLatitude = latitude;
    userLocation.uerLongitude = longitude;
}
getLocation();