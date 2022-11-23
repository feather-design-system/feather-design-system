const OPTION = ".result-item";
const INPUT = "[data-ref-id='feather-autocomplete-input']";
const CLEAR = "[data-ref-id='feather-form-element-clear'] svg";
const CHIP = "[data-ref-id='feather-chip-label']";
const CHIPDELETE = "[data-ref-id='feather-autocomplete-chip-delete']";
class BaseAutocomplete {
  protected selector: string;
  get input() {
    return $(this.selector).$(INPUT);
  }

  constructor(_selector: string) {
    this.selector = _selector;
  }

  async selectByText(text: string) {
    const runInBrowser = function (argument: WebdriverIO.Element) {
      argument.click();
    };
    const select = await this.input;
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
        this.selector +
        " autocomplete"
    );
  }

  async selectByIndex(index: number) {
    const runInBrowser = function (argument: WebdriverIO.Element) {
      argument.click();
    };
    const select = await this.input;
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
        this.selector +
        " autocomplete"
    );
  }
}

export class FeatherAutocompleteSingle extends BaseAutocomplete {
  get clear() {
    return $(this.selector).$(CLEAR);
  }
  async clearValue() {
    await this.clear.click();
  }
  async getValue() {
    const input = await this.input;
    return input.getValue();
  }
}

export class FeatherAutocompleteMulti extends BaseAutocomplete {
  get chips() {
    return $(this.selector).$$(CHIP);
  }
  get chipsDelete() {
    return $(this.selector).$$(CHIPDELETE);
  }
  async getValue() {
    const chips = await this.chips;
    return Promise.all(chips.map((c) => c.getText()));
  }
  async clearChip(txt: string) {
    const chipsDelete = await this.chipsDelete;
    const values = await this.getValue();
    const index = values.indexOf(txt);
    if (index > -1) {
      await chipsDelete[index].click();
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
