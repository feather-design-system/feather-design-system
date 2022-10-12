import { mount } from "@vue/test-utils";
import SkipContentLink from "./SkipContentLink.vue";
let scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

const getWrapper = () =>
  mount(SkipContentLink, {
    props: {
      content: "test",
      skipLabel: "This is a text passage",
    },
    attachTo: "body",
  });

beforeEach(() => {
  document.body.innerHTML = `
    <div id="test"></div>
  `;
});
describe("SkipContentLink", () => {
  it("should match snapshot", () => {
    const wrapper = getWrapper();
    expect(wrapper.element).toMatchSnapshot();
  });
  it("should use smooth scroll", () => {
    const wrapper = getWrapper();
    wrapper.trigger("click");
    expect(scrollIntoViewMock).toHaveBeenCalled();
    expect(document.activeElement?.id).toBe("test");
  });
});
