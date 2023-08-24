import { $, browser } from "@wdio/globals";

export class FeatherInput {
  private inputSelector: string;
  private input() {
    return $(this.inputSelector) as unknown;
  }
  constructor(_input: string) {
    this.inputSelector = _input;
  }

  async setValue(text: string) {
    const input = await this.input();
    await (input as any).waitForDisplayed();
    return (input as any).setValue(text);
  }

  async getValue() {
    const input = await this.input();
    await (input as any).waitForDisplayed();
    return (input as any).getValue();
  }

  async clearValue() {
    const input = await this.input();
    await (input as any).waitForDisplayed();
    const inputValue = await (input as any).getValue();
    (input as HTMLElement).click();
    for (let i = 0; i < inputValue.length; i++) {
      await browser.keys("\uE003"); // Safari - browser.keys
    }
    // Backspace (see https://w3c.github.io/webdriver/#keyboard-actions)
  }
}
