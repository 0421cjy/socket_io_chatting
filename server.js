/*
Module dependencies
*/

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var socketio = require('socket.io');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride);
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app.get('port'), function(){
  console.log('Express server listening on port' + app.get('port'));
});

var io = socketio.listen(server);

//'connection' 메시지를 전달 받았을 때 : 클라이언트가 서버로 접속을 했을때
// 자바 스크립트 클러저 활용
io.sockets.on('connection', function(){
  console.log('socket access');

  // 접속한 클라이언트의 IP 주소를 따오기 위한 변수. 출력은 "ffff:127.0.0.1"의 형태가 되며
  // 불필요한 문자열을 함께 제거한다.
  var ClientAddress = socket.conn.remoteAddress;
  clientAddress = ClientAddress.replace("::ffff", "");

  // 클라이언트가 접속한 즉시 서버에서 로그를 출력 (접속 클라이언트 정보)
  console.log('[Server Log] Client Connected .. IP:'+ClientAddress);

  // 'CMessage' 메시지를 전달 받았을 때 서버의 처리 부분
  // 해당 메시지는 http에서 입력받은 메시지를 전달하도록 한다.
  socket.on('CMessage', function(data){
    console.log('[Client Message:'+ ClientAddress + ']' + data);

    // io.sockets.emit('CMessage', data);
    // 위의 명령어는 연결된 모든 소켓에 보내는 명령어
    socket.emit('CMessage', data);
  });

  // 'SendMessageByUnity' 메세지를 전달 받았을 때 서버의 처리부분
  // 해당 메시지는 테스트용 유니티 클라이언트에서 버튼을 클릭했을때 전달되도록 한다.
  socket.on('SendMessageByUnity', function(data){
    console.log('[Client Message:' + ClientAddress + '] Click!');
    console.log('Received DATA :' + data.id);
    var msg = {message : "Hello World!", name : "JINYONG"};
    socket.emit('SendMessageByNode', msg);
  });

  // 클라이언트의 접속이 끊어졌을 때 서버가 처리할 부분
  socket.on('disconnect', function(){
    console.log('[Server Log] Client Disconnected ...');
  });
});
