const fs = require('fs');
const pretty = require('pretty');
const markdownIt = require('markdown-it')('commonmark', {
  replaceLink: function (link, env) {
    return link.replace(/.md/g, '.html');
  }
});
const markdownItAttrs = require('markdown-it-attrs');
const markdownItDiv = require('markdown-it-div');
const markdownItReplaceLink = require('markdown-it-replace-link');


markdownIt
  .use(markdownItAttrs)
  .use(markdownItDiv)
  .use(markdownItReplaceLink);

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

  return html;
}

module.exports = {
  convertToHtml
};
