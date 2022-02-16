module.exports = {
  print(val, printer) {
    Array.from(val.attributes)
      .filter((attr) => attr.name.startsWith("data-v-"))
      .forEach((attr) => {
        val.removeAttribute(attr.name);
      });

    return printer(val);
  },

  test(val) {
    if (val && val.attributes) {
      return Array.from(val.attributes).some((k) =>
        k.name.startsWith("data-v-")
      );
    }
    return false;
  },
};
