<template>
  <section>
    <FeatherSelect
      class="my-select"
      label="State"
      :options="states"
      v-model="state"
      clear="Clear Selection"
    >
      <template v-slot:pre>
        <FeatherIcon :icon="Place" />
      </template>
    </FeatherSelect>
  </section>
</template>
<script>
import states from "./states";
import { FeatherSelect } from "@featherds/select";
import { FeatherIcon } from "@featherds/icon";
import Place from "@featherds/icon/actions/Location";
import { markRaw } from "vue";
export default {
  data() {
    return { states, state: undefined, Place: markRaw(Place) };
  },
  components: {
    FeatherSelect,
    FeatherIcon,
  },
};
</script>
<style lang="scss" scoped>
.my-select {
  width: 400px;
}
</style>
