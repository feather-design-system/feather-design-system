const getCheckbox = async (checkbox) => {
  if ((await checkbox.getAttribute("role")) === "checkbox") {
    return checkbox;
  }
  return await checkbox.$("[role='checkbox']");
};
const isChecked = async (checkbox) => {
  checkbox = await getCheckbox(checkbox);
  return (await checkbox.getAttribute("aria-checked")) === "true"; // && checkbox.element(".checkmark").isVisible();
};
const isUnchecked = async (checkbox) => {
  checkbox = await getCheckbox(checkbox);
  return (await checkbox.getAttribute("aria-checked")) === "false"; // && !(checkbox.element(".checkmark").isVisible());
};
const isIndeterminate = async (checkbox) => {
  checkbox = await getCheckbox(checkbox);
  return (await checkbox.getAttribute("aria-checked")) === "mixed"; // &&
  //!(checkbox.element(".checkmark").isVisible()) &&
  //checkbox.element(".indeterminate").isVisible();
};
const isDisabled = async (checkbox) => {
  checkbox = await getCheckbox(checkbox);
  return (await checkbox.getAttribute("aria-disabled")) === "true";
};

const setCheckbox = async (
  checkboxElement,
  state,
  timeout = 10000,
  interval = 500
) => {
  await checkboxElement.waitForClickable({ timeout, interval });
  if (state && (await isChecked(checkboxElement))) {
    console.log("Element is already checked");
  } else {
    await checkboxElement.click();
  }
};
module.exports = {
  setCheckbox,
  isChecked,
  isUnchecked,
  isIndeterminate,
  isDisabled,
};
