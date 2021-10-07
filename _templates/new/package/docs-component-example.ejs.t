---
to: "packages/@featherds/<%= package.toLowerCase() %>/docs/components/Example<%= h.changeCase.pascalCase(component) %>.vue"
---
<template>
  <section>
    <<%= h.changeCase.pascalCase(component) %>></<%= h.changeCase.pascalCase(component) %>>
  </section>
</template>
<script>
import { <%= h.changeCase.pascalCase(component) %> } from "@featherds/<%= package %>";
export default {
  components: {
    <%= h.changeCase.pascalCase(component) %>
  }
};
</script>

