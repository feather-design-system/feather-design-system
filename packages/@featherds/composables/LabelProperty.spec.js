import { useLabelProperty } from "./LabelProperty";
import { mount } from "@vue/test-utils";
import { ref, nextTick } from "vue";

const createWrapper = (setup) => {
  return mount({
    template: `<div></div>`,
    setup,
  });
};

describe("LabelProperty composable", () => {
  it("should only return computed for the keys available in the default", async () => {
    const defaults = {
      x: "hello",
      xx: "hello",
    };
    const labels = {
      yy: "hello",
    };
    let computeds;
    const wrapper = createWrapper(() => {
      computeds = useLabelProperty(ref(labels), defaults);
    });
    await nextTick();
    expect(computeds["xLabel"].value).toBe(defaults.x);
    expect(computeds["xxLabel"].value).toBe(defaults.xx);
    expect(computeds["yyLabel"]).toBeUndefined();
  });

  it("should take the value from the label when it is specified", async () => {
    const defaults = {
      x: "hello",
      xx: "hello",
    };
    const labels = {
      xx: "hello22",
    };
    let computeds;
    const wrapper = createWrapper(() => {
      computeds = useLabelProperty(ref(labels), defaults);
    });
    await nextTick();
    expect(computeds["xLabel"].value).toBe(defaults.x);
    expect(computeds["xxLabel"].value).toBe(labels.xx);
  });
});
