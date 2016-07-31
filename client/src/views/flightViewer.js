var state = {
   options: [],
   option1: 0,
   option2: 0,
   outboundCarrier:"",
   inboundCarrier: ""
}

// var options = []
// var option1 = 0
// var option2 = 0
// var outboundCarrier = ""
// var inboundCarrier = ""

var DisplayFlights = function( savedFlight ) {


  savedFlight.Quotes.forEach( function( flight, index ) {
    if( flight.Direct === true && flight.OutboundLeg != undefined && flight.InboundLeg != undefined ) {
      state.option1 = {
        cost: flight.MinPrice,
        outboundCarrierId: flight.OutboundLeg.CarrierIds[0],
        inboundCarrierId: flight.InboundLeg.CarrierIds[0]
        
      }    

      console.log( state.option1 )
    } else {
      if( flight.Direct === true ) {
        state.option2 += flight.MinPrice
        console.log( state.option2 )
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
  console.log(state.outboundCarrier)
  console.log(state.inboundCarrier)
  

  if( state.option1 != 0 && state.option1 != undefined ) {
   state.options.push( state.option1 )
  }

  if( state.option2 != 0 && state.option2 != undefined ) {
   state.options.push( state.option2 )
  }


  var sortedOptions = state.options.sort( function( a, b ) {
    return a - b
  })

  console.log( sortedOptions )

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

}
module.exports = DisplayFlights;

// var DisplayFlights = function( savedFlight ) {

//   var options = []
//   var option1 = 0
//   var option2 = 0
//   var outboundCarrier = ""
//   var inboundCarrier = ""
  



//   savedFlight.Quotes.forEach( function( flight, index ) {
//     if( flight.Direct === true && flight.OutboundLeg != undefined && flight.InboundLeg != undefined ) {
//       option1 = {
//         cost: flight.MinPrice,
//         outboundCarrierId: flight.OutboundLeg.CarrierIds[0],
//         inboundCarrierId: flight.InboundLeg.CarrierIds[0]
        
//       }    

//       console.log( option1 )
//     } else {
//       if( flight.Direct === true ) {
//         option2 += flight.MinPrice
//         console.log( option2 )
//       } else {
//         console.log( "not direct buddy")
//       }
//     }
//   })


//   outboundName = function( ){
//     savedFlight.Carriers.forEach(function( carrier, index){
//       if(option1.outboundCarrierId === carrier.CarrierId){
//       outboundCarrier = carrier.Name  }
//     })
    
//   }

//   inboundName = function(){
//     savedFlight.Carriers.forEach(function( carrier, index){
//       if(option1.inboundCarrierId === carrier.CarrierId){
//       inboundCarrier = carrier.Name  }
//       })
//   }

//   outboundName()
//   inboundName()
//   console.log(outboundCarrier)
//   console.log(inboundCarrier)
  

// if( option1 != 0 && option1 != undefined ) {
//   options.push( option1 )
// }

// if( option2 != 0 && option2 != undefined ) {
//   options.push( option2 )
// }


// var sortedOptions = options.sort( function( a, b ) {
//   return a - b
// })

// console.log( sortedOptions )

//   display( savedFlight, sortedOptions )
// }

// var display = function( savedFlight, options ) {
//   outboundName()
//   inboundName()
//   var flight = document.getElementById( 'flight' );
//   flight.innerHTML = ""
//   options.forEach( function( option, index) {
//     var cost = document.createElement( 'p' );
//     var outbound = document.createElement( 'p' );
//     var inbound = document.createElement( 'p' );
//     cost.innerHTML = "Cost: £" + option.cost
//     outbound.innerHTML = "Outbound Carrier: " + outboundCarrier 
//     inbound.innerHTML = "Inbound Carrier: " + inboundCarrier 
//     flight.appendChild( cost )
//     flight.appendChild( outbound )
//     flight.appendChild( inbound )
//   })

// }
// module.exports = DisplayFlights;