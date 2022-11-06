const { stdout } = process;
const fs = require('fs');
const path = require('path');
const folder_path = path.join(__dirname, 'secret-folder');

fs.readdir(folder_path, 
  { withFileTypes: true },
  (error, files) => {
        
    if (error) {
      console.log (error)
    } else {
      console.log ('----------------------------');
      for (const file of files) {

        if (file.isFile()) {
          const obj = path.parse(file.name);
          const name = obj.name;
          const extname = obj.ext;

          fs.stat(path.join(folder_path, obj.base), (err, stats) => {
            if (err) {
              throw new Error()
            } else {
              const size = stats.size;
              stdout.write (name + " - " + extname.slice(1) + " - " + size + 'b\n');
              stdout.write ('----------------------------\n');
            }
          })
        }
      }
    }
  }
)


