var state = {
   options: [],
   option1: 0,
   option2: 0,
   outboundCarrier:"",
   inboundCarrier: ""
}

var DisplayFlights = function( savedFlight ) {

  savedFlight.Quotes.forEach( function( flight, index ) {
    if( flight.Direct === true && flight.OutboundLeg != undefined && flight.InboundLeg != undefined ) {
      state.option1 = {
        cost: flight.MinPrice,
        outboundCarrierId: flight.OutboundLeg.CarrierIds[0],
        inboundCarrierId: flight.InboundLeg.CarrierIds[0]      
      }    
    } else {
      if( flight.Direct === true ) {
        state.option2 += flight.MinPrice
      } else {
        console.log( "not direct buddy")
      }
    }
  })

  outboundName = function( ){
    savedFlight.Carriers.forEach(function( carrier, index){
      if(state.option1.outboundCarrierId === carrier.CarrierId){
      state.outboundCarrier = carrier.Name  }
    })
  }

  inboundName = function(){
    savedFlight.Carriers.forEach(function( carrier, index){
      if(state.option1.inboundCarrierId === carrier.CarrierId){
      state.inboundCarrier = carrier.Name  }
      })
  }

  outboundName()
  inboundName()
  
  if( state.option1 != 0 && state.option1 != undefined ) {
   state.options.push( state.option1 )
  }

  if( state.option2 != 0 && state.option2 != undefined ) {
   state.options.push( state.option2 )
  }

  var sortedOptions = state.options.sort( function( a, b ) {
    var answer = ( a - b )
    return answer
  })

  display( savedFlight, sortedOptions )
}

var display = function( savedFlight, options ) {
  var flight = document.getElementById( 'flight' );
  flight.innerHTML = ""
  state.options.forEach( function( option, index) {

    var cost = document.createElement( 'p' );
    var outbound = document.createElement( 'p' );
    var inbound = document.createElement( 'p' );
    cost.innerHTML = "Cost: £" + option.cost
    outbound.innerHTML = "Outbound Carrier: " + state.outboundCarrier 
    inbound.innerHTML = "Inbound Carrier: " + state.inboundCarrier 
    flight.appendChild( cost )
    flight.appendChild( outbound )
    flight.appendChild( inbound )
  })
   console.log( state.options )
   state.options.splice( 0, state.options.length )
}
module.exports = DisplayFlights;
