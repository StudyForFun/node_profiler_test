'use strict';

var http = require('http');
var map = {};
var LimitableMap = require('limitablemap');
var map2 = new LimitableMap();

map.get = function (key) {
    return map[key];
};
map.set = function (key, value) {
    map[key] = value;
};


var a = function(){
    for(var i = 0; i<1000; i++){
        // 检查缓存
        if (!map.get(i)) {
            // 从数据库或别的地方获取了对象后，放进缓存中
            map.set(i,'hello');
        }
    }
    return 'a';
}


var b = function(){
    for(var i = 0; i<1000; i++){
        map2.set(i,'hello')
    }
    return 'b';
}

http.createServer(function (req, res) {
  res.writeHead(200);
  if (req.url === '/a') {
    res.end('value is: ' + a());
  } else {
    res.end('value is: ' + b());
  }
}).listen(1334);