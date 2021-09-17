import MenuFocusLoop from "./MenuFocusLoop";

const getElements = () => {
  const ul = document.createElement("ul");
  const getLi = (index) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "";
    a.id = index.toString();
    a.textContent = index;
    li.appendChild(a);
    return li;
  };
  [1, 2, 3].map(getLi).forEach((li) => ul.appendChild(li));
  return ul;
};

describe("MenuFocusLoop directive", () => {
  it("focus next item when down is pressed", () => {
    const el = getElements();
    const links = el.querySelectorAll("li a");
    spyOn(links[1], "focus");
    MenuFocusLoop.contentKeyPressed({
      currentTarget: el,
      target: links[0],
      keyCode: 40,
      preventDefault: () => {},
    });
    expect(links[1].focus).toHaveBeenCalled();
  });
  it("focus first item when down is pressed and current focus is last item", () => {
    const el = getElements();
    const links = el.querySelectorAll("li a");
    spyOn(links[0], "focus");
    MenuFocusLoop.contentKeyPressed({
      currentTarget: el,
      target: links[2],
      keyCode: 40,
      preventDefault: () => {},
    });
    expect(links[0].focus).toHaveBeenCalled();
  });
  it("focus previous item when up is pressed", () => {
    const el = getElements();
    const links = el.querySelectorAll("li a");
    spyOn(links[0], "focus");
    MenuFocusLoop.contentKeyPressed({
      currentTarget: el,
      target: links[1],
      keyCode: 38,
      preventDefault: () => {},
    });
    expect(links[0].focus).toHaveBeenCalled();
  });
  it("focus last item when up is pressed and current focus is first item", () => {
    const el = getElements();
    const links = el.querySelectorAll("li a");
    spyOn(links[2], "focus");
    MenuFocusLoop.contentKeyPressed({
      currentTarget: el,
      target: links[0],
      keyCode: 38,
      preventDefault: () => {},
    });
    expect(links[2].focus).toHaveBeenCalled();
  });
});
