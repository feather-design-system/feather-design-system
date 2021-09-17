const INPUT = "[data-ref-id='feather-input']";
const MENUITEM = ".result-item";
const CHIP = ".chip";
const CHIPDELETE = ".chip-delete";

const create = () => {
  browser.url(`${process.env.VUE_DEV_SERVER_URL}/Autocomplete-Demo`);
  $(INPUT).waitForExist({ timeout: 60000 });
  return {
    selectItem(index) {
      var runInBrowser = function (argument) {
        argument.click();
      };
      var elementToClickOn = $(INPUT);
      browser.execute(runInBrowser, elementToClickOn);
      $(MENUITEM).waitForDisplayed({ timeout: 60000 });
      $$(MENUITEM)[index].click();
    },
    getChipCount() {
      return $$(CHIP).length;
    },
    removeChip(index) {
      $$(CHIPDELETE)[index].click();
    },
  };
};

module.exports = { create };
