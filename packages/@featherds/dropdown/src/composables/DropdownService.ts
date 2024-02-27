const useDropdownService = () => {
  return new DropdownService();
};
class DropdownService {
  items: HTMLElement[] = [];
  currentItem?: HTMLElement = undefined;
  setItems(incoming: HTMLElement[]) {
    this.items = incoming;
  }
  select(item: HTMLElement) {
    this.currentItem = item;
    item.focus();
  }
  blur() {
    if (this.currentItem && this.currentItem.blur) {
      this.currentItem.blur();
    }
  }
  selectFirst() {
    let enabled = Array.from(this.items).filter(
      (x) => !x.classList.contains("disabled")
    );
    enabled = enabled.length ? enabled : this.items; //if there is none enabled just use items.
    this.select(enabled[0] as HTMLElement);
  }
  selectLast() {
    let enabled = Array.from(this.items).filter(
      (x) => !x.classList.contains("disabled")
    );
    enabled = enabled.length ? enabled : this.items; //if there is none enabled just use items.
    this.select(enabled[enabled.length - 1] as HTMLElement); // TS2345
  }
  selectPrevious() {
    if (!this.currentItem) {
      return;
    }
    const current = this.currentItem;
    const notDisabled = Array.from(this.items).filter(
      (x) => !x.classList.contains("disabled")
    );
    const index = notDisabled.indexOf(current);
    this.blur();
    if (index === 0) {
      this.select(notDisabled[notDisabled.length - 1] as HTMLElement); // TS2345
    } else {
      this.select(notDisabled[index - 1] as HTMLElement); // TS2345
    }
  }
  selectNext() {
    if (!this.currentItem) {
      return;
    }
    const current = this.currentItem;
    const notDisabled = Array.from(this.items).filter(
      (x) => !x.classList.contains("disabled")
    );
    const index = notDisabled.indexOf(current);
    this.blur();
    if (index === notDisabled.length - 1) {
      this.select(notDisabled[0] as HTMLElement); // TS2345
    } else {
      this.select(notDisabled[index + 1] as HTMLElement); // TS2345
    }
  }
}

export { useDropdownService };
