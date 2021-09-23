const BUTTON = "#button";
const CLOSE = "[data-ref-id='dialog-close']";
const DIALOG = "[role='dialog']";

class FeatherDialog {
  async open() {
    await browser.url("https://google.com");
    await (await $("body")).waitForDisplayed({ timeout: 60000 });
    await browser.url(`${process.env.VUE_DEV_SERVER_URL}/Dialog-Demo`);
    await (await $("body")).waitForDisplayed({ timeout: 60000 });
    await this.waitForOpenButton();
  }
  async waitForOpenButton() {
    if (!(await (await $(BUTTON)).isDisplayed())) {
      await (await $(BUTTON)).waitForDisplayed({ timeout: 60000 });
    }
  }
  async waitForDialogToShow() {
    if (!(await (await $(DIALOG)).isDisplayed())) {
      await (await $(DIALOG)).waitForDisplayed({ timeout: 60000 });
    }
  }
  async dialogDisplayed() {
    return await (await $(DIALOG)).isDisplayed();
  }

  async openModal() {
    await (await $(BUTTON)).click();
    await this.waitForDialogToShow();
  }
  async clickClose() {
    await (await $(CLOSE)).click();
  }
}
module.exports = new FeatherDialog();
