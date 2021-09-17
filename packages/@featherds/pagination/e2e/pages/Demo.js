const INPUT = ".feather-pagination";
const CURRENT = "#current-page";
const BUTTONS = ".action";
const BUTTON = {
  FIRST: 0,
  PREVIOUS: 1,
  NEXT: 2,
  LAST: 3,
};

const create = () => {
  browser.url(`https://google.com`);
  $("input").waitForExist({ timeout: 60000 });
  browser.url(`${process.env.VUE_DEV_SERVER_URL}/Pagination-Demo`);
  $(INPUT).waitForExist({ timeout: 60000 });

  return {
    clickNext() {
      $$(BUTTONS)[BUTTON.NEXT].click();
    },
    clickFirst() {
      $$(BUTTONS)[BUTTON.FIRST].click();
    },
    clickLast() {
      $$(BUTTONS)[BUTTON.LAST].click();
    },
    clickPrevious() {
      $$(BUTTONS)[BUTTON.PREVIOUS].click();
    },

    getCurretPage() {
      const text = $(CURRENT).getText().trim();
      return parseInt(text, 10);
    },
  };
};

module.exports = { create };
