const fs = require('fs');
const pretty = require('pretty');
const markdownIt = require('markdown-it')('commonmark');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItDiv = require('markdown-it-div');


markdownIt
  .use(markdownItAttrs)
  .use(markdownItDiv);

function convertToHtml({markdown = '', globalCssPath = ''}) {
  let globalCssHtml = '';

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
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${globalCssHtml}
        </head>

        <body>
          ${markdownIt.render(markdown)}
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
