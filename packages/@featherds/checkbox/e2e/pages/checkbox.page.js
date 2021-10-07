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
  async open(url) {
    await browser.url("https://www.google.com");
    const body = await $("body");
    await body.waitForExist({ timeout: 60000 });
    await browser.url(`${process.env.VUE_DEV_SERVER_URL}${url}`);
    const checkbox = await $("[role='checkbox']");
    await checkbox.waitForExist({ timeout: 60000 });
  }
  async getCheckbox(checkbox) {
    return await getCheckbox(checkbox);
  }
  async isChecked(checkbox) {
    return await isChecked(checkbox);
  }
  async isUnchecked(checkbox) {
    return await isUnchecked(checkbox);
  }
  async isIndeterminate(checkbox) {
    return await isIndeterminate(checkbox);
  }
  async isDisabled(checkbox) {
    return await isDisabled(checkbox);
  }
}

module.exports = new Checkbox();
