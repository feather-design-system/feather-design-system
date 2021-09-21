const INPUT = ".feather-pagination";
const CURRENT = "#current-page";
const BUTTONS = ".action";
const BUTTON = {
  FIRST: 0,
  PREVIOUS: 1,
  NEXT: 2,
  LAST: 3,
};

const create = async () => {
  await browser.url(`https://google.com`);
  $("input").waitForExist({ timeout: 60000 });
  await browser.url(`${process.env.VUE_DEV_SERVER_URL}/Pagination-Demo`);
  await (await $(INPUT)).waitForExist({ timeout: 60000 });

  return {
    async clickNext() {
      await (await $$(BUTTONS))[BUTTON.NEXT].click();
    },
    async clickFirst() {
      await (await $$(BUTTONS))[BUTTON.FIRST].click();
    },
    async clickLast() {
      await (await $$(BUTTONS))[BUTTON.LAST].click();
    },
    async clickPrevious() {
      await (await $$(BUTTONS))[BUTTON.PREVIOUS].click();
    },

    async getCurretPage() {
      const text = await (await $(CURRENT)).getText();
      return parseInt(text.trim(), 10);
    },
  };
};

module.exports = { create };
