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