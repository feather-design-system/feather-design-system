const INPUT = "[data-ref-id='feather-input']";
const DISPLAY = "#display";

const create = () => {
  browser.url(`${process.env.VUE_DEV_SERVER_URL}/Input-Demo`);
  $(INPUT).waitForExist({ timeout: 60000 });

  return {
    setInputValue(str) {
      $(INPUT).setValue(str);
      return $(INPUT).getValue();
    },
    getDisplay() {
      return $(DISPLAY).getText();
    },
  };
};

module.exports = { create };
