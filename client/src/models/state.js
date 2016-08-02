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
   this.cost = 200;
   this.flight = "";
   this.budget=  0;
   this.nights = 3;
   this.people = 2;
   this.departDate = "";
   this.returnDate = 0;
   this.allFlights = {};
   this.flightsearch = {};
   this.homeLat = "55.946831";
   this.homeLng = "-3.202032";
   this.outLat = "55.9508";
   this.outLng = "-3.3615"; 
   this.inLat = "";
   this.inLng = "";
   this.hotelLat = "";
   this.hotelLng = "";
   this.home2airport = 0;
   this.airport2hotel = 0;
   this.uberTotal = 0;
}

module.exports = State;