const INPUT = "[data-ref-id='feather-input']";
const DISPLAY = "#display";
import { FeatherInput } from "../../FeatherInput";
export const create = async () => {
  await browser.url(`${process.env.VUE_DEV_SERVER_URL}/Input-Demo`);
  await browser.refresh();
  await $(INPUT).waitForExist({ timeout: 60000 });
  const input = new FeatherInput(INPUT);
  return {
    async setInputValue(str: string) {
      await input.setValue(str);
      return await input.getValue();
    },
    async clearInputValue() {
      await input.clearValue();
      return await input.getValue();
    },
    async getDisplay() {
      return await $(DISPLAY).getText();
    },
  };
};
