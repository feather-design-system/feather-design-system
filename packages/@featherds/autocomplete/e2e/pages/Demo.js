const INPUT = "[data-ref-id='feather-input']";
const MENUITEM = ".result-item";
const CHIP = ".chip";
const CHIPDELETE = ".chip-delete";

const create = async () => {
  await browser.url(`${process.env.VUE_DEV_SERVER_URL}/Autocomplete-Demo`);
  await (await $(INPUT)).waitForExist({ timeout: 60000 });
  return {
    selectItem: async (index) => {
      var runInBrowser = function (argument) {
        argument.click();
      };
      var elementToClickOn = await $(INPUT);
      await browser.execute(runInBrowser, elementToClickOn);
      await (await $(MENUITEM)).waitForDisplayed({ timeout: 60000 });
      await (await $$(MENUITEM))[index].click();
    },
    getChipCount: async () => {
      return await $$(CHIP).length;
    },
    removeChip: async (index) => {
      await $$(CHIPDELETE)[index].click();
    },
  };
};

module.exports = { create };
