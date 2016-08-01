var Flights = require( './models/flight' )
var Hotels = require( './models/hotel' )
var DisplayFlights = require( './views/flightViewer')
var HotelView = require( './views/hotelViewer' )
var State = require( './models/state' )

var capitalize = function( string ) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

window.onload = function(){
  state = new State()
  display( 'nights', state.nights )
  dateSetter()
  var nightslider = document.getElementById( 'nightslider' );

  nightslider.onchange = function() {
    state.nights = nightslider.value
    display('nights', state.nights)
  }

  var date = document.getElementById('check_in');

  date.onchange = function(e) {
    state.departDate = date.value;
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
    state.flightsearch = new Flights( state.allFlights, state )
    console.log( state.allFlights )
  }

  var click = document.getElementById( 'click' )
  var form = document.getElementById( 'city-form' );
  var city = document.getElementById( 'city' )


  click.onclick = function( event ) {
    flightClick( city )
  }

  form.onsubmit = function( event ) {
    event.preventDefault();
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
  // *****
  state.budget = state.cost - state.flightsearch.state.options[0].cost
  //  console.log( displayFlights.sorted )
  // state.budget = state.cost - object.sorted[0].Quotes.MinPrice
  // *****
  console.log( "Budget: ", state.budget )

}

var addDays = function(date, days) {

  var someDate = new Date( date );
  var numberOfDaysToAdd = parseInt( days )
  console.log( days )
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
    var code = state.flightsearch.airport
    console.log( code )

    var  url = "http://partners.api.skyscanner.net/apiservices/browsedates/v1.0/GB/GBP/en-GB/EDI/" + code + "/" + state.departDate + "/" + state.returnDate + "?apiKey=eu863416336220144245856861714199"
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.send(null);

    request.onload = function(){

      state.flightsearch.clear()
      var response = request.responseText
      var flights = JSON.parse( response )
      state.flight = flights
      console.log( state.flight )

      state.flightsearch.getQuote( state.flight )

      state.flightsearch.outboundName( state.flightsearch.state.option1, state.flight )

      state.flightsearch.inboundName( state.flightsearch.state.option1, state.flight )

      state.flightsearch.outboundName( state.flightsearch.state.option2, state.flight )

      state.flightsearch.inboundName( state.flightsearch.state.option2, state.flight )

      state.flightsearch.fillOptions( state.flightsearch.state.option1, state.flightsearch.state.option2 )
      console.log( state.flightsearch.state.options )
      var displayFlights = new DisplayFlights( state.flightsearch.state.options )
      displayFlights.display()

      updateBudget();
      hotelClick( city )
    } 
  }


var hotelClick = function( city ) {
  var hotelUrl = "http://terminal2.expedia.com/x/mhotels/search?city=" + city.value.toUpperCase() + "&checkInDate=" + state.departDate + "&checkOutDate=" + state.returnDate + "&room1=3&apikey=a7zmRxiJIznimU5WOlHpTRjDAOFZsrga";
  var hotelsRequest = new XMLHttpRequest();
  hotelsRequest.open( "GET", hotelUrl )
  hotelsRequest.send( null );

  hotelsRequest.onload = function() {
    var hotelResponse = hotelsRequest.responseText;
    var allHotels = JSON.parse( hotelResponse );
    console.log( state.budget )
    hotelSearch = new Hotels( allHotels, state.nights, state.budget )
    hotelSearch.sort();
    hotelSearch.fixNum();
    hotelSearch.orderNums();
    // hotelSearch.order();
    // console.log( hotelSearch.order() )
    hotelSearch.select();
    var hotelViewer = new HotelView( hotelSearch.pickThree, state.nights )
  }
}




