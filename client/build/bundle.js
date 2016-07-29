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
/***/ function(module, exports) {

	window.onload = function(){
	
	 // var url = "http://terminal2.expedia.com/x/mhotels/search?city=EDINBURGH&checkInDate=2016-12-01&checkOutDate=2016-12-03&room1=2&apikey=a7zmRxiJIznimU5WOlHpTRjDAOFZsrga";
	
	 var  url = "http://partners.api.skyscanner.net/apiservices/browsedates/v1.0/GB/GBP/en-GB/GLA/LON/2016-09-05/2016-09-07?apiKey=eu863416336220144245856861714199"
	 var request = new XMLHttpRequest();
	 request.open("GET", url);
	 request.send(null);
	 // var flights = document.getElementById( 'flights' )
	
	 request.onload = function(){
	  var response = request.responseText
	  var flights = JSON.parse( response )
	  console.log( flights )
	}
	}
	
	
	// here we create the urls and connection to the api's

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map