import { StreamsPage } from './app.po';

describe('streams App', () => {
  let page: StreamsPage;

  beforeEach(() => {
    page = new StreamsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
