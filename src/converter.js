const pretty = require('pretty');
const showdown = require('./showdown');

function convertToHtml(markdown) {
  const converter = showdown.create();

  return pretty(`
      <html>
        <head></head>
        <body>
          ${converter.makeHtml(markdown)}
        </body>
      </html>
    `,
    {ocd: true}
  );
}

module.exports = {
  convertToHtml
};
