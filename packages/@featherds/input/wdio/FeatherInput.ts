export class FeatherInput {
  private inputSelector: string;
  get input() {
    return $(this.inputSelector);
  }
  constructor(_input: string) {
    this.inputSelector = _input;
  }

  async setValue(text: string) {
    const input = await this.input;
    await input.waitForDisplayed();
    return input.setValue(text);
  }

  async getValue() {
    const input = await this.input;
    await input.waitForDisplayed();
    return input.getValue();
  }

  async clearValue() {
    const input = await this.input;
    await input.waitForDisplayed();

    const inputValue = await input.getValue();
    const backSpaces = new Array(inputValue.length).fill("Backspace");
    await input.setValue(backSpaces);
  }
}
