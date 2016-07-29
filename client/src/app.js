window.onload = function(){

 // var url = "http://terminal2.expedia.com/x/mhotels/search?city=EDINBURGH&checkInDate=2016-12-01&checkOutDate=2016-12-03&room1=2&apikey=a7zmRxiJIznimU5WOlHpTRjDAOFZsrga";

 var  url = "http://partners.api.skyscanner.net/apiservices/browsedates/v1.0/GB/GBP/en-GB/GLA/LON/2016-09-05/2016-09-07?apiKey=eu863416336220144245856861714199"
 var request = new XMLHttpRequest();
 request.open("GET", url);
 request.send(null);
 // var flights = document.getElementById( 'flights' )

 request.onload = function(){
  var response = request.responseText
  var flights = JSON.parse( response )
  console.log( flights )
}
}


// here we create the urls and connection to the api's