import { nextTick } from "vue";
import { mount } from "@vue/test-utils";
import axe from "@featherds/utils/test/axe";
import FeatherMenu from "./FeatherMenu.vue";
import * as id from "@featherds/utils/id";
jest.spyOn(id, "getSafeId").mockImplementation((x) => x);
const getWrapper = async (options: Record<string, unknown> = {}) => {
  const wrapper = mount(FeatherMenu, options);
  await nextTick();
  await nextTick();
  return wrapper;
};

const getTrigger = () =>
  `<template #trigger="triggerProps"><button v-bind="triggerProps.attrs" v-on="triggerProps.on">TEST</button></template>`;
const getContent = () => ({
  template: "<p>Ich bin ein Content</p>",
});

describe("FeatherMenu.vue", () => {
  it("should set trigger attributes initially", async () => {
    const slots = {
      trigger: getTrigger(),
      default: [getContent()],
    };
    const wrapper = await getWrapper({ slots });

    const trigger = wrapper.find(`#${wrapper.vm.triggerId}`).element;
    expect(trigger.getAttribute("aria-haspopup")).toBe("true");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });

  it("should set trigger attributes and use triggerId property when specified", async () => {
    const id = "preset";
    const slots = {
      trigger: getTrigger(),
      default: [getContent()],
    };
    const wrapper = await getWrapper({
      slots,
      props: {
        triggerId: id,
      },
    });
    const trigger = wrapper.find(`#${id}`).element;
    expect(trigger.getAttribute("aria-haspopup")).toBe("true");
    expect(trigger.getAttribute("id")).toBe(id);
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });
  it("should set trigger attributes after open", async () => {
    const slots = {
      trigger: getTrigger(),
      default: [getContent()],
    };
    const wrapper = await getWrapper({ slots });
    await wrapper.setProps({ open: true });
    await nextTick();
    const trigger = wrapper.find(`#${wrapper.vm.triggerId}`).element;
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(trigger.getAttribute("aria-controls")).toBe(wrapper.vm.menuId);
  });
  it("should not set expanded when no-expand property is set.", async () => {
    const slots = {
      trigger: getTrigger(),
      default: [getContent()],
    };
    const wrapper = await getWrapper({
      slots,
      props: {
        open: false,
        noExpand: true,
      },
    });
    const trigger = wrapper.find(`#${wrapper.vm.triggerId}`).element;
    expect(trigger.getAttribute("aria-expanded")).toBe(null);
    wrapper.setProps({ open: true });
    expect(trigger.getAttribute("aria-expanded")).toBe(null);
  });
  it("should emit trigger-click when trigger is clicked", async () => {
    const slots = {
      trigger: getTrigger(),
      default: [getContent()],
    };
    const wrapper = await getWrapper({ slots });
    await wrapper.find(`#${wrapper.vm.triggerId}`).trigger("click");
    await nextTick();
    expect(wrapper.emitted()["trigger-click"].length).toBe(1);
  });

  it("should remove necessary event listeners on unmount", async () => {
    const slots = {
      trigger: getTrigger(),
      default: [getContent()],
    };
    const wrapper = await getWrapper({ slots });
    const documentRemove = jest.spyOn(document, "removeEventListener");
    wrapper.unmount();
    expect(documentRemove).toHaveBeenCalled();
  });

  describe("fill", () => {
    it("should make the menu match the trigger width if it is smaller", async () => {
      const slots = {
        trigger: getTrigger(),
        default: [getContent()],
      };
      const wrapper = await getWrapper({
        slots,
        props: { open: true, fill: true },
      });
      jest
        .spyOn(wrapper.vm.$refs.menu as HTMLElement, "getBoundingClientRect")
        .mockImplementation(() => {
          return {
            height: 100,
            width: 20,
          } as DOMRect;
        });
      jest
        .spyOn(wrapper.vm.$refs.root as HTMLElement, "getBoundingClientRect")
        .mockImplementation(() => {
          return {
            top: 50,
            bottom: 60,
            left: 50,
            right: 100,
            width: 50,
          } as DOMRect;
        });
      wrapper.vm.calculatePosition();
      await nextTick();

      expect(wrapper.vm.menuWidth).toBe("50px");
    });
    it("should leave menu with alone when it is wider than the container", async () => {
      const slots = {
        trigger: getTrigger(),
        default: [getContent()],
      };
      const wrapper = await getWrapper({
        slots,
        props: { open: true, fill: true },
      });
      jest
        .spyOn(wrapper.vm.$refs.menu as HTMLElement, "getBoundingClientRect")
        .mockImplementation(() => {
          return {
            height: 100,
            width: 200,
          } as DOMRect;
        });
      jest
        .spyOn(wrapper.vm.$refs.root as HTMLElement, "getBoundingClientRect")
        .mockImplementation(() => {
          return {
            top: 50,
            bottom: 60,
            left: 50,
            right: 100,
            width: 50,
          } as DOMRect;
        });
      wrapper.vm.calculatePosition();
      await nextTick();

      expect(wrapper.vm.menuWidth).toBe("200px");
    });
  });

  describe("calculatePosition", () => {
    describe("right", () => {
      it("should stay bottom right if space allows", async () => {
        const slots = {
          trigger: getTrigger(),
          default: [getContent()],
        };
        const wrapper = await getWrapper({
          slots,
          props: { right: true, open: true },
        });
        jest
          .spyOn(wrapper.vm.$refs.menu as HTMLElement, "getBoundingClientRect")
          .mockImplementation(() => {
            return {
              height: 100,
              width: 100,
            } as DOMRect;
          });
        jest
          .spyOn(wrapper.vm.$refs.root as HTMLElement, "getBoundingClientRect")
          .mockImplementation(() => {
            return {
              top: 50,
              bottom: 60,
              left: 50,
              right: 120,
            } as DOMRect;
          });
        wrapper.vm.calculatePosition();
        await nextTick();
        expect(wrapper.vm.positionLeft).toBe("20px");
        expect(wrapper.vm.positionTop).toBe("60px");
      });
      it("should flip to top right if not bottom space and enough top space", async () => {
        const slots = {
          trigger: getTrigger(),
          default: [getContent()],
        };
        const wrapper = await getWrapper({
          slots,
          props: { right: true, open: true },
        });
        const height = 100;
        const width = 100;
        const windowHeight = window.innerHeight;
        jest
          .spyOn(wrapper.vm.$refs.menu as HTMLElement, "getBoundingClientRect")
          .mockImplementation(() => {
            return {
              height,
              width,
            } as DOMRect;
          });
        jest
          .spyOn(wrapper.vm.$refs.root as HTMLElement, "getBoundingClientRect")
          .mockImplementation(() => {
            return {
              top: windowHeight - height,
              bottom: windowHeight - height + 10,
              left: 50,
              right: 120,
            } as DOMRect;
          });
        wrapper.vm.calculatePosition();
        await nextTick();
        expect(wrapper.vm.positionLeft).toBe("20px");
        expect(wrapper.vm.positionTop).toBe("568px");
      });
      it("should flip to bottom left if not right space and enough left space", async () => {
        const slots = {
          trigger: getTrigger(),
          default: [getContent()],
        };
        const wrapper = await getWrapper({
          slots,
          props: { right: true, open: true },
        });
        const height = 100;
        const width = 100;
        jest
          .spyOn(wrapper.vm.$refs.menu as HTMLElement, "getBoundingClientRect")
          .mockImplementation(() => {
            return {
              height,
              width,
            } as DOMRect;
          });
        jest
          .spyOn(wrapper.vm.$refs.root as HTMLElement, "getBoundingClientRect")
          .mockImplementation(() => {
            return {
              top: 50,
              bottom: 60,
              left: 10,
              right: 30,
            } as DOMRect;
          });
        wrapper.vm.calculatePosition();
        await nextTick();
        expect(wrapper.vm.positionLeft).toBe("10px");
        expect(wrapper.vm.positionTop).toBe("60px");
      });
      it("should stay bottom right if not enough room anywhere", async () => {
        const slots = {
          trigger: getTrigger(),
          default: [getContent()],
        };
        const wrapper = await getWrapper({
          slots,
          props: { right: true, open: true },
        });
        const height = 100;
        const width = 100;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        jest
          .spyOn(wrapper.vm.$refs.menu as HTMLElement, "getBoundingClientRect")
          .mockImplementation(() => {
            return {
              height,
              width,
            } as DOMRect;
          });
        jest
          .spyOn(wrapper.vm.$refs.root as HTMLElement, "getBoundingClientRect")
          .mockImplementation(() => {
            return {
              top: 50,
              bottom: windowHeight - 50,
              left: 50,
              right: windowWidth - 50,
            } as DOMRect;
          });
        wrapper.vm.calculatePosition();
        await nextTick();
        expect(wrapper.vm.positionLeft).toBe("874px");
        expect(wrapper.vm.positionTop).toBe("718px");
      });
      it("should flip to top left if there is no space right and bottom but enough top and left", async () => {
        const slots = {
          trigger: getTrigger(),
          default: [getContent()],
        };
        const wrapper = await getWrapper({ slots, props: { open: true } });
        const height = 100;
        const width = 100;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        jest
          .spyOn(wrapper.vm.$refs.menu as HTMLElement, "getBoundingClientRect")
          .mockImplementation(() => {
            return {
              height,
              width,
            } as DOMRect;
          });
        jest
          .spyOn(wrapper.vm.$refs.root as HTMLElement, "getBoundingClientRect")
          .mockImplementation(() => {
            return {
              top: windowHeight - height,
              bottom: windowHeight - height + 10,
              left: 10,
              right: 30,
            } as DOMRect;
          });
        wrapper.vm.calculatePosition();
        await nextTick();
        expect(wrapper.vm.positionLeft).toBe("10px");
        expect(wrapper.vm.positionTop).toBe("568px");
      });
    });
    describe("left", () => {
      it("should stay bottom left if space allows", async () => {
        const slots = {
          trigger: getTrigger(),
          default: [getContent()],
        };
        const wrapper = await getWrapper({ slots, props: { open: true } });
        jest
          .spyOn(wrapper.vm.$refs.menu as HTMLElement, "getBoundingClientRect")
          .mockImplementation(() => {
            return {
              height: 100,
              width: 100,
            } as DOMRect;
          });
        jest
          .spyOn(wrapper.vm.$refs.root as HTMLElement, "getBoundingClientRect")
          .mockImplementation(() => {
            return {
              top: 50,
              bottom: 60,
              left: 50,
              right: 80,
            } as DOMRect;
          });
        wrapper.vm.calculatePosition();
        await nextTick();

        expect(wrapper.vm.positionLeft).toBe("50px");
        expect(wrapper.vm.positionTop).toBe("60px");
      });
      it("should flip to top left if not bottom space and enough top space", async () => {
        const slots = {
          trigger: getTrigger(),
          default: [getContent()],
        };
        const wrapper = await getWrapper({ slots, props: { open: true } });
        const height = 100;
        const width = 100;
        const windowHeight = window.innerHeight;
        jest
          .spyOn(wrapper.vm.$refs.menu as HTMLElement, "getBoundingClientRect")
          .mockImplementation(() => {
            return {
              height,
              width,
            } as DOMRect;
          });
        jest
          .spyOn(wrapper.vm.$refs.root as HTMLElement, "getBoundingClientRect")
          .mockImplementation(() => {
            return {
              top: windowHeight - height,
              bottom: windowHeight - height + 10,
              left: 50,
              right: 80,
            } as DOMRect;
          });
        wrapper.vm.calculatePosition();
        await nextTick();
        expect(wrapper.vm.positionLeft).toBe("50px");
        expect(wrapper.vm.positionTop).toBe("568px");
      });
      it("should flip to bottom right if not right space and enough right space", async () => {
        const slots = {
          trigger: getTrigger(),
          default: [getContent()],
        };
        const wrapper = await getWrapper({ slots, props: { open: true } });
        const height = 100;
        const width = 100;
        const windowWidth = window.innerWidth;
        jest
          .spyOn(wrapper.vm.$refs.menu as HTMLElement, "getBoundingClientRect")
          .mockImplementation(() => {
            return {
              height,
              width,
            } as DOMRect;
          });
        jest
          .spyOn(wrapper.vm.$refs.root as HTMLElement, "getBoundingClientRect")
          .mockImplementation(() => {
            return {
              top: 50,
              bottom: 60,
              left: windowWidth - 30,
              right: windowWidth,
            } as DOMRect;
          });
        wrapper.vm.calculatePosition();
        await nextTick();
        expect(wrapper.vm.positionLeft).toBe("924px");
        expect(wrapper.vm.positionTop).toBe("60px");
      });
      it("should stay bottom left if not enough room anywhere", async () => {
        const slots = {
          trigger: getTrigger(),
          default: [getContent()],
        };
        const wrapper = await getWrapper({ slots, props: { open: true } });
        const height = 100;
        const width = 100;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        jest
          .spyOn(wrapper.vm.$refs.menu as HTMLElement, "getBoundingClientRect")
          .mockImplementation(() => {
            return {
              height,
              width,
            } as DOMRect;
          });
        jest
          .spyOn(wrapper.vm.$refs.root as HTMLElement, "getBoundingClientRect")
          .mockImplementation(() => {
            return {
              top: 50,
              bottom: windowHeight - 50,
              left: 50,
              right: windowWidth - 50,
            } as DOMRect;
          });
        wrapper.vm.calculatePosition();
        await nextTick();
        expect(wrapper.vm.positionLeft).toBe("50px");
        expect(wrapper.vm.positionTop).toBe("718px");
      });
      it("should flip to top right if there is no space right and bottom but enough top and left", async () => {
        const slots = {
          trigger: getTrigger(),
          default: [getContent()],
        };
        const wrapper = await getWrapper({ slots, props: { open: true } });
        const height = 100;
        const width = 100;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        jest
          .spyOn(wrapper.vm.$refs.menu as HTMLElement, "getBoundingClientRect")
          .mockImplementation(() => {
            return {
              height,
              width,
            } as DOMRect;
          });
        jest
          .spyOn(wrapper.vm.$refs.root as HTMLElement, "getBoundingClientRect")
          .mockImplementation(() => {
            return {
              top: windowHeight - height,
              bottom: windowHeight - height + 10,
              left: windowWidth - 30,
              right: windowWidth,
            } as DOMRect;
          });
        wrapper.vm.calculatePosition();
        await nextTick();
        expect(wrapper.vm.positionLeft).toBe("924px");
        expect(wrapper.vm.positionTop).toBe("568px");
      });
    });
  });
  describe("a11y", () => {
    it("should be accessible when open", async () => {
      const slots = {
        trigger: getTrigger(),
        default: [getContent()],
      };
      const wrapper = await getWrapper({ slots, props: { open: true } });
      wrapper.setProps({ open: true });
      expect(await axe(wrapper.element)).toHaveNoViolations();
    });
  });
});
