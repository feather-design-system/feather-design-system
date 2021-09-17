const BUTTON = "#button";
const CLOSE = "[data-ref-id='dialog-close']";
const DIALOG = "[role='dialog']";

class FeatherDialog {
  open() {
    browser.url("https://google.com");
    $("body").waitForDisplayed({ timeout: 60000 });
    browser.url(`${process.env.VUE_DEV_SERVER_URL}/Dialog-Demo`);
    $("body").waitForDisplayed({ timeout: 60000 });
    this.waitForOpenButton();
  }
  waitForOpenButton() {
    if (!$(BUTTON).isDisplayed()) {
      $(BUTTON).waitForDisplayed({ timeout: 60000 });
    }
  }
  waitForDialogToShow() {
    if (!$(DIALOG).isDisplayed()) {
      $(DIALOG).waitForDisplayed({ timeout: 60000 });
    }
  }
  dialogDisplayed() {
    return $(DIALOG).isDisplayed();
  }

  openModal() {
    $(BUTTON).click();
    this.waitForDialogToShow();
  }
  clickClose() {
    $(CLOSE).click();
  }
}
module.exports = new FeatherDialog();
