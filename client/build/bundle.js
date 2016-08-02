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
	var Hotels = __webpack_require__( 3 )
	var DisplayFlights = __webpack_require__( 4)
	var HotelView = __webpack_require__( 5 )
	var State = __webpack_require__( 2 )
	var hotelSearch;
	var code;
	
	
	
	var capitalize = function( string ) {
	  return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
	
	
	window.onload = function(){
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
	    } 
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
	    // hotelSearch.order();
	    // console.log( hotelSearch.order() )
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
	
	
	
	
	


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var State = __webpack_require__(2)
	
	var Flights = function( list, state ) {
	  this.list = list;
	  this.airports = [];
	  this.airport = "";
	  this.state = state;
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
	
	  getQuote: function( savedFlight ) {
	    savedFlight.Quotes.forEach( function( flight, index ) {
	      if( flight.Direct === true && flight.OutboundLeg != undefined && flight.InboundLeg != undefined ) {
	        this.state.option1 = {
	          cost: flight.MinPrice,
	          outboundCarrierId: flight.OutboundLeg.CarrierIds[0],
	          inboundCarrierId: flight.InboundLeg.CarrierIds[0] 
	
	        }    
	      } else if( flight.Direct === true && flight.OutboundLeg != undefined ) { 
	          this.state.option2.cost += flight.MinPrice
	          this.state.option2.outboundCarrierId = flight.OutboundLeg.CarrierIds[0]
	      } else if( flight.Direct === true && flight.InboundLeg != undefined )  {
	            this.state.option2.cost += flight.MinPrice
	            this.state.option2.inboundCarrierId = flight.InboundLeg.CarrierIds[0]
	        }else{
	          console.log( "not direct buddy")
	        }
	    }.bind( this ))
	  },
	
	  outboundName: function( option, savedFlight ) {
	    savedFlight.Carriers.forEach(function( carrier, index){
	      if(option.outboundCarrierId === carrier.CarrierId){
	       option.outboundCarrier = carrier.Name  }
	    })
	
	  },
	
	  inboundName: function( option, savedFlight ){
	    savedFlight.Carriers.forEach(function( carrier, index){
	      if(option.inboundCarrierId === carrier.CarrierId){
	       option.inboundCarrier = carrier.Name  }
	    })
	  },
	
	  fillOptions: function( option1, option2 ) {
	
	    if( option1.cost != 0 && option1.outboundCarrier != undefined ) {
	     this.state.options.push( option1 )
	     console.log( this.state.options )
	    }
	
	    if( option2.cost != 0 && option2.outboundCarrier != undefined ) {
	     this.state.options.push( option2 )
	     console.log( this.state.options )
	
	    }
	  },
	
	  clear: function() {
	    this.state = new State()
	  }
	
	}
	
	
	module.exports = Flights;

/***/ },
/* 2 */
/***/ function(module, exports) {

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
	   this.inboundCarrier = "";
	   this.sorted = {};
	   this.cost = 200;
	   this.flight = "";
	   this.budget=  0;
	   this.nights = 3;
	   this.people = 2;
	   this.departDate = "";
	   this.returnDate = 0;
	   this.allFlights = {};
	   this.flightsearch = {};
	   this.homeLat = "55.946831";
	   this.homeLng = "-3.202032";
	   this.outLat = "55.9508";
	   this.outLng = "-3.3615"; 
	   this.inLat = "";
	   this.inLng = "";
	   this.hotelLat = "";
	   this.hotelLng = "";
	   this.home2airport = 0;
	   this.airport2hotel = 0;
	   this.uberTotal = 0;
	}
	
	module.exports = State;

/***/ },
/* 3 */
/***/ function(module, exports) {

	var cost;
	
	var Hotels = function( list, nights, budget ) {
	  this.nights = nights;
	  this.budget = budget;
	  this.list = list;
	  this.budgetHotels = [];
	  this.rates = [];
	  this.sortedHotels = [];
	  this.pickThree = [];
	}
	
	Hotels.prototype = {
	  sort: function() {
	    this.list.hotelList.forEach( function( hotel, index ) {
	
	      cost = parseInt(hotel.lowRate) * this.nights * 0.7 + 50;  
	
	      if( this.budget >= cost && this.nights > 1  ) {
	
	        this.budgetHotels.push( hotel )
	
	      } else if ( this.budget >= cost ) {
	        this.budgetHotels.push( hotel )
	      }
	    }.bind( this ))
	  },
	
	  fixNum: function() {
	    this.budgetHotels.forEach( function(hotel, index ) {
	      hotel.rate = parseInt( hotel.lowRate )
	      this.rates.push( hotel.rate )
	    }.bind( this ) )
	    console.log( this.rates )
	  },
	
	  sortNums: function( a, b ) {
	    return a - b
	  },
	
	  orderNums: function() {
	    this.rates.sort( this.sortNums )
	    console.log( this.rates )
	  },
	
	  select: function() {
	    this.budgetHotels.forEach( function( hotel, index ) {
	      var a = this.rates.length - 1
	      var b = this.rates.length - 2
	      var c = this.rates.length - 3
	      if( this.rates[a] === hotel.rate ) {
	        this.pickThree.push( hotel )
	      } else if( this.rates[b] === hotel.rate ) {
	        this.pickThree.push( hotel )
	      } else if( this.rates[c] === hotel.rate ) {
	        this.pickThree.push( hotel )
	      }
	    }.bind( this ))
	    console.log( this.pickThree )
	  },
	}
	
	module.exports = Hotels;

/***/ },
/* 4 */
/***/ function(module, exports) {

	var DisplayFlights = function( options, people ) {
	  this.options = options;
	  this.people = people
	}
	
	DisplayFlights.prototype = {
	
	  display: function() {
	
	    var flight = document.getElementById( 'flight' );
	    while (flight.firstChild) {   
	      flight.removeChild(flight.firstChild);
	    }
	    this.options.forEach( function( option, index) {
	      console.log( this.people.value )
	      var cost = document.createElement( 'p' );
	      var outbound = document.createElement( 'p' );
	      var inbound = document.createElement( 'p' );
	      cost.innerHTML = "Cost: £" + ( option.cost * this.people.value ) ;
	      console.log( option.cost )
	      console.log( option.outboundCarrier )
	      console.log( option.inboundCarrier )
	      outbound.innerHTML = "Outbound Carrier: " + option.outboundCarrier 
	      inbound.innerHTML = "Inbound Carrier: " + option.inboundCarrier 
	      flight.appendChild( cost )
	      flight.appendChild( outbound )
	      flight.appendChild( inbound )
	    })
	  }
	}
	
	
	
	module.exports = DisplayFlights;
	


/***/ },
/* 5 */
/***/ function(module, exports) {

	var HotelView = function( hotels, nights ) {
	  this.hotels = hotels;
	  this.nights = nights;
	
	  var hotel = document.getElementById( 'hotels' );
	  hotel.innerHTML = "" 
	  this.hotels.forEach( function(disHotel, index ) {
	    var p = document.createElement( 'p' );
	    if( nights > 1 ) {
	      p.innerHTML = "Name: " + disHotel.localizedName + " Cost: £" + (disHotel.lowRate * this.nights * 0.7 ).toFixed(2) 
	    } else {
	      p.innerHTML = "Name: " + disHotel.localizedName + " Cost: £" + (disHotel.lowRate ).toFixed(2) 
	    }
	    hotel.appendChild( p )
	  }.bind(this))
	}
	
	module.exports = HotelView;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map