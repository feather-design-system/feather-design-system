import axe from "@featherds/utils/test/axe";
import FeatherIcon from "./FeatherIcon.vue";
import { mount } from "@vue/test-utils";
import Add from "@featherds/icon/actions/Add";
import { markRaw } from "vue";

describe("Feather Icon", () => {
  it("should be accessible with 2 ", async () => {
    // essentially this is confirming there isnt any silly id attributes
    const component = {
      data() {
        return {
          add: markRaw(Add),
        };
      },
      components: {
        FeatherIcon,
      },
      template:
        "<div><FeatherIcon title='test' :icon='add'/><FeatherIcon title='test' :icon='add'/></div>",
    };
    const wrapper = mount(component);
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
