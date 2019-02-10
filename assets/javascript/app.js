//function to render main screen
function renderMain() {
    //render title
    var titleDiv = $('<div>').addClass('mx-auto mt-4').attr('id', 'title').text('Wait It Out');
    $('#title-row').append(titleDiv);
    //render category icons
    for (var i = 0; i < 3; i++) {
        var cats = ['Food', 'Shopping', 'Entertainment'];
        var srcs = ['assets/Images/food_icon.png', 'assets/Images/cart.png', 'assets/Images/masks2.png'];
        //create row div and img, and append img to row and row to #main
        var row = $('<div>').addClass('row').attr('id', 'row' + i);
        //append img to row
        var image = $('<img>').addClass('mx-auto mt-5  icon hvr-pulse-grow').attr({'id': cats[i], 'src': srcs[i]});
        row.append(image);
        $('#main').append(row);
    }
}

renderMain();
var userSelection = [];

//click on icon to show subcategories
$('.icon').on('click', function () {
    //changes text at top of screen
    $('#title').text("I'm in the mood for...").css("font-size", "8vw");
    // var to store subcategories
    var subCategories = {

        Food: ['Italian', 'Thai', 'American'],
        Shopping: ['Groceries', 'General', 'Mall'],
        Entertainment: ['Movie', 'Bar', 'Yoga']
    };
    var clickedIcon = $(this).attr('id');
    userSelection.typeSelection = clickedIcon;
    console.log(userSelection);
    var subText = '';
    //clear icons
    $('#main').empty();
    //display 3 sub-categories
    for (let i = 0; i < 3; i++) {
        var subText = subCategories[clickedIcon][i];
        var row = $('<div>').addClass('row');
        // var subDiv = $('<div>').text(subText).addClass('sub mx-auto mt-5').attr('id', subText);
        var subDiv = $('<div>').text(subText).addClass('sub option').attr('id', subText);
        $('#main').append(row);
        row.append(subDiv);
        subDiv.click(function () {
            userSelection.subCategorySelection = $(this).attr('id');
            console.log(userSelection);
            googleApiCall();

        })
    }
});

$('.subcategory').on('click', function () {
    userSelection.subcategorySelection = $(this).id;
    console.log(userSelection);
    $('#main').empty();

});

//modal functionality
var modal = document.getElementById('simpleModal');
var modalBtn = $('#modalBtn');
var closeBtn = $('#closeBtn');
$('#modalBtn').on('click', openModal);

function openModal() {
    modal.style.display = "block";
}

$('#closeBtn').on('click', closeModal);

function closeModal() {
    modal.style.display = "none";
}

window.addEventListener('click', clickOutside);

function clickOutside(e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}

// Log location Data
var userLocation = {};

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        openModal()
    }
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    userLocation.userLatitude = latitude;
    userLocation.userLongitude = longitude;
}

getLocation();

var destination;


function googleApiCall() {
    console.log('making api call');
    var url = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    var apiKey = 'AIzaSyCUM6ziq10bpobC1rqrO3O9LGJwgzUTJEA';
    var combinedLocation = userLocation.userLatitude + "," + userLocation.userLongitude;
    console.log(combinedLocation);
    $.ajax(url, {
        data: {
            'key': apiKey,
            'location': combinedLocation,
            'radius': 10000,
            'keyword': userSelection.subCategorySelection,
            'name': userSelection.typeSelection,
            'opennow': true,
        }

    }).then(function (response) {
        console.log(response);
        $('#main').empty();
        $('#title').text("Take Me To...").css("font-size", "12vw");
        for (i = 0; i < 3; i++) {
            var result = $('<div>');
            result.attr('placeId', response.results[i].place_id);
            result.attr('latitude', response.results[i].geometry.location.lat);
            result.attr('longitude', response.results[i].geometry.location.lng);
            result.addClass('option');
            var name = $('<div class="nameDiv">');
            var locationInformation = $('<div class="localeInfo">');
            name.append(response.results[i].name);
            locationInformation.append(response.results[i].vicinity);
            result.append(name);
            result.append(locationInformation);
            var row = $('<div>').addClass('row');
            row.append(result)
            result.click(function () {
                $('#main').empty();
                // userSelection.subCategorySelection = $(this).attr('id');
                console.log("working");
                destination = $(this).attr('placeid');
                console.log(destination);
                //    declaring map variable
                var map
                    // GEO
                    , infoWindow;
                //    starting directions services 
                var directionsDisplay = new google.maps.DirectionsRenderer();
                var directionsService = new google.maps.DirectionsService();

                //    making sure that map is being read
                console.log("the map is responding but not displaying")

                map = new google.maps.Map(document.getElementById('map'), {
                    center: {lat: userLocation.userLatitude, lng: userLocation.userLongitude},
                    zoom: 15
                });
                //    updates the content of the map
                infoWindow = new google.maps.InfoWindow;
                //    will display direcitons on map
                directionsDisplay.setMap(map);

                function calculateRoute() {
                    // input locations here ( need to check why it won get the coordinates)
                    var request = {
                        origin: {lat: userLocation.userLatitude, lng: userLocation.userLongitude},
                        destination: {placeId: destination},
                        travelMode: 'DRIVING'
                    };
                    // displays the locations object in map
                    directionsService.route(request, function (result, status) {
                        console.log("im alive just not displaying");
                        console.log(result, status);
                        if (status == "OK") {
                            directionsDisplay.setDirections(result);
                        }
                    })
                }

                // calls the direction to the map
                calculateRoute();
            });
            $('#main').append(result);

        }
    })
}



