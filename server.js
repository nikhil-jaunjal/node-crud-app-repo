const app = require('./app');
const http = require('http');

const port = process.env.PORT || 3000;  //saving 3000 to env variable & using it OR default-hardcoded port number

const server = http.createServer(app);

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/node-rest-shop";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("--------------------------------------------------------------");
  console.log("started!");
  console.log("--------------------------------------------------------------");
  db.close();
});

server.listen(port);