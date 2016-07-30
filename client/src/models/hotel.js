//sort hotels- array

// loop through location and date- if they match then return results

//filter by cost- if cost is greater than remaining amount of budget(budget - flight cost)--remove from array.

//display total option cost- flight cost + hotel cost

var Hotels = function( list ) {
  this.list = list;
  this.budgetHotels = [];
}

Hotels.prototype = {
  sort: function( budget ) {
    this.list.hotelList.forEach( function( hotel, index ) {
      if( hotel.lowRate <= budget ) {
        this.budgetHotels.push( hotel )
      }
    }.bind( this ))
  }
}

module.exports = Hotels;