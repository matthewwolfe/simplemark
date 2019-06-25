const fs = require('fs');
const path = require('path');
const pretty = require('pretty');
const rimraf = require('rimraf');
const { convertToHtml } = require('./converter');


let baseSource = 'site/';

function generateSavePath(source) {
  return `./docs/${source.replace(baseSource, '')}`;
}

function createDirectories(source) {
  getDirectories(source).forEach((directory) => {
    fs.mkdirSync(generateSavePath(directory));
    createDirectories(directory);
  });
}

function createFiles(source) {
  getFiles(source).forEach((file) => {
    if (isMarkdownFile(file)) {
      saveMarkdownAsHtml(file);
    }
    else {
      saveFile(file);
    }
  });

  getDirectories(source).forEach((directory) => {
    createFiles(directory);
  });
}

function createDocs(source) {
  createDirectories(source);
  createFiles(source);
}

function getDirectories(source) {
  return getInDirectory(source)
    .filter(isDirectory);
}

function getFiles(source) {
  return getInDirectory(source)
    .filter(isNotDirectory);
}

function getInDirectory(source) {
  return fs.readdirSync(source)
    .map(name => path.join(source, name));
}

function isDirectory(source) {
  return fs.lstatSync(source).isDirectory();
}

function isMarkdownFile(source) {
  return source.endsWith('.md');
}

function isNotDirectory(source) {
  return !isDirectory(source);
}

function generateDocs({css = '', source = './src'}) {
  rimraf.sync('./docs');
  fs.mkdirSync('docs');

  baseSource = source.replace('./', '');

  // Create all directories with sub-directories and files
  createDocs(source);
}

function saveFile(file) {
  const content = fs.readFileSync(file, 'utf-8');
  fs.writeFileSync(generateSavePath(file), content, 'utf-8');
}

function saveMarkdownAsHtml(file) {
  const markdown = fs.readFileSync(file, 'utf-8');
  fs.writeFileSync(generateSavePath(file.replace('.md', '.html')), convertToHtml(markdown), 'utf-8');
}

module.exports = {
  generateDocs
};
