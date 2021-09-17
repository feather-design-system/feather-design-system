---
to: "packages/@featherds/<%= package.toLowerCase() %>/src/index.js"
---

export { default as <%= h.changeCase.pascalCase(component) %> } from "./components/<%= h.changeCase.pascalCase(component) %>.vue";
