import { $, $$, browser } from "@wdio/globals";

const OPTION = "[data-ref-id='feather-select-list'] li";
export class FeatherSelect {
  private selectSelector: string;
  private select() {
    return $(this.selectSelector);
  }
  constructor(_select: string) {
    this.selectSelector = _select;
  }
  clickElement(el: any) {
    const runInBrowser = function (argument: any) {
      argument.click();
    };
    return browser.execute(runInBrowser, el);
  }
  async selectByText(text: string) {
    const select = await this.select();
    await this.clickElement(select);

    await $(OPTION).waitForDisplayed({ timeout: 60000 });

    const items = await $$(OPTION);
    const textArray = await Promise.all(items.map((item: any) => item.getText()));
    const itemIndex = textArray.indexOf(text);
    if (itemIndex > -1) {
      const result = await items[itemIndex].getText();
      await this.clickElement(items[itemIndex]);
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
    const runInBrowser = function (argument: any) {
      argument.click();
    };
    const select = await this.select();
    await browser.execute(runInBrowser, select);
    await $(OPTION).waitForDisplayed({ timeout: 60000 });
    const item = await $$(OPTION)[index];
    if (item) {
      const result = await item.getText();
      await this.clickElement(item);
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
    return await this.select().getValue();
  }
}
