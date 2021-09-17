---
to: "packages/@featherds/<%= package.toLowerCase() %>/src/index.d.ts"
---

declare module "@featherds/<%= package.toLowerCase() %>" {
  import { defineComponent } from "vue";
  const <%= h.changeCase.pascalCase(component) %>: ReturnType<typeof defineComponent>;
  export { <%= h.changeCase.pascalCase(component) %> }
}
