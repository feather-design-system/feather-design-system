<template>
  <section>
    <FeatherSelect
      class="my-select"
      data-ref-id="test"
      label="State"
      background
      :options="states"
      v-model="state"
      :error="error"
    >
    </FeatherSelect>
    <div>
      <FeatherSelect
        class="my-select"
        label="State"
        background
        :options="states"
        v-model="state"
      >
        <template v-slot:pre><FeatherIcon :icon="icon"></FeatherIcon></template>
      </FeatherSelect>
    </div>
    <div>
      <FeatherSelect
        class="my-select"
        label="State"
        clear="Clear State"
        background
        :options="states"
        v-model="state"
      >
        <template v-slot:pre><FeatherIcon :icon="icon"></FeatherIcon></template>
      </FeatherSelect>
    </div>
    <div>
      <FeatherSelect
        class="my-select"
        label="State"
        clear="Clear State"
        error="Error"
        background
        :options="states"
        v-model="state"
      >
        <template v-slot:pre><FeatherIcon :icon="icon"></FeatherIcon></template>
      </FeatherSelect>
    </div>
    <div>
      <FeatherSelect
        class="my-select"
        label="State"
        clear="Clear State"
        error="Error"
        background
        :options="states"
        v-model="state"
        disabled
      >
        <template v-slot:pre><FeatherIcon :icon="icon"></FeatherIcon></template>
      </FeatherSelect>
    </div>
  </section>
</template>
<script>
import states from "./states";
import { FeatherIcon } from "@featherds/icon";
import Place from "@featherds/icon/action/Location";
import * as components from "./../src";
export default {
  data() {
    return { states, state: undefined, error: undefined, icon: Place };
  },
  mounted() {
    setTimeout(() => {
      console.log("done");
      this.error = "YYEYEYEY";
    }, 5000);
  },
  components: {
    ...components,
    FeatherIcon,
  },
};
</script>
<style lang="scss" scoped>
.my-select {
  width: 400px;
}
</style>
