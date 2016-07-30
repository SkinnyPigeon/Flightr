var HotelView = function( hotels ) {
  console.log( hotels )
  var hotel = document.getElementById( 'hotels' );
  hotel.innerHTML = "" 
  hotels.forEach( function(disHotel, index ) {
    var p = document.createElement( 'p' );
    p.innerHTML = "Name: " + disHotel.localizedName + " Cost: £" + disHotel.lowRate
    hotel.appendChild( p )
  })
}

module.exports = HotelView;