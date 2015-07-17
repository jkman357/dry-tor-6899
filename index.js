var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var ExpressPeerServer = require('peer').ExpressPeerServer;
var options = {debug: true};
var expresspeerserver = ExpressPeerServer(server, options);
var peers = [];
var http_port = (process.env.PORT || 3000);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res){
    res.sendFile(__dirname + 'index.html');
});

app.use('/peerjs', expresspeerserver);

expresspeerserver.on('connection', function (id) {
	var now = new Date();
	peers.push(id);
    console.log('[peer]','connecting peer id:', id);
	io.emit('message', {'message': now.toLocaleString() + ' connecting peer id : ' + id});
});
 
expresspeerserver.on('disconnect', function (id) {
	
	var now = new Date();
	
	if (peers.indexOf(id) !== -1) {
		peers.splice(peers.indexOf(id), 1);
	}
	console.log('[peer]', 'disconnecting peer id:', id);
	io.emit('message', {'message':  now.toLocaleString() + ' disconnecting peer id : ' + id});
});


server.listen(http_port,function(){
	 console.log('listening on :',http_port);
});

io.on('connection',function(socket){
	console.log('a user connected');
});
