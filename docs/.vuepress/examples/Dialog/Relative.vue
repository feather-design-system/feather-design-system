<template>
  <div>
    <FeatherButton
      primary
      @click="visible = true"
      :aria-expanded="visible ? 'true' : 'false'"
      >Open Dialog</FeatherButton
    >
    <div class="relative-demo">
      <div style="height: 200%">
        <FeatherDialog v-model="visible" relative :labels="labels">
          <p class="my-content">A message from the Relative Dialog</p>
          <template v-slot:footer>
            <FeatherButton primary @click="visible = false">Save</FeatherButton>
          </template>
        </FeatherDialog>
      </div>
    </div>
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
<style>
.my-content {
  width: 25rem;
}
.relative-demo {
  width: 37.5rem;
  height: 37.5rem;
  position: relative;
  overflow-y: auto;
}
</style>
