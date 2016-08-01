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