import { expect } from "vitest";

expect.addSnapshotSerializer({
  serialize(val, config, indentation, depth, refs, printer) {
    Array.from(val.attributes)
      .filter((attr) => attr.name.startsWith("data-v-"))
      .forEach((attr) => {
        val.removeAttribute(attr.name);
      });

    return printer(val, config, indentation, depth, refs);
  },

  test(val) {
    if (val && val.attributes) {
      return Array.from(val.attributes).some((k) =>
        k.name.startsWith("data-v-")
      );
    }
    return false;
  },
});
