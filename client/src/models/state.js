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
   homeLat: "55.946831";
   homeLng: "-3.202032";
   outLat: "55.9508";
   outLng: "-3.3615"; 
   inLat: "";
   inLng: "";
   hotelLat: "";
   hotelLng: "";
   home2airport: "";
   airport2hotel:"";
}

// State.prototype = {
//   clear: function() {
    
//   }
// }

module.exports = State;