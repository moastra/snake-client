const net = require("net");

// establishes a connection with the game server
const connect = function () {
  const conn = net.createConnection({
    host: 'localhost', // IP address here,
    port: 50541 // PORT number here,
  });

  // interpret incoming data as text
  conn.setEncoding("utf8");

  // connection message
  conn.on('connect', () => {
    console.log('Successfully connected to game server');
    conn.write('Name: MAT');

    //setInterval(() => {
    //   conn.write('Move: up');
    //}, 100);
  });

  // handles incoming data from the server
  conn.on('data', (data) => {
    console.log('Server says: ', data);
  });

  return conn;
};

console.log("Connecting ...");

module.exports = connect;