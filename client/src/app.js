var Flights = require( './models/flight' )
var Hotels = require( './models/hotel' )
var DisplayFlights = require( './views/flightViewer')
var HotelView = require( './views/hotelViewer' )
var State = require( './models/state' )
var hotelSearch;
var code;


var capitalize = function( string ) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}



window.onload = function(){
  var signIn = document.getElementById( 'signIn' )
  var showForm = document.getElementById( 'container' )
  signIn.onclick = function(e) {
    console.log( "clicked" )
    showForm.style.display = "block"
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
      console.log( state.flightsearch.state.options )
      console.log( state.people )
      var displayFlights = new DisplayFlights( state.flightsearch.state.options, state.people )
      displayFlights.display()

      updateBudget();
      hotelClick( city, code )
      show( 'package' )
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
    var hotelViewer = new HotelView( hotelSearch.pickThree, state.nights )
    console.log( hotelSearch.pickThree )
    var getHotelLatLng = function(){

      if(hotelSearch.budgetHotels[0]){
        state.hotelLat = hotelSearch.budgetHotels[0].latitude
      }
      if(hotelSearch.budgetHotels[0]){
        state.hotelLng = hotelSearch.budgetHotels[0].longitude
      }
    }
    getHotelLatLng()
    getAirportLatLng(code);
    console.log( state.inLat )
  
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
      console.log( uber )
      console.log( state.inLat)
      console.log( state.hotelLat )
    

 console.log(state.homeLat)   
 console.log(state.homeLng)   
 console.log(state.outLat)   
 console.log(state.outLng)   
 requestUber1()
 requestUber2()
 removeUberCost()
 console.log( state.budget )
 console.log( state.uberTotal )
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
// console.log(state.hotelLat)

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

var Form = function() {

  function Submit(){
   var emailRegex = /^[A-Za-z0-9._]*\@[A-Za-z]*\.[A-Za-z]{2,5}$/;
   var fname = document.form.Name.value,
    lname = document.form.LastName.value,
    femail = document.form.Email.value,
    freemail = document.form.enterEmail.value,
    fpassword = document.form.Password.value,
    freepassword = document.form.enterPassword.value
     
   if( fname == "" )
     {
       document.form.Name.focus() ;
    document.getElementById("errorBox").innerHTML = "enter the first name";
       return false;
     }
   if( lname == "" )
     {
       document.form.LastName.focus() ;
     document.getElementById("errorBox").innerHTML = "enter the last name";
       return false;
     }
      
     if (femail == "" )
   {
    document.form.Email.focus();
    document.getElementById("errorBox").innerHTML = "enter the email";
    return false;
    }else if(!emailRegex.test(femail)){
    document.form.Email.focus();
    document.getElementById("errorBox").innerHTML = "enter the valid email";
    return false;
    }
     
     if (freemail == "" )
   {
    document.form.enterEmail.focus();
    document.getElementById("errorBox").innerHTML = "Re-enter the email";
    return false;
    }else if(!emailRegex.test(freemail)){
    document.form.enterEmail.focus();
    document.getElementById("errorBox").innerHTML = "Re-enter the valid email";
    return false;
    }
     
    if(freemail !=  femail){
     document.form.enterEmail.focus();
     document.getElementById("errorBox").innerHTML = "emails are not matching, re-enter again";
     return false;
     }
     
     
   if(fpassword == "")
    {
     document.form.Password.focus();
     document.getElementById("errorBox").innerHTML = "enter the password";
     return false;
    }

    if(freepassword == "")
     {
      document.form.Password.focus();
      document.getElementById("errorBox").innerHTML = "enter the password";
      return false;
     }
     
    if(freepassword !=  fepassword){
     document.form.enterEmail.focus();
     document.getElementById("errorBox").innerHTML = "passwords are not matching, re-enter again";
     return false;
     } 

    if(fname != '' && lname != '' && femail != '' && freemail != '' && fpassword != '' ){
     document.getElementById("errorBox").innerHTML = "form submitted successfully";
     }



       
  }
} 





