
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
        var image = $('<img>').addClass('mx-auto mt-5  icon').attr({ 'id': cats[i], 'src': srcs[i] });
        row.append(image);
        $('#main').append(row);
    }
}
renderMain();

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
    var subText = '';
    //clear icons
    $('#main').empty();
    //display 3 sub-categories
    for (let i = 0; i < 3; i++) {
        var subText = subCategories[clickedIcon][i];
        var row = $('<div>').addClass('row');
        var subDiv = $('<div>').text(subText).addClass('sub mx-auto mt-5').attr('id', subText);
        $('#main').append(row);
        row.append(subDiv);
    };
});

//click on subcategory to populate options
$(document).on('click', ".sub", function () {
    //this object is pre-populated for testing purposes, but will eventually be an array that
    //is populated with three closest options 
    //ex: var options = [response.name1, response.name2, response.name3]
    var options = {
        Italian: ['italian1', 'italian2', 'italian3'],
        Thai: ['thai1', 'thai2', 'thai3'],
        American: ['american1', 'american2', 'american3'],
        Groceries: ['groceries1', 'groceries2', 'groceries3'],
        General: ['general1', 'general2', 'general3'],
        Mall: ['mall1', 'mall2', 'mall3'],
        Movie: ['movie1', 'movie2', 'movie3'],
        Bar: ['bar1', 'bar2', 'bar3'],
        Yoga: ['yoga1', 'yoga2', 'yoga3']
    };
    //changes text at top of screen
    $('#title').text("Take Me To...").css("font-size", "12vw");
    $('#main').empty();
    //determine which subcategory clicked on 
    var clickedSub = $(this).attr('id');
    //render three closest names
    for (let i = 0; i < 3; i++) {
        var optionText = options[clickedSub][i];//will change to options[i] eventually
        var row = $('<div>').addClass('row');
        var optionDiv = $('<div>').text(optionText).addClass('option mx-auto mt-5').attr('id', 'option' + i);
        $('#main').append(row);
        row.append(optionDiv);
    }
});

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


var apiKey = 'AIzaSyCUM6ziq10bpobC1rqrO3O9LGJwgzUTJEA';  //Alex's key
//test example Url found in google places documentation page
//second attempt
var queryURL = 'https://cors-anywhere.herokuapp.com/' + 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=' + apiKey;

$.ajax({
    url: queryURL,
    method: 'GET',
}).then(function (response) {
    console.log(response);
}); 