import { nextTick } from "vue";
import { mount } from "@vue/test-utils";
import { getCalls } from "@featherds/utils/test/calls";
import FeatherMegaMenu from "./FeatherMegaMenu.vue";
import { MenuFocusLoop } from "@featherds/menu";
import { Code } from "@featherds/utils/keys";
import { vi, expect, describe, it } from "vitest";
const menuName = "Test";
const templateWithColumnsLinks = `<div>
                                    <div>
                                    <li><a href="#" id="1">1</a></li>
                                    <li><a  href="#" id="2">2</a></li>
                                    </div>
                                    <div>
                                    <li><a href="#" id="3">3</a></li>
                                    </div>
                                  </div>`;

const DialogClose = {
  template: '<a href="#" class="menu-close">Close</a>',
};

let menuOpen = false;
const menuToggle = () => {
  menuOpen = !menuOpen;
};

const getWrapper = function (options: Record<string, unknown> = {}) {
  const global: Record<string, unknown> =
    (options.global as Record<string, unknown>) || {};
  global.directives = {
    MenuFocusLoop,
  };
  global.stubs = {
    "dialog-close": DialogClose,
  };

  options.global = global;

  options.props = {
    name: menuName,
    closeText: "Close",
  };

  options.provide = {
    "menu-open": () => {
      return menuOpen;
    },
    "menu-toggle": menuToggle,
  };
  options.attachTo = document.body;
  return mount(FeatherMegaMenu, options);
};

const checkMenu = (open: boolean, wrapper: ReturnType<typeof getWrapper>) => {
  const menuvm = wrapper.find(".menu");

  expect(menuvm.exists()).toBe(open);
  expect(wrapper.vm.open).toBe(open);
};

describe("FeatherMegaMenu.vue", () => {
  it("should open a menu when clicked", async () => {
    const slots = {
      default: "<div>menu</div>",
      button: "<button>Test</button>",
    };
    const wrapper = getWrapper({ slots });
    await nextTick();

    checkMenu(false, wrapper);
    wrapper.vm.menuButtonClicked();
    await nextTick();

    checkMenu(true, wrapper);
    expect(getCalls<[boolean]>(wrapper, "opened").length).toBe(1);
  });
  it("should close a menu when X clicked", async () => {
    const slots = {
      default: "<div>menu</div>",
      button: "<button>Test</button>",
    };
    const wrapper = getWrapper({ slots });
    await nextTick();

    wrapper.vm.open = true;
    await nextTick();

    checkMenu(true, wrapper);
    wrapper.vm.closeMenu();
    await nextTick();
    checkMenu(false, wrapper);
    expect(getCalls<[boolean]>(wrapper, "closed").length).toBe(1);
  });

  it("should give the menu the correct role", async () => {
    const wrapper = getWrapper();
    await nextTick();

    wrapper.vm.open = true;
    await nextTick();

    const menu = wrapper.find(".menu");
    expect(menu.attributes().role).toBe("menu");
  });
  it("should hide menu on outside click", () => {
    const wrapper = getWrapper();
    wrapper.vm.open = true;
    wrapper.vm.outsideElementEvent({ target: document } as unknown as Event);
    expect(wrapper.vm.open).toBe(false);
  });
  it("should add and remove document level event listeners", async () => {
    const addSpy = vi.spyOn(document, "addEventListener");
    const remove = vi.spyOn(document, "removeEventListener");
    const wrapper = getWrapper();
    await nextTick();

    wrapper.vm.open = true;
    await nextTick();

    expect(addSpy).toHaveBeenCalled();
    wrapper.vm.open = false;
    await nextTick();

    expect(remove).toHaveBeenCalled();
  });
  it("should remove document level event listeners when unmounted", () => {
    const remove = vi.spyOn(document, "removeEventListener");
    const wrapper = getWrapper();
    wrapper.unmount();
    expect(remove).toHaveBeenCalled();
  });
  it("should have a menu name", async () => {
    const wrapper = getWrapper();

    wrapper.vm.open = true;
    await nextTick();

    const name = wrapper.find(".menu-name");
    expect(name.text()).toContain(menuName);
    expect(name.attributes().role).toBe("presentation");
  });
  it("should focus the first item after opening", async () => {
    vi.useFakeTimers();
    const slots = {
      default: templateWithColumnsLinks,
      button: "<button>Test</button>",
    };
    const wrapper = getWrapper({ slots });
    await nextTick();

    wrapper.vm.open = true;
    await nextTick();

    wrapper.vm.afterEnter();
    vi.runAllTimers();

    await nextTick();
    expect(document.activeElement).toEqual(wrapper.find("li a").element);
  });

  it("should close the menu and focus menu button when ESC is pressed", async () => {
    vi.useRealTimers();
    const slots = {
      default: templateWithColumnsLinks,
      button: "<button>Test</button>",
    };
    const wrapper = getWrapper({ slots });
    await nextTick();

    wrapper.vm.open = true;
    await nextTick();

    checkMenu(true, wrapper);

    const menu = wrapper.find(".menu-content");
    await menu.trigger("keydown", { code: Code.ESCAPE });
    await nextTick();

    checkMenu(false, wrapper);
  });

  it("should close menu when a menuitem is clicked", async () => {
    vi.useRealTimers();
    const slots = {
      default: templateWithColumnsLinks,
      button: "<button>Test</button>",
    };
    const wrapper = getWrapper({ slots });
    await nextTick();

    wrapper.vm.open = true;
    await nextTick();

    wrapper.find("li a").trigger("click");
    await nextTick();

    checkMenu(false, wrapper);
  });
});
