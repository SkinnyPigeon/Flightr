var Flights = require( './models/flight' )
var Hotels = require( './models/hotel' )
var DisplayFlights = require( './views/flightViewer')
var HotelView = require( './views/hotelViewer' )
var hotelSearch;
var code;

var state = {
  cost: 200,
  flight: "",
  budget: 0,
  nights: 3,
  departDate: "",
  returnDate: 0,
  allFlights: {},
  flightsearch: {},
  homeLat: "55.946831",
  homeLng: "-3.202032",
  outLat: "55.9508",
  outLng: "-3.3615", 
  inLat: "",
  inLng: "",
  hotelLat: "",
  hotelLng: "",
  home2airport: "",
  airport2hotel:"",
}

var capitalize = function( string ) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}



window.onload = function(){
  display( 'nights', state.nights )
  dateSetter()
  var nightslider = document.getElementById( 'nightslider' );

  nightslider.onchange = function() {
    state.nights = nightslider.value
    display('nights', state.nights)
  }



  var date = document.getElementById('check_in');

  date.onchange = function(e) {
    console.log(state.nights)


    state.departDate = date.value;
    console.log(state.date)
    

    addDays(state.departDate, state.nights)

  }


  var slider = document.getElementById( 'slider' );
  var budget = document.getElementById( 'budget' );
  var p = document.createElement( 'p' )
  state.cost = slider.value
  console.log( state.cost )

  p.innerHTML = slider.value
  budget.appendChild( p )

  slider.onchange = function(e) {
    state.cost = slider.value
    display('budget', state.cost);
  }

  var  flightUrl = "http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/GB/GBP/en-GB/EDI/anywhere/anytime/anytime?apiKey=eu863416336220144245856861714199"
  var flightsRequest = new XMLHttpRequest();
  flightsRequest.open( "GET", flightUrl );
  flightsRequest.send( null );

  flightsRequest.onload = function() {
    var flightResponse = flightsRequest.responseText
    state.allFlights = JSON.parse( flightResponse )
    state.flightsearch = new Flights( state.allFlights )
    console.log( state.allFlights )
  }

  var click = document.getElementById( 'click' )
  var form = document.getElementById( 'city-form' );
  var city = document.getElementById( 'city' )


  click.onclick = function( event ) {
    flightClick( city )
    
  }

  form.onsubmit = function( event ) {
    // flightClick( city )

    event.preventDefault();

    state.flightsearch.getCode( capitalize(city.value) )
    code = state.flightsearch.airport
    console.log( state.departDate )

    var  url = "http://partners.api.skyscanner.net/apiservices/browsedates/v1.0/GB/GBP/en-GB/EDI/" + code + "/" + state.departDate + "/" + state.returnDate + "?apiKey=eu863416336220144245856861714199"
    console.log( url )
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.send(null);

    request.onload = function(){
      var response = request.responseText
      var flights = JSON.parse( response )
      console.log( flights )
      state.flight = flights
      var displayFlights = new DisplayFlights( state.flight )
      updateBudget();
      console.log( state.budget )
      // hotelClick( city )
    }
  }
}

var display = function(string, item) {
  var option = document.getElementById( string );
  option.innerHTML = ""
  var p = document.createElement( 'p' )
  p.innerHTML = item
  option.appendChild( p )
}


var updateBudget = function() {
  state.budget = state.cost - state.flight.Quotes[0].MinPrice
}

var addDays = function(date, days) {


  var someDate = new Date( date );
  var numberOfDaysToAdd = parseInt( days )
  
  someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 

  var dd = someDate.getDate();
  var mm = someDate.getMonth() + 1;
  mm = mm.length > 1 ? mm : '0' + mm;
  dd = dd > 9 ? dd : '0' + dd;

  var y = someDate.getFullYear();

  var someFormattedDate = y + '-'+ mm + '-'+ dd;
  state.returnDate = someFormattedDate
}

var dateSetter = function() {
  myDate = document.getElementById( 'check_in' )
  if( new Date() >= myDate )
    myDate.value += 7

}

var flightClick = function( city ) {
  state.flightsearch.getCode( capitalize(city.value) )
  code = state.flightsearch.airport

  

  var  url = "http://partners.api.skyscanner.net/apiservices/browsedates/v1.0/GB/GBP/en-GB/EDI/" + code + "/" + state.departDate + "/" + state.returnDate + "?apiKey=eu863416336220144245856861714199"
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.send(null);

  request.onload = function(){
    var response = request.responseText
    var flights = JSON.parse( response )
    
    state.flight = flights
    console.log(flights)
    

    var displayFlights = new DisplayFlights( state.flight )
    updateBudget();
  
    hotelClick( city, code )



  } 
}

// var airportLatLng = function(){
// var url = "https://airport.api.aero/airport/"+ code +"?user_key=29928f311608ce703e2b98d0aa7e3264"
// var request = new XMLHttpRequest();
// request.open("GET", url);
// request.send(null);

// request.onload = function(){

//   var response = request.responseText
//   var airport = JSON.parse( response )
// }
// }


var hotelClick = function( city, code ) {
  var hotelUrl = "http://terminal2.expedia.com/x/mhotels/search?city=" + city.value.toUpperCase() + "&checkInDate=" + state.departDate + "&checkOutDate=" + state.returnDate + "&room1=3&apikey=a7zmRxiJIznimU5WOlHpTRjDAOFZsrga";
  var hotelsRequest = new XMLHttpRequest();
  hotelsRequest.open( "GET", hotelUrl )
  hotelsRequest.send( null );


  hotelsRequest.onload = function() {
    var hotelResponse = hotelsRequest.responseText;
    var allHotels = JSON.parse( hotelResponse );
    hotelSearch = new Hotels( allHotels  )
    hotelSearch.sort( state.budget, state.nights )
    displayHotel = new HotelView( hotelSearch.budgetHotels, state.nights )


    var latLng = function(){

      if(hotelSearch.budgetHotels[0]){
        state.hotelLat = hotelSearch.budgetHotels[0].latitude
      }
      if(hotelSearch.budgetHotels[0]){
        state.hotelLng = hotelSearch.budgetHotels[0].longitude
      }
    }
    latLng()
    console.log(hotelSearch)

    console.log(state.hotelLat)
    console.log(state.hotelLng)
    getAirportLatLng(code);
    requestUber1()
    requestUber2()
 
  }
}

function getAirportLatLng(code){

  var url = "http://localhost:3000/airports/" + code 
  var request = new XMLHttpRequest();
  request.open( "GET", url )
  request.send( null );

  request.onload = function(){
    if(request.status === 200){
      
      var uber = JSON.parse(request.responseText);
      state.inLat = uber[0].lat
      state.inLng = uber[0].lng



    }
  }
}

function requestUber1(){

var url = "https://api.uber.com/v1/estimates/price?start_latitude=" + state.homeLat + "&start_longitude=" + state.homeLng + "&end_latitude=" + state.outLat + "&end_longitude=" + state.outLng + "&server_token=d8Smu8d825OY2EOEiiCSih559Zw4FEht7slwXKOt"
var request = new XMLHttpRequest();
request.open( "GET", url )
request.send( null );





request.onload = function(){
  if(request.status === 200){

var uber = JSON.parse(request.responseText);
state.home2airport = uber.prices[0].high_estimate
console.log(state.home2airport)
console.log(uber)
  }

}
}
console.log(state.hotelLat)

function requestUber2(){

  var url = "https://api.uber.com/v1/estimates/price?start_latitude=" + state.inLat + "&start_longitude=" + state.inLng + "&end_latitude=" + state.hotelLat + "&end_longitude=" + state.hotelLng + "&server_token=d8Smu8d825OY2EOEiiCSih559Zw4FEht7slwXKOt"
  var request = new XMLHttpRequest();
  request.open( "GET", url )
  request.send( null );

  request.onload = function(){
    if(request.status === 200){
      var uber = JSON.parse(request.responseText);
      state.airport2hotel = uber.prices[0].high_estimate
      console.log(state.airport2hotel)
      console.log(uber)
    }
}


}





