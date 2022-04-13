const INPUT = "[data-ref-id='feather-select-input']";
const OPTION = ".result-item";

const create = async () => {
  await browser.url(`${process.env.VUE_DEV_SERVER_URL}/Select-Demo`);
  await (await $(INPUT)).waitForExist({ timeout: 60000 });
  return {
    async selectItem(index) {
      var runInBrowser = function (argument) {
        argument.click();
      };
      var elementToClickOn = await $(INPUT);
      await browser.execute(runInBrowser, elementToClickOn);
      await (await $(OPTION)).waitForDisplayed({ timeout: 60000 });
      const item = await (await $$(OPTION))[index];
      const result = await item.getText();
      await item.click();
      return result.trim();
    },
    async getValue() {
      return await (await $(INPUT)).getValue();
    },
  };
};

module.exports = { create };
