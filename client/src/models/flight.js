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