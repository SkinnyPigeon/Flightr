

// var State = function() {
//    this.options = [];
//    this.option1 = {
//     cost: 0,
//     outboundCarrier: "",
//     inboundCarrier:""
//   };
//    this.option2 = {
//     cost: 0,
//     outboundCarrierId: "",
//     inboundCarrierId: ""
//    };
//    this.outboundCarrier = "";
//    this.inboundCarrier = "";
//    this.sorted = {}
// }

// var sortedOptions = []

var DisplayFlights = function( state ) {
  this.state = state
// option 1 = where flight is direct and the inbound cost and outbound cost are covered by one quote 
// option 2 = where flight is direct and the inbound/ outbound quotes are seperate
//   var state = new State();

//   savedFlight.Quotes.forEach( function( flight, index ) {

//     if( flight.Direct === true && flight.OutboundLeg != undefined && flight.InboundLeg != undefined ) {
//       state.option1 = {
//         cost: flight.MinPrice,
//         outboundCarrierId: flight.OutboundLeg.CarrierIds[0],
//         inboundCarrierId: flight.InboundLeg.CarrierIds[0]      
//       }    

//     } else if( flight.Direct === true && flight.OutboundLeg != undefined ) { 
//         state.option2.cost += flight.MinPrice
//         state.option2.outboundCarrierId = flight.OutboundLeg.CarrierIds[0]
//     } else if( flight.Direct === true && flight.InboundLeg != undefined )  {
//           state.option2.cost += flight.MinPrice
//           state.option2.inboundCarrierId = flight.InboundLeg.CarrierIds[0]
//       }else{
//         console.log( "not direct buddy")
//       }
//   })

//   outboundName = function( option ){
//     savedFlight.Carriers.forEach(function( carrier, index){
//       if(option.outboundCarrierId === carrier.CarrierId){
//        option.outboundCarrier = carrier.Name  }
//     })
//   }  

//   inboundName = function( option ){
//     savedFlight.Carriers.forEach(function( carrier, index){
//       if(option.inboundCarrierId === carrier.CarrierId){
//        option.inboundCarrier = carrier.Name  }
//     })
//   } 

//   outboundName( state.option1 )
//   inboundName( state.option1 )
//   inboundName( state.option2 )
//   outboundName( state.option2 )

//   if( state.option1.cost != 0 && state.option1.outboundCarrier != undefined ) {
//     console.log( state.option1)
//    state.options.push( state.option1 )
//   }

//   if( state.option2.cost != 0 && state.option2.outboundCarrier != undefined ) {
//    state.options.push( state.option2 )
//   }

  // var sortedOptions = state.options.sort( function( a, b ) {
  //   var answer = ( a - b )
  //   state.sorted = answer
  //   return answer
  // })

//   var returnSorted = function() {
//     console.log( state.sorted )
//   }

//   display( sortedOptions )
// }
}

DisplayFlights.prototype = {

  display: function() {

    var flight = document.getElementById( 'flight' );
    while (flight.firstChild) {   
      flight.removeChild(flight.firstChild);
    }
    this.state.flightsearch.state.options.forEach( function( option, index) {

      var cost = document.createElement( 'p' );
      var outbound = document.createElement( 'p' );
      var inbound = document.createElement( 'p' );
      var uber = document.createElement( 'p' );
      var total = document.createElement( 'p' );
      
   
      
      outbound.innerHTML = "Outbound Carrier: " + option.outboundCarrier 
      inbound.innerHTML = "Inbound Carrier: " + option.inboundCarrier 
      cost.innerHTML = "Cost of flights: £" + option.cost;
      uber.innerHTML = "Cost of Uber: £" + this.state.uberTotal1;
   
      total.innerHTML = "Total Transport Cost: £" + (this.state.uberTotal1 + option.cost)

      flight.appendChild( cost )
      flight.appendChild( outbound )
      flight.appendChild( inbound )
      flight.appendChild( uber )
      flight.appendChild( total )
    })
  }
}



module.exports = DisplayFlights;

