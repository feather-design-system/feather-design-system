const useDropdownService = () => {
  return new DropdownService();
};
class DropdownService {
  setItems(incoming) {
    this.items = incoming;
  }
  select(item) {
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
    this.select(enabled[0]);
  }
  selectLast() {
    let enabled = Array.from(this.items).filter(
      (x) => !x.classList.contains("disabled")
    );
    enabled = enabled.length ? enabled : this.items; //if there is none enabled just use items.
    this.select(enabled[enabled.length - 1]);
  }
  selectPrevious() {
    const current = this.currentItem;
    const notDisabled = Array.from(this.items).filter(
      (x) => !x.classList.contains("disabled")
    );
    const index = notDisabled.indexOf(current);
    this.blur();
    if (index === 0) {
      this.select(notDisabled[notDisabled.length - 1]);
    } else {
      this.select(notDisabled[index - 1]);
    }
  }
  selectNext() {
    const current = this.currentItem;
    const notDisabled = Array.from(this.items).filter(
      (x) => !x.classList.contains("disabled")
    );
    const index = notDisabled.indexOf(current);
    this.blur();
    if (index === notDisabled.length - 1) {
      this.select(notDisabled[0]);
    } else {
      this.select(notDisabled[index + 1]);
    }
  }
}

export { useDropdownService };
