const DROPDOWN = "#first";
const BUTTON = "#menu-button";
const MENU = "[role='menu'";

const create = () => {
  browser.url("https://www.google.com");
  $("body").waitForExist({ timeout: 60000 });
  browser.url(`${process.env.VUE_DEV_SERVER_URL}/Dropdown-Demo`);
  $(DROPDOWN).waitForExist({ timeout: 60000 });

  return {
    openMenu() {
      $(BUTTON).click();
    },
    isOpen() {
      $(MENU).waitForDisplayed({ timeout: 60000 });
    },
  };
};

module.exports = { create };
