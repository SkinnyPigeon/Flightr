var DisplayFlights = function( state,  uberTotal, hotelObject ) {
  this.state = state;
  this.uberTotal = uberTotal;
  this.hotelObject = hotelObject
// option 1 = where flight is direct and the inbound cost and outbound cost are covered by one quote 
// option 2 = where flight is direct and the inbound/ outbound quotes are seperate

}

DisplayFlights.prototype = {

  display: function(string, string2) {

    var flight = document.getElementById( string );
    var price = document.getElementById( string2 );
    while (flight.firstChild) {   
      flight.removeChild(flight.firstChild);
    }


        var cost = document.createElement( 'p' );
        var outbound = document.createElement( 'p' );
        var inbound = document.createElement( 'p' );
        var uber = document.createElement( 'p' );
        var total = document.createElement( 'p' );
        var accomodation = document.createElement( 'p' );
        var accomodationName = document.createElement( 'p' );
        var packageTotal = document.createElement( 'p' );
        var showTotal = document.createElement( 'p' );

        console.log(this.state)

        outbound.innerHTML = "<b>Outbound Carrier: </b>" + this.state.flightsearch.state.option1.outboundCarrier 
        inbound.innerHTML = "<b>Inbound Carrier: </b>" + this.state.flightsearch.state.option1.inboundCarrier 
        cost.innerHTML = "<b>Cost of flights: </b>£" + this.state.flightcost;
        uber.innerHTML = "<b>Cost of Uber: </b>£" + this.uberTotal;
        accomodation.innerHTML = "<b>Accomodation: </b>£" + this.hotelObject.lowRate;
        accomodationName.innerHTML = "<b>Name: </b>" + this.hotelObject.localizedName;
        packageTotal.innerHTML = ""
        packageTotal.innerHTML = "<b>Total: </b>" + (this.state.flightcost + this.uberTotal + parseFloat(this.hotelObject.lowRate)).toFixed(2);

        total.innerHTML = "<b>Total Transport Cost: </b>£" + (this.uberTotal + this.state.flightcost).toFixed(2)

        flight.appendChild( cost )
        flight.appendChild( outbound )
        flight.appendChild( inbound )
        flight.appendChild( uber )
        flight.appendChild( total )
        flight.appendChild( accomodationName )
        flight.appendChild( accomodation )
        price.appendChild( packageTotal )
      }
}


module.exports = DisplayFlights;

