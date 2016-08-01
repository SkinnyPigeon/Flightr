var State = require('./state')

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
//    this.sorted = {};
//    cost: 200;
//    flight: "";
//    budget: 0;
//    nights: 3;
//    departDate: "";
//    returnDate: 0;
//    allFlights: {};
//    flightsearch: {};
// }

var Flights = function( list, state ) {
  this.list = list;
  this.airports = [];
  this.airport = "";
  this.state = state;
  // this.state = new State();
  // this.savedFlight = savedFlight;
}

Flights.prototype = {
  getCode: function( search ) {
    console.log( this.list.Places )
    this.list.Places.forEach( function( place, index ) {
      if( search === place.Name || search === place.CityName ) {
        this.airport = place.SkyscannerCode
      }
    }.bind( this ))
  },

  getQuote: function( savedFlight ) {
    savedFlight.Quotes.forEach( function( flight, index ) {
      if( flight.Direct === true && flight.OutboundLeg != undefined && flight.InboundLeg != undefined ) {
        this.state.option1 = {
          cost: flight.MinPrice,
          outboundCarrierId: flight.OutboundLeg.CarrierIds[0],
          inboundCarrierId: flight.InboundLeg.CarrierIds[0] 

        }    
      } else if( flight.Direct === true && flight.OutboundLeg != undefined ) { 
          this.state.option2.cost += flight.MinPrice
          this.state.option2.outboundCarrierId = flight.OutboundLeg.CarrierIds[0]
      } else if( flight.Direct === true && flight.InboundLeg != undefined )  {
            this.state.option2.cost += flight.MinPrice
            this.state.option2.inboundCarrierId = flight.InboundLeg.CarrierIds[0]
        }else{
          console.log( "not direct buddy")
        }
    }.bind( this ))
  },

  outboundName: function( option, savedFlight ) {
    savedFlight.Carriers.forEach(function( carrier, index){
      if(option.outboundCarrierId === carrier.CarrierId){
       option.outboundCarrier = carrier.Name  }
    })

  },

  inboundName: function( option, savedFlight ){
    savedFlight.Carriers.forEach(function( carrier, index){
      if(option.inboundCarrierId === carrier.CarrierId){
       option.inboundCarrier = carrier.Name  }
    })
  },

  fillOptions: function( option1, option2 ) {

    if( option1.cost != 0 && option1.outboundCarrier != undefined ) {
     this.state.options.push( option1 )
     console.log( this.state.options )
    }

    if( option2.cost != 0 && option2.outboundCarrier != undefined ) {
     this.state.options.push( option2 )
     console.log( this.state.options )

    }
  },

  clear: function() {
    this.state = new State()
  }

}


module.exports = Flights;