const { convertToHtml } = require('./converter');

describe('converter', () => {

  test('converts markdown file to html', () => {
    const html = convertToHtml({
      markdown: '# Header 1 { .class-1 .class-2 }\n## Header 2 { .class-3 .class-4 }',
      globalCssPath: ''
    });

    expect(html).toMatchSnapshot();
  });
});
