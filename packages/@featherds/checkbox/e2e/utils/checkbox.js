const getCheckbox = (checkbox) => {
  if (checkbox.getAttribute("role") === "checkbox") {
    return checkbox;
  }
  return checkbox.$("[role='checkbox']");
};
const isChecked = (checkbox) => {
  checkbox = getCheckbox(checkbox);
  return checkbox.getAttribute("aria-checked") === "true"; // && checkbox.element(".checkmark").isVisible();
};
const isUnchecked = (checkbox) => {
  checkbox = getCheckbox(checkbox);
  return checkbox.getAttribute("aria-checked") === "false"; // && !(checkbox.element(".checkmark").isVisible());
};
const isIndeterminate = (checkbox) => {
  checkbox = getCheckbox(checkbox);
  return checkbox.getAttribute("aria-checked") === "mixed"; // &&
  //!(checkbox.element(".checkmark").isVisible()) &&
  //checkbox.element(".indeterminate").isVisible();
};
const isDisabled = (checkbox) =>
  getCheckbox(checkbox).getAttribute("aria-disabled") === "true";

const setCheckbox = (
  checkboxElement,
  state,
  timeout = 10000,
  interval = 500
) => {
  checkboxElement.waitForClickable({ timeout, interval });
  if (state && isChecked(checkboxElement)) {
    console.log("Element is already checked");
  } else {
    checkboxElement.click();
  }
};
module.exports = {
  setCheckbox,
  isChecked,
  isUnchecked,
  isIndeterminate,
  isDisabled,
};
