const fs = require('fs');
const pretty = require('pretty');
const showdown = require('./showdown');

function convertToHtml({markdown = '', globalCssPath = ''}) {
  const converter = showdown.create();

  if (globalCssPath.length > 0 && fs.existsSync(globalCssPath)) {
    globalCssHtml = `
      <style>
        ${fs.readFileSync(globalCssPath, 'utf-8')}
      </style>
    `;
  }

  let html = pretty(`
      <html>
        <head>
          ${globalCssHtml}
        </head>

        <body>
          ${converter.makeHtml(markdown)}
        </body>
      </html>
    `,
    {ocd: true}
  );

  html = convertLinks(html);

  return html;
}

function convertLinks(html) {
  return html.replace(/.md/g, '.html');
}

module.exports = {
  convertToHtml
};
