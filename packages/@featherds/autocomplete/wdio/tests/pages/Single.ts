import { AutocompleteSingle } from "../../FeatherAutocomplete";

export const create = async () => {
  await browser.url(`https://google.com`);
  await $("input").waitForExist({ timeout: 60000 });
  await browser.url(`${process.env.VUE_DEV_SERVER_URL}/Autocomplete-Single`);
  await browser.pause(10000);
  await $(".e2e-class").waitForExist({ timeout: 60000 });
  return new AutocompleteSingle(".e2e-class");
};
