




const net = require('net');

const server = net.createServer(function(connection) {

    console.log('有TCP客户端连接进入');

    connection.on('end', function() {
        console.log('客户端连接断开');
    });

    connection.on('data', function(data) {
        console.log(data)
    })

    //向客户端写入数据
    connection.write('hello, I am server.');

    //将客户端发来的数据原样pipe返回
    // connection.pipe(connection);
});

//TCP服务器开始端口监听
server.listen(8888, function() {
    console.log('TCP服务启动');
});

module.exports = server

// 这个server接受硬件客户端的信息推送，socket协议
// 然后呢 写入缓存
// WebSocket 读取缓存