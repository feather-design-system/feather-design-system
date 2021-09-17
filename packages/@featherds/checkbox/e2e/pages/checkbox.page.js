const {
  getCheckbox,
  isChecked,
  isUnchecked,
  isIndeterminate,
  isDisabled,
} = require("../utils/checkbox");
class Checkbox {
  get subscribe() {
    return $("#subscribe");
  }
  get disable() {
    return $("#disable");
  }
  get parent() {
    return $("#parent");
  }
  get child() {
    return $("#child");
  }
  get secondChild() {
    return $("#secondChild");
  }
  open(url) {
    browser.url("https://www.google.com");
    $("body").waitForExist({ timeout: 60000 });
    browser.url(`${process.env.VUE_DEV_SERVER_URL}${url}`);
    $("[role='checkbox']").waitForExist({ timeout: 60000 });
  }
  getCheckbox(checkbox) {
    return getCheckbox(checkbox);
  }
  isChecked(checkbox) {
    return isChecked(checkbox);
  }
  isUnchecked(checkbox) {
    return isUnchecked(checkbox);
  }
  isIndeterminate(checkbox) {
    return isIndeterminate(checkbox);
  }
  isDisabled(checkbox) {
    return isDisabled(checkbox);
  }
}

module.exports = new Checkbox();
