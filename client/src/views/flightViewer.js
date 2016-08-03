var DisplayFlights = function( state ) {
  this.state = state
// option 1 = where flight is direct and the inbound cost and outbound cost are covered by one quote 
// option 2 = where flight is direct and the inbound/ outbound quotes are seperate

}

DisplayFlights.prototype = {

  display: function() {

    var flight = document.getElementById( 'flight' );
    while (flight.firstChild) {   
      flight.removeChild(flight.firstChild);
    }

    this.state.flightsearch.state.options.forEach( function( option, index) {
      console.log( this.state.people )
      var cost = document.createElement( 'p' );
      var outbound = document.createElement( 'p' );
      var inbound = document.createElement( 'p' );
      cost.innerHTML = "Cost: £" + ( option.cost  ) ;
      console.log( option.cost )
      console.log( option.outboundCarrier )
      console.log( option.inboundCarrier )

      this.state.flightsearch.state.options.forEach( function( option, index) {

        var cost = document.createElement( 'p' );
        var outbound = document.createElement( 'p' );
        var inbound = document.createElement( 'p' );
        var uber = document.createElement( 'p' );
        var total = document.createElement( 'p' );

        outbound.innerHTML = "Outbound Carrier: " + option.outboundCarrier 
        inbound.innerHTML = "Inbound Carrier: " + option.inboundCarrier 
        cost.innerHTML = "Cost of flights: £" + (option.cost * this.state.people);
        uber.innerHTML = "Cost of Uber: £" + this.state.uberTotal1;

        total.innerHTML = "Total Transport Cost: £" + (this.state.uberTotal1 + (option.cost * this.state.people))

        flight.appendChild( cost )
        flight.appendChild( outbound )
        flight.appendChild( inbound )
        flight.appendChild( uber )
        flight.appendChild( total )
      })
    })
  }
}


module.exports = DisplayFlights;

