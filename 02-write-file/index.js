const { stdin, stdout } = process;
const EventEmitter = require('events');
const emitter = new EventEmitter();
const fs = require('fs');
const path = require('path');
const output = fs.createWriteStream(path.join(__dirname, 'destination.txt'));
const readline = require('readline');
const rl = readline.createInterface ({
    input: process.stdin,
    output: process.stdout,
})

console.log('Input your text');

stdin.on('data', () => {})

rl.on('line', (input) => {
  if (input !== 'exit') {
      output.write (input + '\n');
  } else emitter.emit('end');
});

emitter.on ('end', () => {

  process.exit()

})

process.on('exit', () => stdout.write ('End of session'));

