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