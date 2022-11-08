const OPTION = "[data-ref-id='feather-select-list'] li";
export class FeatherSelect {
  private selectSelector: string;
  get select() {
    return $(this.selectSelector);
  }
  constructor(_select: string) {
    this.selectSelector = _select;
  }

  async selectByText(text: string) {
    const runInBrowser = function (argument: WebdriverIO.Element) {
      argument.click();
    };
    const select = await this.select;
    await browser.execute(runInBrowser, select);

    await $(OPTION).waitForDisplayed({ timeout: 60000 });

    const items = await $$(OPTION);
    const textArray = await Promise.all(items.map((item) => item.getText()));
    const itemIndex = textArray.indexOf(text);
    if (itemIndex > -1) {
      const result = await items[itemIndex].getText();
      await items[itemIndex].click();
      return result.trim();
    }

    throw new Error(
      "Unable to select item '" +
        text +
        "' from " +
        this.selectSelector +
        " list"
    );
  }

  async selectByIndex(index: number) {
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
    throw new Error(
      "Unable to select index " +
        index +
        " from " +
        this.selectSelector +
        " list"
    );
  }
  async getValue() {
    return await this.select.getValue();
  }
}
