<template>
  <section>
    <div>
      <h2>Text</h2>
      <div>
        <FeatherBadge :badges="error">Documents</FeatherBadge>
      </div>
      <div>
        <FeatherBadge :badges="info">Documents</FeatherBadge>
      </div>
      <div>
        <FeatherBadge :badges="badges">Documents</FeatherBadge>
      </div>
    </div>
    <div>
      <h2>Icons</h2>
      <div>
        <FeatherBadge :badges="error"
          ><FeatherIcon :icon="icon" class="icon"
        /></FeatherBadge>
      </div>
      <div>
        <FeatherBadge :badges="info">
          <FeatherIcon :icon="icon" class="icon" />
        </FeatherBadge>
      </div>
      <div>
        <FeatherBadge :badges="badges">
          <FeatherIcon :icon="icon" class="icon"
        /></FeatherBadge>
      </div>
    </div>

    <div>
      <h2>Text Inline</h2>
      <div>
        <FeatherBadge :badges="error" inline>Documents</FeatherBadge>
      </div>
      <div>
        <FeatherBadge :badges="info" inline>Documents</FeatherBadge>
      </div>
      <div>
        <FeatherBadge :badges="badges" inline>Documents</FeatherBadge>
      </div>
    </div>
  </section>
</template>
<script>
import { FeatherBadge, TYPES } from "./../src";
import { FeatherIcon } from "@featherds/icon";
import Icon from "@featherds/icon/medical/Drug";
import { markRaw } from "vue";

export default {
  data() {
    const error = {
      type: TYPES.ERROR,
      title: "Error has occurred",
    };
    const info = {
      type: TYPES.INFO,
      title: "Issue has occurred",
    };
    return {
      badges: [error, info],
      error,
      info,
      icon: markRaw(Icon),
    };
  },

  components: {
    FeatherBadge,
    FeatherIcon,
  },
};
</script>

<style lang="scss" scoped>
.icon {
  font-size: 24px;
}
</style>
