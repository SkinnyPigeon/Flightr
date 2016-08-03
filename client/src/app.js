var Flights = require( './models/flight' )
var Hotels = require( './models/hotel' )
var DisplayFlights = require( './views/flightViewer')
var HotelView = require( './views/hotelViewer' )
var State = require( './models/state' )
var hotelSearch;
var code;

var Form = require( './models/user' );

var capitalize = function( string ) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

window.onload = function(){
  var form = new Form();
  var signIn = document.getElementById( 'signIn' )
  var showForm = document.getElementById( 'container' )
  signIn.onclick = function(e) {
    console.log( "clicked" )
    showForm.style.display = "block"
  }

  var submission = document.getElementById( 'sign_user' ) 
  submission.onclick = function(e) {
    // e.preventDefault();

    form.submit();
    console.log( "hello")
  }

  state = new State()
  display( 'people_slider', state.people )
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

  var peopleSlider = document.getElementById( 'people' )
  // state.people = peopleSlider.value
  peopleSlider.onchange = function(e) {
    state.people = peopleSlider.value
    display( 'people_slider', state.people )
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
  option.style.display = "block"
  option.innerHTML = ""
  var p = document.createElement( 'p' )
  p.innerHTML = item
  option.appendChild( p )
}


var updateBudget = function() {
  state.budget = state.cost - ( state.flightsearch.state.options[0].cost * state.people )
  console.log( "Budget: ", state.budget )
}

var removeUberCost = function() {
  
  state.uberTotal = ( state.home2airport + state.airport2hotel )
  state.budget -=  state.uberTotal
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


      updateBudget();
      hotelClick( city, code )
      // show( 'package' )
    } 
  }


var show = function( string ) {
  var option = document.getElementById( string )
  option.style.display = "block"
}


var hotelClick = function( city, code ) {
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
    hotelSearch.select();

    var getHotelLatLng1 = function(){

      if(hotelSearch.pickThree[0]){
        state.hotel1Lat = hotelSearch.pickThree[0].latitude
      }
      if(hotelSearch.pickThree[0]){
        state.hotel1Lng = hotelSearch.pickThree[0].longitude
      }
    }
    var getHotelLatLng2 = function(){

      if(hotelSearch.pickThree[1]){
        state.hotel2Lat = hotelSearch.pickThree[1].latitude
      }
      if(hotelSearch.pickThree[1]){
        state.hotel2Lng = hotelSearch.pickThree[1].longitude
      }
    }
  
    var getHotelLatLng3 = function(){

      if(hotelSearch.pickThree[2]){
        state.hotel3Lat = hotelSearch.pickThree[2].latitude
      }
      if(hotelSearch.pickThree[2]){
        state.hotel3Lng = hotelSearch.pickThree[2].longitude
      }
    }
    
    getHotelLatLng1()
    getHotelLatLng2()
    getHotelLatLng3()
console.log("Hotel LNG 3 ", state.hotel3Lng)
console.log("Hotel Lat 3 ", state.hotel3Lat)
    getAirportLatLng(code);
 
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
  
 requestUber1()
 requestUber2()
 requestUber3()
 requestUber4()

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
    console.log(state.home2airport1)
    console.log(uber)
    }
  }
}
// console.log(state.hotelLat)

function requestUber2(){


  var url = "https://api.uber.com/v1/estimates/price?start_latitude=" + state.inLat + "&start_longitude=" + state.inLng + "&end_latitude=" + state.hotel1Lat + "&end_longitude=" + state.hotel1Lng + "&server_token=d8Smu8d825OY2EOEiiCSih559Zw4FEht7slwXKOt"
  var request = new XMLHttpRequest();
  request.open( "GET", url )
  request.send( null );

  request.onload = function(){
    if(request.status === 200){
      var uber = JSON.parse(request.responseText);
      state.airport2hotel1 = uber.prices[0].high_estimate
      console.log(state.airport2hotel)
      console.log(uber)
      state.uberTotal1 = (state.airport2hotel1 + state.home2airport)*2
      console.log(state.uberTotal)
    
    }
  }
}

function requestUber3(){


  var url = "https://api.uber.com/v1/estimates/price?start_latitude=" + state.inLat + "&start_longitude=" + state.inLng + "&end_latitude=" + state.hotel2Lat + "&end_longitude=" + state.hotel2Lng + "&server_token=d8Smu8d825OY2EOEiiCSih559Zw4FEht7slwXKOt"
  var request = new XMLHttpRequest();
  request.open( "GET", url )
  request.send( null );

  request.onload = function(){
    if(request.status === 200){
      var uber = JSON.parse(request.responseText);
      state.airport2hotel2 = uber.prices[0].high_estimate
      
      
      state.uberTotal2 = (state.airport2hotel2 + state.home2airport)*2
      console.log(state.uberTotal1)
      console.log(state.uberTotal2)
      console.log(state.uberTotal3)

    }
  }
}


function requestUber4(){


  var url = "https://api.uber.com/v1/estimates/price?start_latitude=" + state.inLat + "&start_longitude=" + state.inLng + "&end_latitude=" + state.hotel3Lat + "&end_longitude=" + state.hotel3Lng + "&server_token=d8Smu8d825OY2EOEiiCSih559Zw4FEht7slwXKOt"
  var request = new XMLHttpRequest();
  request.open( "GET", url )
  request.send( null );

  request.onload = function(){
    if(request.status === 200){
      var uber = JSON.parse(request.responseText);
      state.airport2hotel3 = uber.prices[0].high_estimate
     
      state.uberTotal3 = (state.airport2hotel3 + state.home2airport)*2
      
    }
    var hotelViewer1 = new HotelView( hotelSearch.pickThree[0], state.uberTotal1, 'hotel1', state.nights )

    var hotelViewer2 = new HotelView( hotelSearch.pickThree[1], state.uberTotal2, 'hotel2', state.nights )

    var hotelViewer3 = new HotelView( hotelSearch.pickThree[2], state.uberTotal3, 'hotel3', state.nights )
    
    var displayFlights = new DisplayFlights( state )
    displayFlights.display()
  }


}


