<template>
  <div>
    <FeatherButton
      id="button"
      primary
      @click="visible = true"
      :aria-expanded="visible ? 'true' : 'false'"
      >Open Dialog</FeatherButton
    >
    <FeatherDialog v-model="visible" :labels="labels">
      <p class="my-content">A message from the Dialog</p>
      <template v-slot:footer>
        <FeatherButton primary @click="visible = false"
          >Close Dialog</FeatherButton
        >
      </template>
    </FeatherDialog>
  </div>
</template>
<script>
import { FeatherDialog } from "@featherds/dialog";
import { FeatherButton } from "@featherds/button";
export default {
  data: () => ({
    visible: false,
    labels: {
      title: "A Dialog",
      close: "Close",
    },
  }),
  components: {
    FeatherDialog,
    FeatherButton,
  },
};
</script>
<style lang="scss" scoped>
.my-content {
  width: 25rem;
}
</style>
