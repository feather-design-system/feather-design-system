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
import { FeatherToggleButton } from "@featherds/toggle-button";
import Info from "@featherds/icon/action/Info";
import Options from "@featherds/icon/action/Options";
import Apps from "@featherds/icon/navigation/Apps";

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
  { id: "1", icon: Info },
  { id: "2", icon: Options },
  { id: "3", icon: Apps },
];
</script>

<style>
div.toggle-demo {
  padding-top: 0.5em;
  display: block;
  height: 5em;
}
</style>
