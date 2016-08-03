var DisplayFlights = function( state ) {
  this.state = state
// option 1 = where flight is direct and the inbound cost and outbound cost are covered by one quote 
// option 2 = where flight is direct and the inbound/ outbound quotes are seperate

}

DisplayFlights.prototype = {

  display: function(string) {

    var flight = document.getElementById( string );
    while (flight.firstChild) {   
      flight.removeChild(flight.firstChild);
    }

        var cost = document.createElement( 'p' );
        var outbound = document.createElement( 'p' );
        var inbound = document.createElement( 'p' );
        var uber = document.createElement( 'p' );
        var total = document.createElement( 'p' );

        console.log(this.state)

        outbound.innerHTML = "Outbound Carrier: " + this.state.flightsearch.state.option1.outboundCarrier 
        inbound.innerHTML = "Inbound Carrier: " + this.state.flightsearch.state.option1.inboundCarrier 
        cost.innerHTML = "Cost of flights: £" + (this.state.flightcost * this.state.people);
        uber.innerHTML = "Cost of Uber: £" + this.state.uberTotal1;

        total.innerHTML = "Total Transport Cost: £" + (this.state.uberTotal1 + (this.state.flightcost * this.state.people))

        flight.appendChild( cost )
        flight.appendChild( outbound )
        flight.appendChild( inbound )
        flight.appendChild( uber )
        flight.appendChild( total )
      }
}


module.exports = DisplayFlights;

