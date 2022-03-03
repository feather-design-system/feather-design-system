<template>
  <section>
    <FeatherButton primary @click="show1 = true">Trigger Snackbar</FeatherButton
    ><br />
    <feather-checkbox v-model="center">Center</feather-checkbox>
    <feather-checkbox v-model="error">Error</feather-checkbox>

    <FeatherSnackbar v-model="show1" :center="center" :error="error">
      A notification
      <template v-slot:button>
        <FeatherButton @click="show1 = false" text>dismiss</FeatherButton>
      </template>
    </FeatherSnackbar>
  </section>
</template>
<script>
import { FeatherSnackbar } from "@featherds/snackbar";
import { FeatherButton } from "@featherds/button";
import { FeatherCheckbox } from "@featherds/checkbox";
export default {
  data() {
    return {
      show1: false,
      center: false,
      error: false
    };
  },
  methods: {},
  components: {
    FeatherSnackbar,
    FeatherButton,
    FeatherCheckbox,
  },
};
</script>
