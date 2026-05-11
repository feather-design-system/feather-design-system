<template>
  <section>
    <div class="toggle-demo">

      <FeatherToggleButton
        id="tb1"
        :buttons="buttons"
      >
      </FeatherToggleButton>
    </div>
  </section>
</template>
<script>
import {
  FeatherToggleButton,
} from "@featherds/toggle-button";
export default {
  components: {
    FeatherToggleButton,
  },
  data() {
    return {
      buttons,
    }
  },
};
const buttons = [
  { id: "1", label: "Left Section" },
  { id: "2", label: "Middle Section" },
  { id: "3", label: "Right Section" },
];
</script>

<style>
div.toggle-demo {
  padding-top: 0.5em;
  display: block;
  height: 5em;
}
</style>
