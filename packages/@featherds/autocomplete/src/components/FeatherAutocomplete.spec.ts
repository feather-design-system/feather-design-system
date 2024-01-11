import FeatherAutocomplete from "./FeatherAutocomplete.vue";
import { IAutocompleteItemType, AutocompleteTypes } from "./types";
import { shallowMount, mount } from "@vue/test-utils";
import * as id from "@featherds/utils/id";
import axe from "@featherds/utils/test/axe";
import { nextTick } from "vue";
import { vi, expect, describe, it } from "vitest";

import "@featherds/input-helper/test/MutationObserver";
import { getCalls } from "@featherds/utils/test/calls";
import { Code } from "@featherds/utils/keys";
vi.spyOn(id, "getSafeId").mockImplementation((x) => x);

const getProps =
  (type: AutocompleteTypes) =>
  (props: Record<string, unknown> = {}) => {
    return {
      label: "Users",
      type,
      ...props,
    };
  };

const getResultsType = (_type: AutocompleteTypes) => () => {
  return [
    {
      _text: "Item 1",
    },
    {
      _text: "Item 2",
    },
  ];
};
const getValueType = (type: AutocompleteTypes) => () => {
  if (type === AutocompleteTypes.multi) {
    return [
      {
        _text: "Item 1",
      },
      {
        _text: "Item 2",
      },
    ];
  }
  return { _text: "Item 1" };
};
const handleUpdateValueType =
  (type: AutocompleteTypes) =>
  (args: (IAutocompleteItemType | IAutocompleteItemType[])[]) => {
    if (type === AutocompleteTypes.multi) {
      const items = args as Array<IAutocompleteItemType[]>;
      return items[0][0];
    }
    const items = args as IAutocompleteItemType[];
    return items[0];
  };
const getWrapperType = (type: AutocompleteTypes) =>
  function (options: Record<string, unknown> = {}) {
    const props = options.props as Record<string, unknown>;
    options.props = getProps(type)(props);
    return shallowMount(FeatherAutocomplete, options);
  };

const getFullWrapperType = (type: AutocompleteTypes) =>
  function (options: Record<string, unknown> = {}) {
    const props = options.props as Record<string, unknown>;
    options.props = getProps(type)(props);
    return mount(FeatherAutocomplete, options);
  };

const baseFunctionality = (type: AutocompleteTypes) => {
  const getFullWrapper = getFullWrapperType(type);
  const getWrapper = getWrapperType(type);
  const getValue = getValueType(type);
  const getResults = getResultsType(type);
  const handleUpdateValue = handleUpdateValueType(type);
  describe(type, () => {
    it("should perform search with empty string when clicked and min char is 0", async () => {
      const wrapper = getFullWrapper();
      await wrapper.find(".feather-autocomplete-input").trigger("focus");
      await wrapper.findComponent({ ref: "menu" }).vm.$emit("trigger-click");
      expect(getCalls<string>(wrapper, "search")[0][0]).toBe("");
    });
    it("should not perform search with empty string when focused and min char is 0", async () => {
      const wrapper = getFullWrapper();
      await wrapper.find(".feather-autocomplete-input").trigger("focus");
      expect(wrapper.emitted("search")).toBeFalsy();
    });
    it("should perform search with empty string when focused and space pressed and min char is 0", async () => {
      const wrapper = getFullWrapper();
      const input = wrapper.find<HTMLInputElement>(
        ".feather-autocomplete-input"
      );
      await input.trigger("focus");
      await input.trigger("keydown", { code: Code.SPACE });

      expect(getCalls<string>(wrapper, "search")[0][0]).toBe("");
    });
    it("should not search when clicked an min char is >0", async () => {
      const wrapper = getFullWrapper({
        props: { minChar: 3 },
      });
      await wrapper.find(".feather-autocomplete-input").trigger("click");
      expect(wrapper.emitted("search")).toBeUndefined();
    });
    it("should not search when focused an min char is >0", async () => {
      const wrapper = getFullWrapper({
        props: { minChar: 3 },
      });
      await wrapper.find(".feather-autocomplete-input").trigger("focus");
      expect(wrapper.emitted("search")).toBeUndefined();
    });
    it("should perform search with text when characters are entered > min char", async () => {
      vi.useFakeTimers({
        toFake: ["setTimeout", "clearTimeout"],
      });

      const wrapper = getFullWrapper({
        props: { minChar: 3 },
      });
      const result = "est";
      const input = wrapper.find<HTMLInputElement>(
        ".feather-autocomplete-input"
      );
      input.element.value = result;
      await input.trigger("input");
      await input.trigger("focus");
      vi.runAllTimers();
      expect(getCalls<string>(wrapper, "search")[0][0]).toBe(result);
    });
    it("should throttle search queries", async () => {
      vi.useFakeTimers({
        toFake: ["setTimeout", "clearTimeout"],
      });

      const wrapper = getFullWrapper({
        props: { minChar: 3 },
      });
      const result = "est";
      const input = wrapper.find<HTMLInputElement>(
        ".feather-autocomplete-input"
      );
      await input.trigger("focus");
      input.element.value = result;
      await input.trigger("input");
      vi.advanceTimersByTime(100);
      expect(wrapper.emitted("search")).toBeUndefined();
      vi.advanceTimersByTime(200);
      expect(getCalls<string>(wrapper, "search")[0][0]).toBe(result);
    });
    it("should show loading spinner when search is performed", async () => {
      const wrapper = getFullWrapper();
      await wrapper.find(".feather-autocomplete-input").trigger("focus");
      await wrapper.setProps({
        loading: true,
      });
      await nextTick();
      await nextTick();
      expect(wrapper.element).toMatchSnapshot();
    });
    it("should show no results text when search returns no results", async () => {
      vi.useFakeTimers({
        toFake: ["setTimeout", "clearTimeout"],
      });

      const results = [] as IAutocompleteItemType[];
      const wrapper = getFullWrapper();
      await wrapper.find(".feather-autocomplete-input").trigger("focus");

      wrapper.vm.query = "j";
      await wrapper.setProps({
        results,
      });

      vi.runAllTimers();
      await nextTick();
      await nextTick();
      await nextTick();
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.vm.showNoResults).toBe(true);
    });
    it("should not leave previous search results visible whilst new search is being performed", async () => {
      const wrapper = getFullWrapper();
      await wrapper.find(".feather-autocomplete-input").trigger("focus");
      await wrapper.setProps({
        results: getResults(),
      });
      await wrapper.setProps({
        loading: true,
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it("should raise the label when the autocomplete has a value", () => {
      const wrapper = getFullWrapper({
        props: {
          modelValue: getValue(),
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it("should lower label when there is no value and autocomplete doesnt have focus", () => {
      const wrapper = getFullWrapper();
      expect(wrapper.element).toMatchSnapshot();
    });

    describe("disabled state", () => {
      it("should render in a disabled state with no value", () => {
        const wrapper = getFullWrapper({
          props: {
            disabled: true,
          },
        });
        expect(wrapper.element).toMatchSnapshot();
      });
      it("should render in a disabled state with a value", () => {
        const wrapper = getFullWrapper({
          props: {
            modelValue: getValue(),
            disabled: true,
          },
        });
        expect(wrapper.element).toMatchSnapshot();
      });
    });
    describe("Accessibility", () => {
      // beforeEach(() => vi.setTimeout(60000));

      it("should be accessible in default state", async () => {
        vi.useRealTimers();
        const wrapper = getFullWrapper();

        expect(await axe(wrapper.element)).toHaveNoViolations();
      });
      it("should be accessible in loading state", async () => {
        vi.useRealTimers();
        const wrapper = getFullWrapper();
        await wrapper.find(".feather-autocomplete-input").trigger("focus");

        await wrapper.setProps({
          loading: true,
        });

        expect(await axe(wrapper.element)).toHaveNoViolations();
      });

      it("should be accessible in minchar state", async () => {
        vi.useRealTimers();
        const wrapper = getFullWrapper();

        await wrapper.setProps({
          minChar: 3,
        });
        await wrapper.find(".feather-autocomplete-input").trigger("focus");
        expect(await axe(wrapper.element)).toHaveNoViolations();
      });
      it("should be accessible with menu open", async () => {
        vi.useRealTimers();
        const results = getResults();
        const wrapper = getFullWrapper();
        await wrapper.find(".feather-autocomplete-input").trigger("focus");

        await wrapper.setProps({
          results,
        });

        expect(await axe(wrapper.element)).toHaveNoViolations();
      });
      it("should be accessible in default state with value", async () => {
        vi.useRealTimers();
        const modelValue = getValue();
        const wrapper = getFullWrapper({
          props: {
            modelValue,
          },
        });
        expect(await axe(wrapper.element)).toHaveNoViolations();
      });
      it("should be accessible with menu open and a value", async () => {
        vi.useRealTimers();
        const results = getResults();
        const wrapper = getFullWrapper({
          props: {
            modelValue: results,
          },
        });
        await wrapper.find(".feather-autocomplete-input").trigger("focus");

        await wrapper.setProps({
          results,
        });

        expect(await axe(wrapper.element)).toHaveNoViolations();
      });
    });
    describe("menu selection", () => {
      it("should set active descendant when row is active", async () => {
        const results = getResults();
        const wrapper = getFullWrapper();
        await wrapper.find(".feather-autocomplete-input").trigger("focus");

        await wrapper.setProps({
          results,
        });
        wrapper.vm.active.row = 0;
        await nextTick();
        expect(
          wrapper
            .find(".feather-autocomplete-input")
            .attributes("aria-activedescendant")
        ).toBe(wrapper.vm.resultItemId);
      });

      it("should close the menu when escape key is pressed", async () => {
        const results = getResults();
        const wrapper = getFullWrapper();
        const input = wrapper.find<HTMLInputElement>(
          ".feather-autocomplete-input"
        );
        await input.trigger("focus");

        await wrapper.setProps({
          results,
        });
        await wrapper.setData({
          active: { row: 0 },
        });

        await input.trigger("keydown", { code: Code.ESCAPE });

        expect(wrapper.vm.active.row).toBe(-1);
        expect(wrapper.vm.showMenu).toBe(false);
      });
      it("should select an element when enter is pressed on it", async () => {
        const results = getResults();
        const wrapper = getFullWrapper();
        const input = wrapper.find<HTMLInputElement>(
          ".feather-autocomplete-input"
        );
        await input.trigger("focus");

        await wrapper.setProps({
          results,
        });
        wrapper.vm.active.row = 0;

        await input.trigger("keydown", { code: Code.ENTER });

        const emitted = handleUpdateValue(
          getCalls<[IAutocompleteItemType[]]>(wrapper, "update:modelValue")[0]
        );
        expect(emitted._text).toBe(results[0]._text);
      });
      it("should select an element when clicked", async () => {
        const results = getResults();
        const wrapper = getFullWrapper();
        await wrapper.find(".feather-autocomplete-input").trigger("focus");

        await wrapper.setProps({
          results,
        });

        wrapper
          .findComponent({ ref: "results" })
          .vm.$emit("select", results[0]);
        let emitted = handleUpdateValue(
          getCalls<[IAutocompleteItemType[]]>(wrapper, "update:modelValue")[0]
        );
        expect(emitted._text).toBe(results[0]._text);
        await wrapper.find(".feather-autocomplete-input").trigger("blur");
        const events = getCalls<[IAutocompleteItemType[]]>(
          wrapper,
          "update:modelValue"
        );
        emitted = handleUpdateValue(events[events.length - 1]);
        expect(emitted._text).toBe(results[0]._text);
      });
    });
  });
};

describe("FeatherAutocomplete", () => {
  describe("base functionality", () => {
    baseFunctionality(AutocompleteTypes.multi);
    baseFunctionality(AutocompleteTypes.single);
  });
  describe("multi:specific", () => {
    const getFullWrapper = getFullWrapperType(AutocompleteTypes.multi);
    const getResults = getResultsType(AutocompleteTypes.multi);
    const getValue = getValueType(AutocompleteTypes.multi);
    it("should activate first item in menu on initial load", async () => {
      const results = getResults();
      const wrapper = getFullWrapper();
      await wrapper.find(".feather-autocomplete-input").trigger("focus");

      await wrapper.setProps({
        results,
      });

      expect(wrapper.vm.active.row).toBe(0);
      expect(
        wrapper
          .find(".feather-autocomplete-input")
          .attributes("aria-activedescendant")
      ).toBe(wrapper.vm.resultItemId);
    });

    it("should leave the menu open when enter is used to select an item", async () => {
      const results = getResults();

      const wrapper = getFullWrapper();
      await wrapper.setProps({
        results,
      });
      const input = wrapper.find<HTMLInputElement>(
        ".feather-autocomplete-input"
      );
      await input.trigger("focus");
      const search = "test";
      input.element.value = search;

      await input.trigger("focus");

      await input.trigger("keydown", { code: Code.DOWN });
      await input.trigger("keydown", { code: Code.ENTER });

      //should still be at first index.
      expect(wrapper.vm.active.row).toBe(1);
      expect(input.element.value).toBe(search);

      expect(wrapper.vm.showResults).toBe(true);
    });
    it("should leave the menu open when enter is used to select an item and minchar set", async () => {
      const results = getResults();
      const wrapper = getFullWrapper({
        props: {
          minChar: 2,
        },
      });
      const input = wrapper.find<HTMLInputElement>(
        ".feather-autocomplete-input"
      );
      const search = "test";
      wrapper.vm.query = search;
      await input.trigger("focus");

      await wrapper.setProps({
        results,
      });

      await input.trigger("keydown", { code: Code.DOWN });
      await input.trigger("keydown", { code: Code.ENTER });

      //should still be at first index.
      expect(wrapper.vm.active.row).toBe(1);
      //make sure query isnt being reset
      expect(wrapper.vm.query).toBe(search);

      //make sure correct menus show
      expect(wrapper.vm.showResults).toBe(true);
      expect(wrapper.vm.showMinCharWarning).toBe(false);
    });
    it("should hide/reset menu and clear text input when it loses focus", async () => {
      vi.useFakeTimers({
        toFake: ["setTimeout", "clearTimeout"],
      });
      const wrapper = getFullWrapper();
      const input = wrapper.find<HTMLInputElement>(
        ".feather-autocomplete-input"
      );
      await input.trigger("focus");
      input.element.value = "test";
      await input.trigger("input");
      vi.runAllTimers();

      await wrapper.setProps({
        results: getResults(),
      });

      await wrapper.find(".feather-autocomplete-input").trigger("blur");
      await wrapper.findComponent({ ref: "menu" }).vm.$emit("outside-click");
      await nextTick();
      await nextTick();
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.vm.internalResults.length).toBe(0);
    });

    describe("chip selection", () => {
      it("should select the right most chip when left arrow is pressed and input has no text", async () => {
        const modelValue = [
          {
            _text: "Test1",
          },
          {
            _text: "Test2",
          },
        ];
        const wrapper = getFullWrapper({
          props: {
            modelValue,
          },
        });
        const input = wrapper.find<HTMLInputElement>(
          ".feather-autocomplete-input"
        );
        await input.trigger("keydown", { code: Code.LEFT });

        expect(wrapper.vm.activeChipIndex).toBe(modelValue.length - 1);
        expect(wrapper.element).toMatchSnapshot();
      });
      it("should move chip selection left when left arrow is pressed, so long it is not the left most token", async () => {
        const modelValue = [
          {
            _text: "Test1",
          },
          {
            _text: "Test2",
          },
        ];
        const wrapper = getFullWrapper({
          props: {
            modelValue,
          },
        });
        const input = wrapper.find<HTMLInputElement>(
          ".feather-autocomplete-input"
        );

        await input.trigger("keydown", { code: Code.LEFT });
        await input.trigger("keydown", { code: Code.LEFT });

        expect(wrapper.vm.activeChipIndex).toBe(modelValue.length - 2);
        expect(wrapper.element).toMatchSnapshot();
      });
      it("should move chip selection right when right arrow is pressed, so long it is not the right most token", async () => {
        const modelValue = [
          {
            _text: "Test1",
          },
          {
            _text: "Test2",
          },
        ];
        const wrapper = getFullWrapper({
          props: {
            modelValue,
          },
        });
        const input = wrapper.find<HTMLInputElement>(
          ".feather-autocomplete-input"
        );
        await input.trigger("keydown", { code: Code.LEFT });
        await input.trigger("keydown", { code: Code.LEFT });
        await input.trigger("keydown", { code: Code.RIGHT });

        expect(wrapper.vm.activeChipIndex).toBe(modelValue.length - 1);
        expect(wrapper.element).toMatchSnapshot();
      });
      it("should not move chip selection when left is pressed on the left most token", async () => {
        const modelValue = [
          {
            _text: "Test1",
          },
          {
            _text: "Test2",
          },
        ];
        const wrapper = getFullWrapper({
          props: {
            modelValue,
          },
        });
        const input = wrapper.find<HTMLInputElement>(
          ".feather-autocomplete-input"
        );
        await input.trigger("keydown", { code: Code.LEFT });
        await input.trigger("keydown", { code: Code.LEFT });
        await input.trigger("keydown", { code: Code.LEFT });

        expect(wrapper.vm.activeChipIndex).toBe(0);
        expect(wrapper.element).toMatchSnapshot();
      });
      it("should should deselect chip when right arrow is pressed on right most token", async () => {
        const modelValue = [
          {
            _text: "Test1",
          },
          {
            _text: "Test2",
          },
        ];
        const wrapper = getFullWrapper({
          props: {
            modelValue,
          },
        });
        const input = wrapper.find<HTMLInputElement>(
          ".feather-autocomplete-input"
        );
        await input.trigger("keydown", { code: Code.LEFT });
        await input.trigger("keydown", { code: Code.RIGHT });

        expect(wrapper.vm.activeChipIndex).toBe(-1);
        expect(wrapper.element).toMatchSnapshot();
      });
      it("should not perform any chip navigation when there is text", async () => {
        const modelValue = [
          {
            _text: "Test1",
          },
          {
            _text: "Test2",
          },
        ];
        const wrapper = getFullWrapper({
          props: {
            modelValue,
          },
        });
        const input = wrapper.find<HTMLInputElement>(
          ".feather-autocomplete-input"
        );

        input.element.value = "test";
        await input.trigger("input");

        await input.trigger("keydown", { code: Code.LEFT });
        await input.trigger("keydown", { code: Code.RIGHT });
        await input.trigger("keydown", { code: Code.DELETE });
        await input.trigger("keydown", { code: Code.BACKSPACE });

        expect(wrapper.vm.activeChipIndex).toBe(-1);
        expect(wrapper.element).toMatchSnapshot();
      });
      it("should delete a chip when chip is active and delete is pressed", async () => {
        const modelValue = [
          {
            _text: "Test1",
          },
          {
            _text: "Test2",
          },
        ];
        const wrapper = getFullWrapper({
          props: {
            modelValue,
          },
        });
        const input = wrapper.find<HTMLInputElement>(
          ".feather-autocomplete-input"
        );
        await input.trigger("keydown", { code: Code.LEFT });
        await input.trigger("keydown", { code: Code.DELETE });

        const dsds = getCalls<[IAutocompleteItemType[]]>(
          wrapper,
          "update:modelValue"
        )[0][0];
        expect(
          getCalls<[IAutocompleteItemType[]]>(
            wrapper,
            "update:modelValue"
          )[0][0][0]._text
        ).toBe(modelValue[0]._text);
        expect(wrapper.vm.activeChipIndex).toBe(-1);
      });
      it("should delete a chip when chip is active and backspace is pressed", async () => {
        const modelValue = [
          {
            _text: "Test1",
          },
          {
            _text: "Test2",
          },
        ];
        const wrapper = getFullWrapper({
          props: {
            modelValue,
          },
        });
        const input = wrapper.find<HTMLInputElement>(
          ".feather-autocomplete-input"
        );
        await input.trigger("keydown", { code: Code.LEFT });
        await input.trigger("keydown", { code: Code.BACKSPACE });

        expect(
          getCalls<[IAutocompleteItemType[]]>(
            wrapper,
            "update:modelValue"
          )[0][0][0]._text
        ).toBe(modelValue[0]._text);
        expect(wrapper.vm.activeChipIndex).toBe(-1);
      });
      it("should not have any active tokens when one is deleted", async () => {
        const modelValue = [
          {
            _text: "Test1",
          },
          {
            _text: "Test2",
          },
        ];
        const wrapper = getFullWrapper({
          props: {
            modelValue,
          },
        });
        const input = wrapper.find<HTMLInputElement>(
          ".feather-autocomplete-input"
        );

        await input.trigger("keydown", { code: Code.LEFT });
        await input.trigger("keydown", { code: Code.BACKSPACE });

        expect(
          getCalls<[IAutocompleteItemType[]]>(
            wrapper,
            "update:modelValue"
          )[0][0][0]._text
        ).toBe(modelValue[0]._text);
        expect(wrapper.vm.activeChipIndex).toBe(-1);
      });
      it("should delete a chip when the delete x is clicked", async () => {
        const modelValue = [
          {
            _text: "Test1",
          },
          {
            _text: "Test2",
          },
        ];
        const wrapper = getFullWrapper({
          props: {
            modelValue,
          },
        });
        wrapper.findComponent({ name: "Chip" }).vm.$emit("delete");
        expect(
          getCalls<[IAutocompleteItemType[]]>(
            wrapper,
            "update:modelValue"
          )[0][0][0]._text
        ).toBe(modelValue[1]._text);
      });
      it("should select rightmost token if left is pressed whilst navigating the menu and there is no search text", async () => {
        const results = [
          {
            _text: "Test1",
          },
          {
            _text: "Test2",
          },
        ];
        const modelValue = [
          {
            _text: "Test11",
          },
          {
            _text: "Test21",
          },
        ];
        const wrapper = getFullWrapper({
          props: {
            modelValue,
          },
        });
        const input = wrapper.find<HTMLInputElement>(
          ".feather-autocomplete-input"
        );
        await input.trigger("focus");

        await wrapper.setProps({
          results,
        });
        await input.trigger("keydown", { code: Code.LEFT });

        expect(wrapper.vm.activeChipIndex).toBe(modelValue.length - 1);
        expect(wrapper.vm.active.row).toBe(-1);

        expect(wrapper.element).toMatchSnapshot();
      });
    });
    describe("selection limit", () => {
      it("should display a warning when selection limit is from initial value and has focus", async () => {
        const modelValue = getValue() as IAutocompleteItemType[];
        const wrapper = getFullWrapper({
          props: {
            modelValue,
            selectionLimit: modelValue.length,
          },
        });
        await wrapper.find(".feather-autocomplete-input").trigger("focus");
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.vm.showSelectionLimit).toBe(true);
      });
      it("should display a warning when selection limit is reached and has focus", async () => {
        const modelValue = getValue() as IAutocompleteItemType[];
        const wrapper = getFullWrapper({
          props: {
            selectionLimit: modelValue.length,
          },
        });
        await wrapper.find(".feather-autocomplete-input").trigger("focus");
        expect(wrapper.vm.showSelectionLimit).toBe(false);
        await wrapper.setProps({
          modelValue,
        });
        await nextTick();
        await nextTick();
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.vm.showSelectionLimit).toBe(true);
      });
      it("should display a warning when selection limit is reached from menu selection", async () => {
        const wrapper = getFullWrapper({
          props: {
            selectionLimit: 1,
          },
        });
        const input = wrapper.find<HTMLInputElement>(
          ".feather-autocomplete-input"
        );
        await input.trigger("focus");
        await wrapper.setProps({
          results: getResults(),
        });
        wrapper.vm.active.row = 0;

        await input.trigger("keydown", { code: Code.ENTER });

        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.vm.showSelectionLimit).toBe(true);
      });
      it("should clear warning when item is removed", async () => {
        const modelValue = getValue() as IAutocompleteItemType[];
        const wrapper = getFullWrapper({
          props: {
            selectionLimit: modelValue.length,
            modelValue,
          },
        });
        await wrapper.find(".feather-autocomplete-input").trigger("focus");
        expect(wrapper.vm.showSelectionLimit).toBe(true);
        wrapper.vm.removeFromValue(modelValue[0]);
        await nextTick();
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.vm.showSelectionLimit).toBe(false);
      });
    });
  });

  describe("single:specific", () => {
    const getFullWrapper = getFullWrapperType(AutocompleteTypes.single);
    const getResults = getResultsType(AutocompleteTypes.single);
    const getValue = getValueType(AutocompleteTypes.single);
    it("should display value text in the input when a value is selected", async () => {
      const wrapper = getFullWrapper();
      const input = wrapper.find<HTMLInputElement>(
        ".feather-autocomplete-input"
      );
      expect(input.element.value).toBeFalsy();
      const modelValue = getValue() as IAutocompleteItemType;
      await wrapper.setProps({
        modelValue,
      });
      expect(input.element.value).toBe(modelValue._text);
    });
    it("should display value text in the input when a value is preselected", async () => {
      const modelValue = getValue() as IAutocompleteItemType;
      const wrapper = getFullWrapper({
        props: {
          modelValue,
        },
      });
      expect(wrapper.vm.query).toBe(modelValue._text);
    });
    it("should select the current active menu item on blur", async () => {
      const results = getResults();
      const wrapper = getFullWrapper();
      const input = wrapper.find<HTMLInputElement>(
        ".feather-autocomplete-input"
      );
      await input.trigger("focus");

      await wrapper.setProps({
        results,
      });

      await input.trigger("keydown", { code: Code.DOWN });
      await input.trigger("keydown", { code: Code.DOWN });

      const index = wrapper.vm.active.row;
      await input.trigger("blur");
      expect(
        getCalls<[IAutocompleteItemType[]]>(wrapper, "update:modelValue")[0][0]
      ).toStrictEqual(results[index]);
    });
    it("should fire single update:modelValue when clicked", async () => {
      const results = getResults();
      const wrapper = getFullWrapper();
      await wrapper
        .find<HTMLInputElement>(".feather-autocomplete-input")
        .trigger("focus");

      await wrapper.setProps({
        results,
      });

      // search
      const query = "item";
      wrapper.vm.query = query;

      // click the 2nd result
      await wrapper
        .findComponent({ ref: "results" })
        .findAll(".result-item")[1]
        .trigger("click");

      await wrapper.find(".feather-autocomplete-input").trigger("blur");
      await wrapper.vm.$nextTick();
      const events = getCalls<[IAutocompleteItemType[]]>(
        wrapper,
        "update:modelValue"
      );

      expect(events.length).toBe(1);
    });
    it("should display the current selected value if no new selection is made", async () => {
      vi.useFakeTimers({
        toFake: ["setTimeout", "clearTimeout"],
      });
      const modelValue = getValue() as IAutocompleteItemType;
      const wrapper = getFullWrapper({
        props: {
          modelValue,
        },
      });
      const input = wrapper.find<HTMLInputElement>(
        ".feather-autocomplete-input"
      );
      await input.trigger("focus");

      input.element.value = modelValue._text + "dasdasd";
      await input.trigger("input");
      await nextTick();
      vi.runAllTimers();
      await wrapper.find(".feather-autocomplete-input").trigger("blur");
      await wrapper.findComponent({ ref: "menu" }).vm.$emit("outside-click");
      await nextTick();

      expect(input.element.value).toBe(modelValue._text);
    });
    it("should close menu when enter is pressed on a menu item to select it", async () => {
      const results = getResults();
      const wrapper = getFullWrapper();
      const input = wrapper.find<HTMLInputElement>(
        ".feather-autocomplete-input"
      );
      await input.trigger("focus");

      await wrapper.setProps({
        results,
      });

      await input.trigger("keydown", { code: Code.DOWN });
      await input.trigger("keydown", { code: Code.ENTER });

      expect(wrapper.element).toMatchSnapshot();
    });

    it("should handle a null property on value", async () => {
      const modelValue = getValue() as IAutocompleteItemType;
      modelValue.test = null;
      const wrapper = getFullWrapper({
        props: {
          modelValue,
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it("should clear selection when clear icon is clicked", async () => {
      const modelValue = getValue();
      const wrapper = getFullWrapper({
        props: {
          modelValue,
        },
      });

      wrapper.vm.handleClear();
      await nextTick();
      expect(
        getCalls<[IAutocompleteItemType[]]>(wrapper, "update:modelValue")[0][0]
      ).toBe(undefined);
    });

    it("should emit new event when add new element is clicked", async () => {
      vi.useFakeTimers({
        toFake: ["setTimeout", "clearTimeout"],
      });

      const results = [] as IAutocompleteItemType[];
      const wrapper = getFullWrapper({
        props: {
          allowNew: true,
        },
      });
      await wrapper.find(".feather-autocomplete-input").trigger("focus");
      const query = "j";
      wrapper.vm.query = query;
      wrapper.setProps({
        results,
      });
      vi.runAllTimers();
      await nextTick();
      const resultsList = wrapper.findComponent({ ref: "results" });
      resultsList.vm.$emit("select", {
        _new: query,
        [wrapper.vm.textProp]: query,
      });
      expect(getCalls<[string]>(wrapper, "new")[0][0]).toBe(query);
    });
    it("should show add new element when in add-new mode", async () => {
      vi.useFakeTimers({
        toFake: ["setTimeout", "clearTimeout"],
      });

      const results = [] as IAutocompleteItemType[];
      const wrapper = getFullWrapper({
        props: {
          allowNew: true,
        },
      });
      await wrapper.find(".feather-autocomplete-input").trigger("focus");

      wrapper.vm.query = "j";
      wrapper.setProps({
        results,
      });

      vi.runAllTimers();
      await nextTick();
      await nextTick();
      await nextTick();
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.vm.showNoResults).toBe(false);
      expect(wrapper.vm.showResults).toBe(true);
    });
    it("should add new item on blur when it is highlighted", async () => {
      vi.useFakeTimers({
        toFake: ["setTimeout", "clearTimeout"],
      });
      const results = getResults() as IAutocompleteItemType[];
      const wrapper = getFullWrapper({
        props: {
          allowNew: true,
        },
      });
      const input = wrapper.find<HTMLInputElement>(
        ".feather-autocomplete-input"
      );
      await input.trigger("focus");
      const query = "xxx";
      wrapper.vm.query = query;
      await nextTick();

      await wrapper.setProps({
        results,
      });
      await input.trigger("blur");
      await nextTick();
      expect(getCalls<[string]>(wrapper, "new")[0][0]).toBe(query);
    });
  });
});
