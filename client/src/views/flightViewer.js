var DisplayFlights = function( savedFlight ) {
  var flight = document.getElementById( 'flight' );
  flight.innerHTML = ""
  var p = document.createElement( 'p' );
  p.innerHTML = "Cost: £" + savedFlight.Quotes[0].MinPrice
  flight.appendChild( p )
}

module.exports = DisplayFlights;