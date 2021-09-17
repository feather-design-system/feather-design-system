const INPUT = "[data-ref-id='feather-expansion-header-button']";
const CONTENT = "[data-ref-id='feather-expansion-content']";

const create = () => {
  browser.url(`${process.env.VUE_DEV_SERVER_URL}/Expansion-Demo`);
  $(INPUT).waitForExist({ timeout: 60000 });
  return {
    clickExpansion() {
      $(INPUT).click();
    },
    expanded() {
      return $(CONTENT).waitForDisplayed({ timeout: 60000 });
    },
  };
};

module.exports = { create };
