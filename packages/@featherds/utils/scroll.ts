const toView = function (el: HTMLElement, parent: HTMLElement) {
  if (!el || !parent) {
    return;
  }
  let elHeight = el.getBoundingClientRect().height;
  const compStyle = getComputedStyle(el);
  elHeight += parseInt(compStyle.getPropertyValue("margin-top"), 10);
  elHeight += parseInt(compStyle.getPropertyValue("margin-bottom"), 10);
  parent.scrollTop =
    el.offsetTop - parent.getBoundingClientRect().height + elHeight;
};

export { toView };
