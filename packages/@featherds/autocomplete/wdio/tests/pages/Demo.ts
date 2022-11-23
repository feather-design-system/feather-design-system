import { FeatherAutocompleteMulti } from "../../FeatherAutocomplete";

export const create = async () => {
  await browser.url(`https://google.com`);
  await $("input").waitForExist({ timeout: 60000 });
  await browser.url(`${process.env.VUE_DEV_SERVER_URL}/Autocomplete-Demo`);
  await $("[data-ref-id=test]").waitForExist({ timeout: 60000 });
  return new FeatherAutocompleteMulti("[data-ref-id=test]");
};
