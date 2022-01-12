import { nextTick } from "vue";
import { mount } from "@vue/test-utils";
import FeatherDropdown from "./FeatherDropdown.vue";
import axe from "@featherds/utils/test/axe";

import * as id from "@featherds/utils/id";

jest.spyOn(id, "getSafeId").mockImplementation((x) => x);
const getWrapper = (options = {}) => mount(FeatherDropdown, options);

const getTrigger = () => ({
  template: "<a menu-trigger>TEST</a>",
  methods: {
    focus: () => {},
  },
});
const getLi = (disabled = false) => ({
  template: `<li>
    <a>TEST</a>
  </li>`,
  data() {
    return { disabled: disabled, focused: false };
  },
  computed: {
    _dropdownItem() {
      return true;
    },
  },
  methods: {
    focus() {
      this.focused = true;
    },
  },
});

describe("FeatherDropdown.vue", () => {
  it("should pass through cover property", () => {
    const slots = {
      trigger: getTrigger(),
      default: [getLi(), getLi()],
    };
    const wrapper = getWrapper({
      slots,
      props: {
        cover: true,
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  it("should pass through right property", () => {
    const slots = {
      trigger: getTrigger(),
      default: [getLi(), getLi()],
    };
    const wrapper = getWrapper({
      slots,
      props: {
        right: true,
      },
    });
    expect(wrapper.wrapperElement).toMatchSnapshot();
  });
  describe("keydown", () => {
    describe("should call select next when", () => {
      it("down is pressed", async () => {
        const slots = {
          trigger: getTrigger(),
          default: [getLi(), getLi()],
        };
        const wrapper = getWrapper({ slots });
        jest.spyOn(wrapper.vm.dropdownService, "selectNext");
        await nextTick();
        await wrapper.setProps({
          modelValue: true,
        });
        await nextTick();
        await wrapper.find("ul").trigger(`keydown.down`);
        expect(wrapper.vm.dropdownService.selectNext).toHaveBeenCalled();
      });
      it("right is pressed", async () => {
        const slots = {
          trigger: getTrigger(),
          default: [getLi(), getLi()],
        };
        const wrapper = getWrapper({ slots });
        jest.spyOn(wrapper.vm.dropdownService, "selectNext");
        await nextTick();
        await wrapper.setProps({
          modelValue: true,
        });
        await nextTick();
        await wrapper.find("ul").trigger(`keydown.right`);
        expect(wrapper.vm.dropdownService.selectNext).toHaveBeenCalled();
      });
    });
    describe("should call select previous when", () => {
      it("left is pressed", async () => {
        const slots = {
          trigger: getTrigger(),
          default: [getLi(), getLi()],
        };
        const wrapper = getWrapper({ slots });
        jest.spyOn(wrapper.vm.dropdownService, "selectPrevious");
        await nextTick();
        await wrapper.setProps({
          modelValue: true,
        });
        await nextTick();
        await wrapper.find("ul").trigger(`keydown.left`);
        expect(wrapper.vm.dropdownService.selectPrevious).toHaveBeenCalled();
      });
      it("up is pressed", async () => {
        const slots = {
          trigger: getTrigger(),
          default: [getLi(), getLi()],
        };
        const wrapper = getWrapper({ slots });
        jest.spyOn(wrapper.vm.dropdownService, "selectPrevious");
        await nextTick();
        await wrapper.setProps({
          modelValue: true,
        });
        await nextTick();
        await wrapper.find("ul").trigger(`keydown.up`);
        expect(wrapper.vm.dropdownService.selectPrevious).toHaveBeenCalled();
      });
    });

    it("should close menu and focus trigger on ESC", async () => {
      const slots = {
        trigger: getTrigger(),
        default: [getLi(), getLi()],
      };
      const wrapper = getWrapper({ slots });
      await wrapper.find("ul").trigger("keydown.esc");
      expect(wrapper.vm.localOpen).toBe(false);
    });
  });
  it("should focus first element when opened", async () => {
    const slots = {
      trigger: getTrigger(),
      default: [getLi(), getLi()],
    };
    const wrapper = getWrapper({ slots });
    jest.spyOn(wrapper.vm.dropdownService, "select");
    await nextTick();
    await wrapper.setProps({
      modelValue: true,
    });
    await nextTick();

    expect(wrapper.vm.dropdownService.select).toHaveBeenCalledWith(
      wrapper.vm.dropdownService.items[0]
    );
  });
  it("should close when close event comes from FeatherMenu", async () => {
    const slots = {
      trigger: getTrigger(),
      default: [getLi(), getLi()],
    };
    const wrapper = getWrapper({
      slots,
    });
    await nextTick();
    await wrapper.setProps({
      modelValue: true,
    });
    await nextTick();
    await wrapper.findComponent({ ref: "menu" }).vm.$emit("close");

    expect(wrapper.vm.localOpen).toBe(false);
    expect(wrapper.emitted("update:modelValue")[1][0]).toBe(false);
  });
  it("should have the correct ids labelling the menu", () => {
    const slots = {
      trigger: getTrigger(),
      default: [getLi(), getLi()],
    };
    const wrapper = getWrapper({ slots });
    const menu = wrapper.find("ul");
    expect(menu.attributes()["aria-labelledby"]).toBe(
      wrapper.vm.$refs.menu.triggerId
    );
  });
  describe("a11y", () => {
    it("should be accessible when open", async () => {
      const slots = {
        trigger: getTrigger(),
        default: [getLi(), getLi()],
      };
      const wrapper = getWrapper({ slots });
      await nextTick();

      await wrapper.setProps({ modelValue: true });
      expect(await axe(wrapper.element)).toHaveNoViolations();
    });
  });
});
