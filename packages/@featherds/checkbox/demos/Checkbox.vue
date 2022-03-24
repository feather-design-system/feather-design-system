<template>
  <div>
    <h2>Heading</h2>
    <feather-checkbox
      id="subscribe"
      v-model="subscribe"
      :disabled="disable"
      @click="alert"
    >
      Subscribe
    </feather-checkbox>
    <div>
      <feather-checkbox id="disable" v-model="disable">
        Disable Previous Checkbox
      </feather-checkbox>
    </div>
  </div>
</template>
<script lang="ts">
import { FeatherCheckbox } from "../src";
import { defineComponent } from "vue";
export default defineComponent({
  data: function () {
    return {
      subscribe: false,
      disable: false,
    };
  },
  methods: {
    alert() {
      alert("test");
    },
  },
  components: {
    FeatherCheckbox,
  },
});
</script>
