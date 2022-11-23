const INPUT = "[data-ref-id='test']";
import { FeatherSelect } from "../../FeatherSelect";
export const create = async () => {
  await browser.url(`${process.env.VUE_DEV_SERVER_URL}/Select-Demo`);
  await (await $(INPUT)).waitForExist({ timeout: 60000 });
  const page = new FeatherSelect(INPUT);
  return page;
};
