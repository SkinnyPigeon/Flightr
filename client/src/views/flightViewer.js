var DisplayFlights = function( savedFlight ) {

var options = []
var option1 = 0
var option2 = 0
var carrier1 = ""
var carrier2 = ""
var carrier3 = ""

  savedFlight.Quotes.forEach( function( flight, index ) {
    if( flight.Direct === true && flight.OutboundLeg != undefined && flight.InboundLeg != undefined ) {
      option1 = {
        cost: flight.MinPrice,
        outboundCarrierId: flight.OutboundLeg.CarrierIds[0],
        inboundCarrierId: flight.InboundLeg.CarrierIds[0]
        
      }    

      console.log( option1 )
    } else {
      if( flight.Direct === true ) {
        option2 += flight.MinPrice
        console.log( option2 )
      } else {
        console.log( "not direct buddy")
      }
    }
  })

  carrierId = function(){
    savedFlight.Carriers.forEach(function(carrier, index){
      if(option1.outboundCarrierId === carrier.CarrierId){
      carrier1 = carrier.Name  }
    })
    
  }

  carrierId()
  console.log(carrier1)

if( option1 != 0 && option1 != undefined ) {
  options.push( option1 )
}

if( option2 != 0 && option2 != undefined ) {
  options.push( option2 )
}


var sortedOptions = options.sort( function( a, b ) {
  return a - b
})

console.log( sortedOptions )

  display( savedFlight, sortedOptions )
}

var display = function( savedFlight, options ) {
  var flight = document.getElementById( 'flight' );
  flight.innerHTML = ""
  options.forEach( function( option, index) {
    var p = document.createElement( 'p' );
    p.innerHTML = "Cost: £" + option
    flight.appendChild( p )
  })

}
module.exports = DisplayFlights;