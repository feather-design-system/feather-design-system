const INPUT = "[data-ref-id='feather-expansion-header-button']";
const CONTENT = "[data-ref-id='feather-expansion-content']";

const create = async () => {
  await browser.url(`${process.env.VUE_DEV_SERVER_URL}/Expansion-Demo`);
  await (await $(INPUT)).waitForExist({ timeout: 60000 });
  return {
    async clickExpansion() {
      await (await $(INPUT)).click();
    },
    async expanded() {
      return await (await $(CONTENT)).waitForDisplayed({ timeout: 60000 });
    },
  };
};

module.exports = { create };
