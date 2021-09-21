const page = require("../pages/checkbox.page");
const expect = require("chai").expect;

const simple = "/Checkbox-Checkbox";
const indeterminate = "/Checkbox-Indeterminate";

describe("Feather Checkbox", () => {
  it("should check on click if unchecked", async () => {
    await page.open(simple);
    expect(await page.isUnchecked(await page.subscribe)).to.equal(true);
    await (await page.subscribe).click();
    expect(await page.isChecked(await page.subscribe)).to.equal(true);
  });
  it("should uncheck on click if checked", async () => {
    await page.open(simple);
    await (await page.subscribe).click();
    expect(await page.isChecked(await page.subscribe)).to.equal(true);
    await (await page.subscribe).click();
    expect(await page.isUnchecked(await page.subscribe)).to.equal(true);
  });
  it("should have a disabled state", async () => {
    await page.open(simple);
    await (await page.disable).click();
    expect(await page.isChecked(await page.disable)).to.equal(true);
    expect(await page.isUnchecked(page.subscribe)).to.equal(true);
    await (await page.subscribe).click();
    expect(await page.isUnchecked(await page.subscribe)).to.equal(true);
    expect(await page.isDisabled(await page.subscribe)).to.equal(true);
  });
  it("should have an indeterminate state", async () => {
    await page.open(indeterminate);
    expect(await page.isUnchecked(await page.parent)).to.equal(true);
    await (await page.child).click();
    expect(await page.isChecked(await page.child)).to.equal(true);
    expect(await page.isChecked(await page.parent)).to.equal(false);
    expect(await page.isUnchecked(await page.parent)).to.equal(false);
    expect(await page.isIndeterminate(await page.parent)).to.equal(true);
  });
  it("should go to checked state if clicked whilst indeterminate", async () => {
    await page.open(indeterminate);
    expect(await page.isUnchecked(await page.parent)).to.equal(true);
    await (await page.child).click();
    expect(await page.isIndeterminate(await page.parent)).to.equal(true);
    await (await page.parent).click();
    expect(await page.isChecked(await page.parent)).to.equal(true);
  });
});
