const OPTION = "[data-ref-id='feather-select-list'] li";
export class FeatherSelect {
  private selectSelector: string;
  get select() {
    return $(this.selectSelector);
  }
  constructor(_select: string) {
    this.selectSelector = _select;
  }
  async selectIndex(index: number) {
    const runInBrowser = function (argument: WebdriverIO.Element) {
      argument.click();
    };
    const select = await this.select;
    await browser.execute(runInBrowser, select);
    await $(OPTION).waitForDisplayed({ timeout: 60000 });
    const item = await $$(OPTION)[index];
    if (item) {
      const result = await item.getText();
      await item.click();
      return result.trim();
    }
    return undefined;
  }
  async getValue() {
    return await this.select.getValue();
  }
}
