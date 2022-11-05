const fs = require('fs');
const path = require('path');
let styles_data = []; 
let readStream;

fs.rm (path.join (__dirname, 'project-dist', 'bundle.css'), { recursive: true, force: true }, (err) => {
    if (err) throw err
});

fs.readdir (path.join (__dirname, 'styles'),
  { withFileTypes: true },
  (err, files) => {
  if (err) throw err;

  files.forEach (file => {
    if (file.isFile ()) {
      const obj = path.parse (file.name);
      if (obj.ext === '.css') {  
        readStream = fs.createReadStream (path.join (__dirname, 'styles', file.name), 'utf8');
        readStream.on ('data', (chunk) => styles_data += chunk);
      }
    }
  })
  readStream.on ('end', () => {
    fs.appendFile (path.join (__dirname, 'project-dist', 'bundle.css'), styles_data, (err) => {
      if (err) throw err;
    });

  })
})