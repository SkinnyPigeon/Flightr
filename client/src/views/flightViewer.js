var DisplayFlights = function( options, people ) {
  this.options = options;
  this.people = people
}

DisplayFlights.prototype = {

  display: function() {

    var flight = document.getElementById( 'flight' );
    while (flight.firstChild) {   
      flight.removeChild(flight.firstChild);
    }
    this.options.forEach( function( option, index) {
      console.log( this.people.value )
      var cost = document.createElement( 'p' );
      var outbound = document.createElement( 'p' );
      var inbound = document.createElement( 'p' );
      cost.innerHTML = "Cost: £" + ( option.cost * this.people.value ) ;
      console.log( option.cost )
      console.log( option.outboundCarrier )
      console.log( option.inboundCarrier )
      outbound.innerHTML = "Outbound Carrier: " + option.outboundCarrier 
      inbound.innerHTML = "Inbound Carrier: " + option.inboundCarrier 
      flight.appendChild( cost )
      flight.appendChild( outbound )
      flight.appendChild( inbound )
    })
  }
}



module.exports = DisplayFlights;

