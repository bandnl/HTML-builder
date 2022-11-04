const { stdout } = process;
const fs = require('fs');
const path = require('path');
const folder_path = path.join(__dirname, 'secret-folder');

fs.readdir(folder_path, 
  { withFileTypes: true },
  (error, files) => {
        
    if (error) {
      console.error(error)
    }
    for (const file of files) {

      if (file.isFile()) {
        const obj = path.parse(file.name);
        const name = obj.name;
        const extname = obj.ext;

        fs.stat(path.join(__dirname, 'secret-folder', obj.base), (err, stats) => {
          if (err) {
            throw new Error()
          } else {
            const size = stats.size / 1000;
            stdout.write (name + " - " + extname.slice(1) + " - " + size + 'kb\n');
          }
        })
      }
    }
  }
)


