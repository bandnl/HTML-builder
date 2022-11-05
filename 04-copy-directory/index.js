const path = require('path');
const fs = require('fs');

const files_copy = path.join(__dirname, 'files-copy');

fs.rmSync (files_copy, { recursive: true, force: true }, (err) => {
  if (err) throw err;
})

let copyDir = (function () {

  fs.mkdir(files_copy, { recursive: true }, (err) => {
    if (err) throw err;
  });

  fs.readdir (path.join(__dirname, 'files'), (err, files) => {

      if (err) {
        throw err
      } 

      files.forEach (file => {
      fs.copyFile (path.join(__dirname, 'files', file), path.join(files_copy, file), (err) => {
          if (err) throw err;
      })
      })

  })

})();
