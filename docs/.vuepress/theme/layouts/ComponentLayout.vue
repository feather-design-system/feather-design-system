<template>
  <ContentLayout>
    <template v-slot:rail>
      <ComponentMenu></ComponentMenu>
    </template>
  </ContentLayout>
</template>
<script>
import ContentLayout from "./ContentLayout";
import ComponentMenu from "../components/ComponentMenu.vue";
export default {
  components: {
    ContentLayout,
    ComponentMenu,
  },
};
</script>
