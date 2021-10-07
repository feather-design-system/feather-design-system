const INPUT = ".e2e-class [data-ref-id='feather-input']";
const MENUITEM = ".result-item";
const CLEAR = "[data-ref-id='feather-form-element-clear'] svg";

const create = async () => {
  await browser.url(`https://google.com`);
  await $("input").waitForExist({ timeout: 60000 });
  await browser.url(`${process.env.VUE_DEV_SERVER_URL}/Autocomplete-Single`);
  await $(INPUT).waitForExist({ timeout: 60000 });
  return {
    selectItem: async (index) => {
      var runInBrowser = function (argument) {
        argument.click();
      };
      var elementToClickOn = await $(INPUT);
      await browser.execute(runInBrowser, elementToClickOn);
      await $(MENUITEM).waitForDisplayed({ timeout: 60000 });
      await $$(MENUITEM)[index].click();
    },
    getAutocompleteValue: async () => {
      return await $(INPUT).getValue();
    },
    clearAutocomplete: async () => {
      await $(CLEAR).click();
    },
  };
};

module.exports = { create };
