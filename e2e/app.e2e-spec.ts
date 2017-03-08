import { BlogreaderPage } from './app.po';

describe('blogreader App', function() {
  let page: BlogreaderPage;

  beforeEach(() => {
    page = new BlogreaderPage();
  });

  it('should display message saying "Blog Post Reader"', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Blog Post Reader');
  });
});
