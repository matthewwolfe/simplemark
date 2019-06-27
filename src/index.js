const chokidar = require('chokidar');
const colors = require('colors/safe');
const program = require('commander');
const path = require('path');
const { generateDocs } = require('./docs-generator');
const { version: packageVersion } = require('../package.json');


program
  .version(packageVersion, '-v, --version')
  .option('-s, --source <source>', 'Source directory')
  .option('-c, --css <source>', 'Path to global CSS file')
  .option('-w --watch', 'Watch source directory for file changes')
  .parse(process.argv);


function run() {
  generateDocs({
    source: program.source,
    css: program.css
  });
}

module.exports = () => {
  try {
    run();

    if (program.watch) {
      console.log(colors.green('Starting simplemark watcher'));

      chokidar.watch(path.resolve(program.source), {
        ignored: /(^|[\/\\])\../,
        ignoreInitial: true
      }).on('all', (event, path) => {
        console.log(`${colors.magenta(event)} ${path}`);

        run();
      });

      console.log(colors.green('Waiting for changes'));
    }
  } catch (error) {
    console.error(error);
    exit && process.exit(1);
  }

}
