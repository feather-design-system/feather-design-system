const INPUT = "[data-ref-id='feather-input']";
const OPTION = ".result-item";

const create = () => {
  browser.url(`${process.env.VUE_DEV_SERVER_URL}/Select-Demo`);
  $(INPUT).waitForExist({ timeout: 60000 });
  return {
    selectItem(index) {
      var runInBrowser = function (argument) {
        argument.click();
      };
      var elementToClickOn = $(INPUT);
      browser.execute(runInBrowser, elementToClickOn);
      $(OPTION).waitForDisplayed({ timeout: 60000 });
      const item = $$(OPTION)[index];
      const result = item.getText();
      item.click();
      return result.trim();
    },
    getValue() {
      return $(INPUT).getValue();
    },
  };
};

module.exports = { create };
