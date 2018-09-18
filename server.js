var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('还没有指定端口')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var path = request.url 
  var query = ''
  if(path.indexOf('?') >= 0){ query = path.substring(path.indexOf('?')) }
  var pathNoQuery = parsedUrl.pathname
  var queryObject = parsedUrl.query
  var method = request.method




  console.log('HTTP 路径： ' + path)
  console.log('查询字符串： ' + query)
  console.log('不含查询字符串的路径： ' + pathNoQuery)
  //response
  if(path == '/'){
    response.setHeader('Content-Type','text/html;charset=utf-8')//确定应答格式
    response.write('<!DOCTYPE>\n<html>' + 
    '<head><link rel="stylesheet" href="/style.css"><title>index_page</title>'+
    '</head><body>'+
    '<h1>hello node</h1>'+
    '<script src="/main.js"></script></body></html>')
    response.end()
  }else if(path == '/style.css'){
    response.setHeader('Content-Type','text/css;charset=utf-8')
    response.write('body{background-color: #ddd;}h1{color: blue;}')
    response.end()
  }else if(path == '/main.js'){
    response.setHeader('Content-Type','text/javascript;charset=utf-8')
    response.write('alert("这是JS执行的部分")')
    response.end()
  }else{
    response.statusCode = 404
    response.end()
  }
  
  
})

server.listen(port)
console.log('开始监听端口 ' + port + '\n')


