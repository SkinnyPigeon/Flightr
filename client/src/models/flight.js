//sort flights- array

// loop through destination and date- if they match then return results

//filter by cost- if cost is greater than budget remove from array- return message "no flights etc"

//temporarily deduct cost of flights from budget

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