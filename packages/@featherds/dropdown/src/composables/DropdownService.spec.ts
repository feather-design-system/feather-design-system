import { useDropdownService } from "./DropdownService";
import { vi, expect, describe, it } from "vitest";

const getItems = (disabled = false) =>
  [1, 2, 3, 4].map((i) => {
    const a = document.createElement("a");
    a.title = `Item ${i}`;
    if (disabled) {
      a.classList.add("disabled");
    }
    a.focus = vi.fn();
    return a;
  });
const checkSelected = (
  service: ReturnType<typeof useDropdownService>,
  items: HTMLElement[],
  index: number
) => {
  expect(items[index]!.focus).toHaveBeenCalled();
  expect(service.currentItem).toBe(items[index]);
};
describe("Dropdown Service", () => {
  describe("select first", () => {
    it("should select the first not disabled item", () => {
      const service = useDropdownService();
      const items = getItems();
      items[0]!.classList.add("disabled");
      service.setItems(items);
      service.selectFirst();
      checkSelected(service, items, 1);
    });
    it("should select the very first item if all disabled", () => {
      const service = useDropdownService();
      const items = getItems(true);
      service.setItems(items);
      service.selectFirst();
      checkSelected(service, items, 0);
    });
    it("should select the first", () => {
      const service = useDropdownService();
      const items = getItems();
      service.setItems(items);
      service.selectFirst();
      checkSelected(service, items, 0);
    });
  });
  describe("select last", () => {
    it("should select the last not disabled item", () => {
      const service = useDropdownService();
      const items = getItems();
      items[items.length - 1]!.classList.add("disabled");
      service.setItems(items);
      service.selectLast();
      checkSelected(service, items, items.length - 2);
    });
    it("should select the very last item if all disabled", () => {
      const service = useDropdownService();
      const items = getItems(true);
      service.setItems(items);
      service.selectLast();
      checkSelected(service, items, items.length - 1);
    });
    it("should select the last", () => {
      const service = useDropdownService();
      const items = getItems();
      service.setItems(items);
      service.selectLast();
      checkSelected(service, items, items.length - 1);
    });
  });
  describe("select previous", () => {
    it("should select the last element when first element is disabled and current element is second", () => {
      const service = useDropdownService();
      const items = getItems();
      items[0]!.classList.add("disabled");
      service.setItems(items);
      service.select(items[1]!); //set second;
      service.selectPrevious();
      checkSelected(service, items, items.length - 1);
    });
    it("should select the last element when current is first", () => {
      const service = useDropdownService();
      const items = getItems();
      service.setItems(items);
      service.select(items[0]!); //set first;
      service.selectPrevious();
      checkSelected(service, items, items.length - 1);
    });
    it("should select the first element when current is second", () => {
      const service = useDropdownService();
      const items = getItems();
      service.setItems(items);
      service.select(items[1]!); //set second;
      service.selectPrevious();
      checkSelected(service, items, 0);
    });
  });
  describe("select next", () => {
    it("should select the first element when last element is disabled and current element is second last", () => {
      const service = useDropdownService();
      const items = getItems();
      items[items.length - 1]!.classList.add("disabled");
      service.setItems(items);
      service.select(items[items.length - 2]!); //set second last;
      service.selectNext();
      checkSelected(service, items, 0);
    });
    it("should select the first element when current is last", () => {
      const service = useDropdownService();
      const items = getItems();
      service.setItems(items);
      service.select(items[items.length - 1]!); //set last;
      service.selectNext();
      checkSelected(service, items, 0);
    });
    it("should select the second element when current is first", () => {
      const service = useDropdownService();
      const items = getItems();
      service.setItems(items);
      service.select(items[0]!); //set first;
      service.selectNext();
      checkSelected(service, items, 1);
    });
  });
});
