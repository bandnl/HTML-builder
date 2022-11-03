const fs = require('fs');
const path = require('path');
const readbleStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
let data = '';

readbleStream.on('data', chunk => data += chunk);
readbleStream.on('end', () => console.log(data));
readbleStream.on('error', () => console.log(error));

