const hasError = async (element) =>
  (await element.isExisting(".feather-input-wrapper.error")) &&
  (await element.isVisible("[data-ref-id='feather-form-element-error']"));

module.exports = {
  hasError,
};
