var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var ExpressPeerServer = require('peer').ExpressPeerServer;
var options = {debug: true};
var expresspeerserver = ExpressPeerServer(server, options);
var peers = [];
var http_port = (process.env.PORT || 5000);

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res){
    res.sendFile(__dirname + 'index.html');
});

app.use('/peerjs', expresspeerserver);

expresspeerserver.on('connection', function (id) {
    console.log('[peer]','connecting peer id:', id);
});
 
expresspeerserver.on('disconnect', function (id) {
	
	if (peers.indexOf(id) !== -1) {
		peers.splice(peers.indexOf(id), 1);
	}
	console.log('[peer]', 'disconnecting peer id:', id);
});


server.listen(http_port);


// OR

//var server = require('http').createServer(app);

//app.use('/peerjs', ExpressPeerServer(server, options));

//server.listen(9000);


//app.set('express_port', (process.env.PORT || 5000));

//app.listen(app.get('express_port'), function() {
//  console.log('Node app is running on port', app.get('express_port'));
//});

//app.get('/', function(req, res){
//    res.sendFile(__dirname + 'index.html');
//});


//var http = require('http').Server(app);
//var httpsocket = require('socket.io')(http);

//var PeerServer = require('peer').PeerServer;
//var	PEER_PORT = (process.env.PORT ||9000);
//var options = {
//	port: PEER_PORT,
//	path: '/',
//	key: 'peerjs'
//};
//var peerjs_server = new PeerServer(options);

//var peers = [];


//httpsocket.on('connection', function(socket){
//   console.log('a user connected');
//});
/*
http.listen(EXPRESS_PORT, function(){
    console.log("Node server listening on port " + EXPRESS_PORT);
});
*/


//ExpressPeerServer.on('connection', function (id) {
	//var now = new Date();
	//peers.push(id);
	//console.log('[peer]','connecting peer id:', id);
	//httpsocket.emit('message', {'message': now.toLocaleString() + ' connecting peer id : ' + id});
//});

//server.on('disconnect', function (id) {
	//var now = new Date();
	
	//if (peers.indexOf(id) !== -1) {
	//	peers.splice(peers.indexOf(id), 1);
	//}
	
	//console.log('[peer]', 'disconnecting peer id:', id);
	//httpsocket.emit('message', {'message':  now.toLocaleString() + ' disconnecting peer id : ' + id});
//});
