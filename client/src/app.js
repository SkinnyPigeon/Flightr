var Flights = require( './models/flight' )
var Hotels = require( './models/hotel' )
var DisplayFlights = require( './views/flightViewer')
var HotelView = require( './views/hotelViewer' )


var state = {
  cost: 200,
  flight: "",
  budget: 0
}

var capitalize = function( string ) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

window.onload = function(){

  var flightsearch
  var slider = document.getElementById( 'slider' );
  var budget = document.getElementById( 'budget' );
  var p = document.createElement( 'p' )
  state.cost = slider.value
    console.log( state.cost )

  p.innerHTML = slider.value
  budget.appendChild( p )

  slider.onchange = function() {
    state.cost = slider.value
    displayBudget();
  }

  var  flightUrl = "http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/GB/GBP/en-GB/EDI/anywhere/anytime/anytime?apiKey=eu863416336220144245856861714199"
  var flightsRequest = new XMLHttpRequest();
  flightsRequest.open( "GET", flightUrl );
  flightsRequest.send( null );

  flightsRequest.onload = function() {
    var flightResponse = flightsRequest.responseText
    var allFlights = JSON.parse( flightResponse )
    flightsearch = new Flights( allFlights )
    console.log( allFlights )
  }

  var click = document.getElementById( 'click' )
  var form = document.getElementById( 'city-form' );
  var city = document.getElementById( 'city' )


  click.onclick = function( event ) {
    flightsearch.getCode( capitalize(city.value) )
    var code = flightsearch.airport
    console.log( code )

    var  url = "http://partners.api.skyscanner.net/apiservices/browsedates/v1.0/GB/GBP/en-GB/EDI/" + code + "/2016-09-05/2016-09-07?apiKey=eu863416336220144245856861714199"
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

      var hotelUrl = "http://terminal2.expedia.com/x/mhotels/search?city=" + city.value.toUpperCase() + "&checkInDate=2016-12-01&checkOutDate=2016-12-03&room1=2&apikey=a7zmRxiJIznimU5WOlHpTRjDAOFZsrga";
      var hotelsRequest = new XMLHttpRequest();
      hotelsRequest.open( "GET", hotelUrl )
      hotelsRequest.send( null );

      hotelsRequest.onload = function() {
        var hotelResponse = hotelsRequest.responseText;
        var allHotels = JSON.parse( hotelResponse );
        hotelSearch = new Hotels( allHotels )
        hotelSearch.sort( state.budget )
        displayHotel = new HotelView( hotelSearch.budgetHotels )
      }
    } 
  }



  form.onsubmit = function( event ) {
    event.preventDefault();
    flightsearch.getCode( capitalize(city.value) )
    var code = flightsearch.airport
    console.log( code )

    var  url = "http://partners.api.skyscanner.net/apiservices/browsedates/v1.0/GB/GBP/en-GB/EDI/" + code + "/2016-09-05/2016-09-07?apiKey=eu863416336220144245856861714199"
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
    }
  }
}

var displayBudget = function() {
  var budget = document.getElementById( 'budget' );
  budget.innerHTML = ""
  var p = document.createElement( 'p' )
  p.innerHTML = state.cost
  budget.appendChild( p )
}

var updateBudget = function() {
  state.budget = state.cost - state.flight.Quotes[0].MinPrice
}


