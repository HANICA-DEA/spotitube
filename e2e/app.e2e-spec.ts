import { OoseEaiClientPage } from './app.po';

describe('oose-eai-client App', () => {
  let page: OoseEaiClientPage;

  beforeEach(() => {
    page = new OoseEaiClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
