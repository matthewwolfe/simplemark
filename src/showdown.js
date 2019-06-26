const showdown = require('showdown');


function create() {
  let extensionStatuses = {
    extra: false,
    links: false
  };

  showdown.setFlavor('github');

  showdown.extension('extra', {
    type: 'lang',
    filter: (text, converter, options) => {
      if (extensionStatuses.classes) {
        return text;
      }

      extensionStatuses.classes = true;

      const lines = text.split('\n').filter(line => line.length !== 0);

      return lines.map(line => {
        if (isIncludeLine(line)) {
          return generateStyleHtml(line);
        }

        return generateHtml(line);
      }).join('\n');
    }
  });

  function generateStyleHtml(string) {
    const path = string.trim().replace('include', '').replace(/[']/g, '').trim();

    return `<link rel="stylesheet" type="text/css" href="${path}" />`;
  }

  function generateHtml(string) {
    const classes = string.match(/[^{\}]+(?=})/g) || [];
    const html = converter.makeHtml(string).replace(/{([^}]+)}/g, '');
    const index = html.indexOf('>');

    let classesHtml = '';

    if (classes.length > 0) {
      classesHtml = `class=\"${classes.join(' ').trim()}\"`;
    }

    return `${html.slice(0, index)} ${classesHtml}${html.slice(index, html.length)}`;
  }

  function isIncludeLine(string) {
    return string.startsWith('include');
  }

  const converter = new showdown.Converter({
    extensions: ['extra']
  });

  converter.setOption('noHeaderId', true);

  return converter;
}

const converter = {
  create
};

module.exports = converter;
