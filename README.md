Server.js:::


Here we are processing and routing requests from the app.

Will be using "GETS" as we don't have access to "POST" from skyscanner api. 


Aside:
Click on the "go" button on the app - it takes all the input info- date, destination etc - this will then get passed to flight model. Flight model will process this info by splitting it up and turning it into the API string- will be filling up the blank search criteria. This then gets passed to the app.js which makes this information useable- app.js generates api string. Finally this is passed to the server and this will return the JSON object for our VIEWER which builds and displays our results.

(What do we want our database to do? Persist the choosen option there- final booking. )

From the  VIEWER we go back to the screen (user select)and then persist to the DB.

(User only has to consider the options and the confirmation.)


server.js references index.html 


app.get('/', function (req, res) {
 res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

html file refers to bundle.js

--- webpack.config 

config = {
  entry: "./src/app.js",
  output: {
    filename: "bundle.js",
    path: "./build"
  },
  devtool: 'source-map'
}

module.exports = config;

app.js requires in here everything it needs to run as well as the viewers.


viewer - constructor which will put info to screen



