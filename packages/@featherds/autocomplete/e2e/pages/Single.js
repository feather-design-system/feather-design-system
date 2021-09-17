const INPUT = ".e2e-class [data-ref-id='feather-input']";
const MENUITEM = ".result-item";
const CLEAR = "[data-ref-id='feather-form-element-clear'] svg";

const create = () => {
  browser.url(`https://google.com`);
  $("input").waitForExist({ timeout: 60000 });
  browser.url(`${process.env.VUE_DEV_SERVER_URL}/Autocomplete-Single`);
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
    getAutocompleteValue() {
      return $(INPUT).getValue();
    },
    clearAutocomplete() {
      $(CLEAR).click();
    },
  };
};

module.exports = { create };
