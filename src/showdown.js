const showdown = require('showdown');


function create() {
  let extensionStatuses = {
    extra: false
  };

  showdown.extension('extra', {
    type: 'lang',
    filter: (text, converter, options) => {
      if (extensionStatuses.classes) {
        return text;
      }

      extensionStatuses.classes = true;

      const lines = text.split('\n').filter(line => line.length !== 0);

      return lines.map(line => {
        const classes = line.match(/[^{\}]+(?=})/g) || [];
        const html = converter.makeHtml(line).replace(/{([^}]+)}/g, '');
        const index = html.indexOf('>');

        let classesHtml = '';

        if (classes.length > 0) {
          classesHtml = `class=\"${classes.join(' ').trim()}\"`;
        }

        return `${html.slice(0, index)} ${classesHtml}${html.slice(index, html.length)}`;
      }).join('\n');
    }
  });

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
