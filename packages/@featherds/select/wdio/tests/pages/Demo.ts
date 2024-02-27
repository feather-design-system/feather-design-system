import { $, browser } from "@wdio/globals";

const INPUT = "[data-ref-id='feather-select-input']";
// const OPTION = ".result-item";  TS6133
import { FeatherSelect } from "../../FeatherSelect.js";

export const create = async () => {
  await browser.url(`${process.env.VUE_DEV_SERVER_URL}/Select-Demo`);
  await (await $(INPUT)).waitForExist({ timeout: 60000 });
  const page = new FeatherSelect(INPUT);
  return page;
};
