import RadioChip from "./RadioChip.vue";
import { mount } from "@vue/test-utils";
import * as id from "@featherds/utils/id";
import { nextTick } from "vue";
jest.spyOn(id, "getSafeId").mockImplementation((x) => x);

const mockProvide = () => {
  const register = jest.fn();
  const select = jest.fn();
  const blur = jest.fn();
  return {
    provide: {
      register,
      select,
      blur,
    },
  };
};

const getWrapper = function (
  options: Record<string, unknown> = {},
  addIcon = false
) {
  const props = options.props ? (options.props as Object) : {};
  options.props = {
    ...props,
    value: "" as unknown,
  };
  options.slots = getSlots(addIcon).slots;

  return mount(RadioChip, options);
};
const getSlots = (withIcon = false) => {
  const slots = {
    slots: {
      default: "Test",
    },
  } as {
    slots: {
      default: string;
      icon?: { template: string };
    };
  };
  if (withIcon) {
    slots.slots.icon = { template: "<span>*</span>" };
  }
  return slots;
};

describe("RadioChip", () => {
  describe("radio button", () => {
    it("should call register", () => {
      const { provide } = mockProvide();
      getWrapper({ global: { provide } });
      expect(provide.register).toHaveBeenCalled();
    });
    it("should be focusable when first is set even if not checked", async () => {
      const wrapper = getWrapper({ global: mockProvide() });
      wrapper.vm.first = true;
      await nextTick();
      expect(wrapper.vm.tabindex).toBe(0);
    });
    it("should call blur", async () => {
      const { provide } = mockProvide();
      const wrapper = getWrapper({ global: { provide } });
      wrapper.vm.blur();
      await nextTick();
      expect(provide.blur).toHaveBeenCalled();
    });

    it("should call select from provide", async () => {
      const { provide } = mockProvide();
      const value = 1;
      const wrapper = getWrapper({
        props: {
          value,
        },
        global: { provide },
      });

      wrapper.vm.click();
      await nextTick();
      expect(provide.select).toHaveBeenCalled();
    });

    it("should select element on click", async () => {
      const value = 1;
      const { provide } = mockProvide();
      const wrapper = getWrapper({
        props: {
          value,
        },
        global: { provide },
      });

      await wrapper.find("[role='radio']").trigger("click");
      expect(provide.select).toHaveBeenCalled();
    });
    it("should set aria-checked based on data", async () => {
      const wrapper = getWrapper({
        global: mockProvide(),
      });
      wrapper.vm.checked = true;
      await nextTick();
      expect(wrapper.element).toMatchSnapshot();
      wrapper.vm.checked = false;
      await nextTick();
      expect(wrapper.element).toMatchSnapshot();
    });
    it("should set aria-disabled based on property", async () => {
      const wrapper = getWrapper({
        props: {
          disabled: true,
        },
        global: mockProvide(),
      });
      expect(wrapper.element).toMatchSnapshot();
      await wrapper.setProps({
        disabled: false,
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
  it("should render a standard chip", () => {
    const wrapper = getWrapper({ global: mockProvide() });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render a standard chip with icon", () => {
    const wrapper = getWrapper({ global: mockProvide() }, true);
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render a disabled chip", () => {
    const props = {
      disabled: true,
    };
    const wrapper = getWrapper({ props, global: mockProvide() });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render condensed", () => {
    const props = {
      condensed: true,
    };
    const wrapper = getWrapper({ props, global: mockProvide() });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should render condensed from a group", () => {
    const { provide: radioProvide } = mockProvide();
    const provide = {
      condensed: true,
      global: { provide: radioProvide },
    };
    const wrapper = getWrapper(provide);
    expect(wrapper.element).toMatchSnapshot();
  });
});
