<template>
  <div id="app" style="height: 25vh">
    <div class="center container">
      <FeatherButton
        id="button"
        primary
        @click="visible = true"
        :aria-expanded="visible ? 'true' : 'false'"
        style="margin-bottom: 75rem"
        >Open Dialog</FeatherButton
      >
      <p>Dialog Is Open: {{ visible }}</p>
    </div>

    <FeatherDialog v-model="visible" @shown="onShown" :labels="labels">
      <template v-slot:icon>
        <FeatherIcon
          :icon="icon"
          aria-hidden="true"
          focusable="false"
          class="fill"
        />
      </template>
      <div class="my-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a urna
        ut orci congue eleifend porttitor ut lorem. Phasellus non commodo est.
        Pellentesque ullamcorper dolor purus, sed semper ipsum scelerisque vel.
        <FeatherDateInput
          v-model="test"
          label="Appointment Date"
          background
          class="my-date"
        ></FeatherDateInput>
      </div>
      <template v-slot:footer>
        <FeatherButton text @click="visible = false">Cancel</FeatherButton>
        <FeatherButton primary @click="visible = false">Save</FeatherButton>
      </template>
    </FeatherDialog>
  </div>
</template>
<script lang="ts">
import * as components from "../src";
import { FeatherButton } from "@featherds/button";
import { FeatherIcon } from "@featherds/icon";
import Warning from "@featherds/icon/notification/Warning";
import { defineComponent } from "vue";
import { FeatherDateInput } from "@featherds/date-input";

export default defineComponent({
  data: () => ({
    visible: false,
    test: undefined,
    labels: {
      title: "A Dialog",
      close: "Close",
    },
  }),
  methods: {
    onShown() {
      console.log("shown!!");
    },
  },
  computed: {
    icon() {
      return Warning;
    },
  },
  components: {
    ...components,
    FeatherButton,
    FeatherIcon,
    FeatherDateInput,
  },
});
</script>
<style scoped>
.my-content {
  width: 25rem;
}
</style>
