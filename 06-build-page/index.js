const fs = require ('fs');
const path = require ('path');
let readStream;

let styles_data = [];
const files_copy = path.join (__dirname, 'project-dist', 'assets');
const abs_path = path.join (__dirname, 'components');

async function getHTMLContent () {

  fs.readFile (path.join (__dirname, 'template.html'), 
    { encoding: 'utf-8' },
    (err, data) => {
      if (err) throw err;

      let html_arr = data;
      fs.readdir (abs_path,
        (err, files) => {
          if (err) throw err;
          for (let file of files) {
            if (file.slice (-4) === 'html') {
              const tag = path.parse(file).name;
              let ff = (async function () {
                const content = await fs.promises.readFile (path.join (abs_path, file), { encoding: 'utf-8' });
                html_arr = html_arr.replace (`{{${tag}}}`, content);
                await fs.promises.rm (path.join (__dirname, 'project-dist', 'index.html'), { recursive: true, force: true }, (err) => {
                  if (err) throw err;
                });
                fs.writeFile (path.join (__dirname, 'project-dist', 'index.html'), html_arr, (err) => {
                  if (err) throw err
                })
              })();
            }
          }
      })
    }
  )

}  

async function buildProject () {

  await fs.promises.rm (path.join (__dirname, 'project-dist'), { recursive: true, force: true }, (err) => {
    if (err) throw err;
  });
  //create directory
  await fs.promises.mkdir (path.join (__dirname, 'project-dist'), (err) => {
    if (err) throw err;
  });
  //create html
  getHTMLContent();
  //create styles
  fs.readdir (path.join (__dirname, 'styles'), (err, files) => {
    if (err) throw err;

    for (let file of files) {
      const extname = path.parse (file).ext;
      if (extname === ".css") {
        readStream = fs.createReadStream (path.join (__dirname, 'styles', file), 'utf8');
        readStream.on ('data', (chunk) => styles_data += chunk);
      }
    }
    readStream.on ('end', () => {
        fs.appendFile (path.join (__dirname, 'project-dist', 'style.css'), styles_data, (err) => {
          if (err) throw err;
        })
    });

  })
  //create assets
  await fs.promises.rm (files_copy, { recursive: true, force: true }, (err) => {
    if (err) throw err;
  })

  await fs.promises.mkdir(files_copy, { recursive: true }, (err) => {
    if (err) throw err;
  });

  fs.readdir (path.join(__dirname, 'assets'),
    { withFileTypes: true },
    (err, files) => {

      if (err) throw err;

      for (let file of files) {
        let file_path = file.name;

        if (file.isFile()) {
          fs.copyFile (path.join(__dirname, 'assets', file.name), path.join(files_copy, file.name), (err) => {
            if (err) throw err;
          })
        }

        if (file.isDirectory()) {
          fs.mkdir (path.join (files_copy, file.name), (err) => {
            if (err) throw err
          });

          function copyDir (fpath) {
            fs.readdir (path.join (__dirname, 'assets', fpath),
              { withFileTypes: true },
              (err, files) => {
                if (err) throw err;
  
                for (let file of files) {
  
                  if (file.isFile()) {
                    fs.copyFile (path.join(__dirname, 'assets', fpath, file.name), path.join(files_copy, fpath, file.name), (err) => {
                      if (err) throw err;
                    })
                  }
                  if (file.isDirectory()) {
                    copyDir (fpath + "/" + file.name)
                  }
                }
              } 
            )
          }
          copyDir (file_path);
        }
      } 
  })

}

buildProject()

