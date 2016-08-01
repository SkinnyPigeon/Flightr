var cost;

var Hotels = function( list, nights, budget ) {
  this.nights = nights;
  this.budget = budget;
  this.list = list;
  this.budgetHotels = [];
  console.log( this.budget )
}

Hotels.prototype = {
  sort: function() {
    this.list.hotelList.forEach( function( hotel, index ) {
        console.log( this.budget )

      cost = parseInt(hotel.lowRate) * this.nights * 0.7  
        console.log( cost )

      if( this.budget >= cost && this.nights > 1  ) {

        this.budgetHotels.push( hotel )

      } else if ( this.budget >= cost ) {
        this.budgetHotels.push( hotel )
      }
    }.bind( this ))
    console.log( this.budgetHotels)
  }
}

module.exports = Hotels;