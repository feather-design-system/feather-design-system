const hasError = (element) =>
  element.isExisting(".feather-input-wrapper.error") &&
  element.isVisible("[data-ref-id='feather-form-element-error']");

module.exports = {
  hasError,
};
