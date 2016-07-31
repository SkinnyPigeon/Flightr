/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Flights = __webpack_require__( 3 )
	var Hotels = __webpack_require__( 4 )
	var DisplayFlights = __webpack_require__( 1)
	var HotelView = __webpack_require__( 2 )
	
	
	var state = {
	  cost: 200,
	  flight: "",
	  budget: 0,
	  nights: 3,
	  departDate: "",
	  returnDate: 0
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
	
	
	  var flightsearch
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
	
	    var  url = "http://partners.api.skyscanner.net/apiservices/browsedates/v1.0/GB/GBP/en-GB/EDI/" + code + "/" + state.departDate + "/" + state.returnDate + "?apiKey=eu863416336220144245856861714199"
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
	
	
	
	
	


/***/ },
/* 1 */
/***/ function(module, exports) {

	var DisplayFlights = function( savedFlight ) {
	
	var options = []
	var option1 = 0
	var option2 = 0
	
	  savedFlight.Quotes.forEach( function( flight, index ) {
	    if( flight.Direct === true && flight.OutboundLeg != undefined && flight.InboundLeg != undefined ) {
	      option1 += flight.MinPrice
	      console.log( option1 )
	    } else {
	      if( flight.Direct === true ) {
	        option2 += flight.MinPrice
	        console.log( option2 )
	      } else {
	        console.log( "not direct buddy")
	      }
	    }
	  })
	
	if( option1 != 0 && option1 != undefined ) {
	  options.push( option1 )
	}
	
	if( option2 != 0 && option2 != undefined ) {
	  options.push( option2 )
	}
	
	
	var sortedOptions = options.sort( function( a, b ) {
	  return a - b
	})
	
	console.log( sortedOptions )
	
	  display( savedFlight, sortedOptions )
	}
	
	var display = function( savedFlight, options ) {
	  var flight = document.getElementById( 'flight' );
	  flight.innerHTML = ""
	  options.forEach( function( option, index) {
	    var p = document.createElement( 'p' );
	    p.innerHTML = "Cost: £" + option
	    flight.appendChild( p )
	  })
	
	}
	module.exports = DisplayFlights;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var HotelView = function( hotels, nights ) {
	  console.log( hotels )
	  var hotel = document.getElementById( 'hotels' );
	  hotel.innerHTML = "" 
	  hotels.forEach( function(disHotel, index ) {
	    var p = document.createElement( 'p' );
	    if( nights > 1 ) {
	      p.innerHTML = "Name: " + disHotel.localizedName + " Cost: £" + (disHotel.lowRate * nights * 0.7 ).toFixed(2) 
	    } else {
	      p.innerHTML = "Name: " + disHotel.localizedName + " Cost: £" + (disHotel.lowRate * nights ).toFixed(2) 
	    }
	    hotel.appendChild( p )
	  })
	}
	
	module.exports = HotelView;

/***/ },
/* 3 */
/***/ function(module, exports) {

	var Flights = function( list ) {
	  this.list = list;
	  this.airports = [];
	  this.airport = "";
	}
	
	Flights.prototype = {
	  getCode: function( search ) {
	    console.log( this.list.Places )
	    this.list.Places.forEach( function( place, index ) {
	      if( search === place.Name || search === place.CityName ) {
	        this.airport = place.SkyscannerCode
	      }
	    }.bind( this ))
	  },
	}
	
	
	module.exports = Flights;

/***/ },
/* 4 */
/***/ function(module, exports) {

	var Hotels = function( list ) {
	  this.list = list;
	  this.budgetHotels = [];
	}
	
	Hotels.prototype = {
	  sort: function( budget, nights ) {
	    this.list.hotelList.forEach( function( hotel, index ) {
	      if( ( hotel.lowRate * nights * 0.7 ) <= budget && nights > 1) {
	        this.budgetHotels.push( hotel )
	      } else if ( hotel.lowRate <= budget ) {
	        this.budgetHotels.push( hotel )
	      }
	    }.bind( this ))
	  }
	}
	
	module.exports = Hotels;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map