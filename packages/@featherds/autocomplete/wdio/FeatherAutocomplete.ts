import { $, $$, browser } from "@wdio/globals";

const OPTION = ".result-item";
const INPUT = "[data-ref-id='feather-autocomplete-input']";
const CLEAR = "[data-ref-id='feather-form-element-clear']";
const CHIP = "[data-ref-id='feather-chip-label']";
const CHIPDELETE = "[data-ref-id='feather-autocomplete-chip-delete']";
class BaseAutocomplete {
  protected selector: string;

  constructor(_selector: string) {
    this.selector = _selector;
  }
  protected input() {
    return $(this.selector).$(INPUT);
  }
  protected clear() {
    return $(this.selector).$(CLEAR);
  }
  protected clickElement(el: any) {
    const runInBrowser = function (argument: any) {
      argument.click();
    };
    return browser.execute(runInBrowser, el);
  }
  async selectByText(text: string) {
    await $(".spinner-container").waitForDisplayed({ reverse: true });
    const menuVisible = await $(OPTION).isDisplayed();
    if (!menuVisible) {
      const select = await $(INPUT);
      await select.click();
      await $(OPTION).waitForDisplayed({ timeout: 60000 });
    }

    const items = await $$(OPTION);
    const textArray = await Promise.all(
      items.map((item: any) => item.getText())
    );
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
        this.selector +
        " autocomplete"
    );
  }

  async selectByIndex(index: number) {
    const menuVisible = await $(OPTION).isDisplayed();
    if (!menuVisible) {
      const select = await $(INPUT);
      await select.click();
      const option = await $(OPTION);
      await option.waitForDisplayed({ timeout: 60000 });
    }

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
        this.selector +
        " autocomplete"
    );
  }
  async clearValue() {
    const clearIcon = await this.clear();
    return this.clickElement(clearIcon);
  }
}

export class AutocompleteSingle extends BaseAutocomplete {
  async getValue() {
    const input = await this.input();
    return input.getValue();
  }
}

export class AutocompleteMulti extends BaseAutocomplete {
  private chips() {
    return $(this.selector).$$(CHIP);
  }
  private chipsDelete() {
    return $(this.selector).$$(CHIPDELETE);
  }
  async getValue() {
    const chips = await this.chips();
    return Promise.all(chips.map((c: any) => c.getText()));
  }
  async clearChip(txt: string) {
    const chipsDelete = await this.chipsDelete();
    const values = await this.getValue();
    const index = values.indexOf(txt);
    if (index > -1) {
      await this.clickElement(chipsDelete[index]);
      return;
    }
    throw new Error(
      "Unable to find chip with text " +
        txt +
        " from " +
        this.selector +
        " autocomplete"
    );
  }
}
