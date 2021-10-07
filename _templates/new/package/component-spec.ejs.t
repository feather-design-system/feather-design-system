---
to: "packages/@featherds/<%= package.toLowerCase() %>/src/components/<%= h.changeCase.pascalCase(component) %>.spec.js"
---
import <%= h.changeCase.pascalCase(component) %> from "./<%= h.changeCase.pascalCase(component) %>.vue";
import { mount } from "@vue/test-utils";


const getWrapper = function(options) {
  return mount(<%= h.changeCase.pascalCase(component) %>, options);
};


describe("<%= h.changeCase.pascalCase(component) %>.vue", () => {
  it("should render a ....", () => {

  });
});
