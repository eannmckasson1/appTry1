var app_id = "1766211"
var key = "341f72d3cfd5a225b887"
var secret = "795a91580d610a68b78e"
var cluster = "us2"




var express = require('express');
var bodyParser = require('body-parser');
var Pusher = require('pusher');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var pusher = new Pusher({ // connect to pusher
  appId: process.env.APP_ID, 
  key: process.env.APP_KEY, 
  secret:  process.env.APP_SECRET,
  cluster: process.env.APP_CLUSTER, 
});

app.get('/', function(req, res){ // for testing if the server is running
  res.send('all is well...');
});

// for authenticating users
app.get("/pusher/auth", function(req, res) {
  var query = req.query;
  var socketId = query.socket_id;
  var channel = query.channel_name;
  var callback = query.callback;

  var auth = JSON.stringify(pusher.authenticate(socketId, channel));
  var cb = callback.replace(/\"/g,"") + "(" + auth + ");";

  res.set({
    "Content-Type": "application/javascript"
  });

  res.send(cb);
});

app.post('/pusher/auth', function(req, res) {
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});

var port = process.env.PORT || 5000;
app.listen(port);



// otherwise: return error
/*
now secret add pusher_app_id YOUR_PUSHER_APP_ID
now secret add pusher_app_key YOUR_PUSHER_APP_KEY
now secret add pusher_app_secret YOUR_PUSHER_APP_SECRET
now secret add pusher_app_cluster YOUR_PUSHER_APP_CLUSTER
*/

