const { stdin, stdout } = process;
const EventEmitter = require('events');
const emmiter = new EventEmitter();
const fs = require('fs');
const path = require('path');
const output = fs.createWriteStream(path.join(__dirname, 'destination.txt'));
const readline = require('readline');
const rl = readline.createInterface ({
    input: process.stdin,
    output: process.stdout,
})

stdin.on('data', () => {})

rl.on('line', (input) => {
  if (input !== 'exit') {
      output.write (input + '\n');
  } else emmiter.emit('exit');
});

emmiter.on ('exit', () => {

  process.exit()

})

process.on('exit', () => stdout.write ('End of session'));

