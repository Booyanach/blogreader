import { BlogreaderPage } from './app.po';

describe('blogreader App', function() {
  let page: BlogreaderPage;

  beforeEach(() => {
    page = new BlogreaderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
