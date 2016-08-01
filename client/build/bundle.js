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

	var Flights = __webpack_require__( 1 )
	var Hotels = __webpack_require__( 2 )
	var DisplayFlights = __webpack_require__( 3)
	var HotelView = __webpack_require__( 4 )
	
	
	var state = {
	  cost: 200,
	  flight: "",
	  budget: 0,
	  nights: 3,
	  departDate: "",
	  returnDate: 0,
	  allFlights: {},
	  flightsearch: {}
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
	    var code = state.flightsearch.airport
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
	      var response = request.responseText
	      var flights = JSON.parse( response )
	      console.log( flights )
	      state.flight = flights
	      console.log( state.flight )
	      
	      var displayFlights = new DisplayFlights( state.flight )
	      updateBudget();
	      console.log( state.budget )
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
	    hotelSearch = new Hotels( allHotels  )
	    hotelSearch.sort( state.budget, state.nights )
	    displayHotel = new HotelView( hotelSearch.budgetHotels, state.nights )
	  }
	}
	
	
	
	


/***/ },
/* 1 */
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
/* 2 */
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

/***/ },
/* 3 */
/***/ function(module, exports) {

	// var defaultState = {
	//    options: [],
	//    option1: {
	//     cost: 0,
	//     outboundCarrier: "",
	//     inboundCarrier:""
	//   },
	//    option2: {
	//     cost: 0,
	//     outboundCarrierId: "",
	//     inboundCarrierId: ""
	//    },
	//    outboundCarrier:"",
	//    inboundCarrier: ""
	// }
	
	var State = function() {
	   this.options = [];
	   this.option1 = {
	    cost: 0,
	    outboundCarrier: "",
	    inboundCarrier:""
	  };
	   this.option2 = {
	    cost: 0,
	    outboundCarrierId: "",
	    inboundCarrierId: ""
	   };
	   this.outboundCarrier = "";
	   this.inboundCarrier = ""
	}
	
	var sortedOptions = []
	
	var DisplayFlights = function( savedFlight ) {
	// option 1 = where flight is direct and the inbound cost and outbound cost are covered by one quote 
	// option 2 = where flight is direct and the inbound/ outbound quotes are seperate
	  // if( state != defaultState) {
	  //   state = defaultState
	  //   console.log( state )
	  // }
	  var state = new State()
	
	  savedFlight.Quotes.forEach( function( flight, index ) {
	
	    if( flight.Direct === true && flight.OutboundLeg != undefined && flight.InboundLeg != undefined ) {
	      state.option1 = {
	        cost: flight.MinPrice,
	        outboundCarrierId: flight.OutboundLeg.CarrierIds[0],
	        inboundCarrierId: flight.InboundLeg.CarrierIds[0]      
	      }    
	      
	    } else if( flight.Direct === true && flight.OutboundLeg != undefined ) { 
	        state.option2.cost += flight.MinPrice
	        state.option2.outboundCarrierId = flight.OutboundLeg.CarrierIds[0]
	      } 
	      else if( flight.Direct === true && flight.InboundLeg != undefined )  {
	          state.option2.cost += flight.MinPrice
	          state.option2.inboundCarrierId = flight.InboundLeg.CarrierIds[0]
	      }else{
	        console.log( "not direct buddy")
	      }
	  })
	
	  outboundName = function( option ){
	    savedFlight.Carriers.forEach(function( carrier, index){
	      if(option.outboundCarrierId === carrier.CarrierId){
	       option.outboundCarrier = carrier.Name  }
	    })
	  }  
	
	  inboundName = function( option ){
	    savedFlight.Carriers.forEach(function( carrier, index){
	      if(option.inboundCarrierId === carrier.CarrierId){
	       option.inboundCarrier = carrier.Name  }
	    })
	
	  } 
	
	  outboundName( state.option1 )
	  inboundName( state.option1 )
	  inboundName( state.option2 )
	  outboundName( state.option2 )
	
	  if( state.option1.cost != 0 && state.option1.outboundCarrier != undefined ) {
	    console.log( state.option1)
	   state.options.push( state.option1 )
	  }
	
	  if( state.option2.cost != 0 && state.option2.outboundCarrier != undefined ) {
	   state.options.push( state.option2 )
	  }
	
	  var sortedOptions = state.options.sort( function( a, b ) {
	    var answer = ( a - b )
	    return answer
	  })
	
	  display( sortedOptions )
	
	  // sortedOptions = []
	}
	
	var display = function( options ) {
	  var flight = document.getElementById( 'flight' );
	  while (flight.firstChild) {   
	      // console.log( flight.childNodes )
	
	      flight.removeChild(flight.firstChild);
	  }
	  options.forEach( function( option, index) {
	
	    var cost = document.createElement( 'p' );
	    var outbound = document.createElement( 'p' );
	    var inbound = document.createElement( 'p' );
	    cost.innerHTML = "Cost: £" + option.cost
	    console.log( option.cost )
	    console.log( option.outboundCarrier )
	    console.log( option.inboundCarrier )
	    outbound.innerHTML = "Outbound Carrier: " + option.outboundCarrier 
	    inbound.innerHTML = "Inbound Carrier: " + option.inboundCarrier 
	    // console.log(state.outboundCarrier)
	    // console.log(state.inboundCarrier)
	    flight.appendChild( cost )
	    flight.appendChild( outbound )
	    flight.appendChild( inbound )
	  })
	   // console.log( defaultState )
	   // state.options.splice( 0, state.options.length )
	   // options.splice( 0, options.length )
	   // state = defaultState
	}
	
	module.exports = DisplayFlights;
	


/***/ },
/* 4 */
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

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map