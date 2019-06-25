const program = require('commander');
const { generateDocs } = require('./docs-generator');
const { version: packageVersion } = require('../package.json');


program
  .version(packageVersion, '-v, --version')
  .option('-s, --source <source>', 'Source directory')
  .option('-c, --css <source>', 'CSS directory')
  .parse(process.argv);

generateDocs({
  source: program.source,
  css: program.css
});
