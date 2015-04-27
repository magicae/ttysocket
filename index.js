// Generated by CoffeeScript 1.9.2
(function() {
  var SerialPort, hostname, net, port, readline, rl, serialport;

  readline = require('readline');

  net = require('net');

  serialport = require('serialport');

  SerialPort = serialport.SerialPort;

  port = process.env['port'] || 34123;

  hostname = process.env['hostname'] || '127.0.0.1';

  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Which tty?(eg. /dev/tty-usbserial1) ', function(tty) {

    /* SerialPort Readline Loop */
    var resolve, sp;
    sp = new SerialPort(tty, {
      parser: serialport.parsers.readline("\n")
    });

    /* Socket Server */
    net.createServer(function(socket) {
      return sp.on('data', function(line) {
        socket.write(resolve(line));
        return console.log("Response for '" + line + "' has written to socket.");
      });
    }).listen(port, hostname, function() {
      return console.log("Server listening on " + hostname + ":" + port + ".");
    });

    /* Resolve messages which needs to implement */
    return resolve = function(line) {
      return line + "\n";
    };
  });

}).call(this);
