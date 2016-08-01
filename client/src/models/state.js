var State = function() {
   this.options = [];
   this.option1 = {
    cost: 0,
    outboundCarrier: "",
    inboundCarrier:""
  };
   this.option2 = {
    cost: 0,
    outboundCarrierId: "",
    inboundCarrierId: ""
   };
   this.outboundCarrier = "";
   this.inboundCarrier = "";
   this.sorted = {};
   cost: 200;
   flight: "";
   budget: 0;
   nights: 3;
   departDate: "";
   returnDate: 0;
   allFlights: {};
   flightsearch: {};
}

// State.prototype = {
//   clear: function() {
    
//   }
// }

module.exports = State;