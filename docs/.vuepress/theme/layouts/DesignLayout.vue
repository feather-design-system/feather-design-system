<template>
  <ContentLayout>
    <template v-slot:rail>
      <DesignMenu></DesignMenu>
    </template>
  </ContentLayout>
</template>
<script>
import ContentLayout from "./ContentLayout";
import DesignMenu from "../components/DesignMenu.vue";
export default {
  components: {
    ContentLayout,
    DesignMenu,
  },
};
</script>
