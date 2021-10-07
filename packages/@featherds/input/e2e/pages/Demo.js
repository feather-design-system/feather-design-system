const INPUT = "[data-ref-id='feather-input']";
const DISPLAY = "#display";

const create = async () => {
  await browser.url(`${process.env.VUE_DEV_SERVER_URL}/Input-Demo`);
  await (await $(INPUT)).waitForExist({ timeout: 60000 });

  return {
    async setInputValue(str) {
      await (await $(INPUT)).setValue(str);
      return await (await $(INPUT)).getValue();
    },
    async getDisplay() {
      return await (await $(DISPLAY)).getText();
    },
  };
};

module.exports = { create };
