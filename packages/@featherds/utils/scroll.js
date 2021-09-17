var toView = function (el, parent) {
  if (!el || !parent) {
    return;
  }
  var elHeight = el.getBoundingClientRect().height;
  const compStyle = getComputedStyle(el);
  elHeight += parseInt(compStyle["margin-top"], 10);
  elHeight += parseInt(compStyle["margin-bottom"], 10);
  parent.scrollTop =
    el.offsetTop - parent.getBoundingClientRect().height + elHeight;
};

export { toView };
