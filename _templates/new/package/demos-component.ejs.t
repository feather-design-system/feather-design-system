---
to: "packages/@featherds/<%= package.toLowerCase() %>/demos/Demo.vue"
---
<template>
  <section>
    <<%= h.changeCase.pascalCase(component) %>></<%= h.changeCase.pascalCase(component) %>>
  </section>
</template>
<script>
import * as components from "./../src";
export default {
  components: {
   ...components
  }
};
</script>

