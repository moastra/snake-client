let connection;
let moveInterval;

const setupInput = function(conn)  {
  connection = conn;
  const stdin = process.stdin;  // create variable to hold the stdin object so we don't have to type process.stdin multiple times
  stdin.setRawMode(true); // Raw Mode allows us to listen for individual keypresses instead of waiting for the user to press enter
  stdin.setEncoding("utf8"); // utf8 encoding is set so that we can read the text data that is input
  stdin.resume(); // resume stdin so the program can listen for input
  stdin.on("data", handleUserInput);
  return stdin;   // return the stdin object so we can use it elsewhere in the program
};


const handleUserInput = function(key) {
  if (key === "\u0003") {
    process.exit();
  }

  const directions = {
    'w': 'Move: up',
    'a': 'Move: left',
    's': 'Move: down',
    'd': 'Move: right'
  };

  const messages = {
    '1': 'Say: Hey!',
    '2': 'Say: Ssssneaky sssnake!',
    '3': 'Say: Top Gap',
    '4': 'Say: Mid Diff'
  };

  if (directions[key]) {
    if (moveInterval) {
      clearInterval(moveInterval);
    }
    connection.write(directions[key]);
    moveInterval = setInterval(() => {
      connection.write(directions[key]);
    }, 50); // Adjust the interval as needed
  }

  if (messages[key]) {
    connection.write(messages[key]);
  }
};


/*  if (key === 'w') {
    connection.write('Move: up');
  }
  if (key === 'a') {
    connection.write('Move: left');
  }
  if (key === 's') {
    connection.write('Move: down');
  }
  if (key === 'd') {
    connection.write('Move: right');
  }
};*/
module.exports = setupInput;