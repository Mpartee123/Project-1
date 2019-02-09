
//function to render main screen
function renderMain(){
    //render title
    var titleDiv = $('<div>').addClass('mx-auto mt-4').attr('id', 'title').text('Wait It Out')
    $('#title-row').append(titleDiv)
    //render category icons
    for(var i = 0; i < 3; i++){
        var cats = ['food', 'shopping', 'entertainment']
        var srcs = ['assets/images/food_icon.png', 'assets/Images/cart.png', 'assets/images/masks2.png']
        //create row div and img, and append img to row and row to #main
        var row = $('<div>').addClass('row').attr('id', 'row'+ i)
        //append img to row
        var image = $('<img>').addClass('mx-auto mt-5  icon').attr({'id':cats[i], 'src': srcs[i] } )
        row.append(image)
        $('#main').append(row)
    }
}
renderMain()

//click on icon to show subcategories
$('.icon').on('click', function(){
    //changes text at top of screen
    $('#title').text("I'm in the mood for...").css("font-size", "8vw")
    // var to store subcategories
    var subCategories = {
        food: ['Italian', 'Thai', 'American'],
        shopping: ['Groceries', 'General', 'Mall'],
        entertainment: ['Movie', 'Bar', 'Yoga']
    }
    var clickedIcon = $(this).attr('id');
    var subText = '';
    //clear icons
    $('#main').empty();
    //display 3 sub-categories
    for(let i = 0; i < 3; i++){
        var subText = subCategories[clickedIcon][i];//subCategories.clickedIcon[i] didn't work. Why?
        var row = $('<div>').addClass('row')
        var subDiv = $('<div>').text(subText).addClass('sub mx-auto mt-5').attr('id', subText);
        $('#main').append(row)
        row.append(subDiv)
    } 
})

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
