<template>
  <div class="error-container">
    <div class="error-icon">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        width="180"
        height="280"
        viewBox="0 0 180 280"
      >
        <g>
          <g opacity="0.18">
            <g>
              <path
                d="M172.66,50.93,125.23,3.51h0a5.37,5.37,0,0,0-.51-.44l-.14-.1a4.15,4.15,0,0,0-.57-.35l0,0-.57-.25-.16-.05a3.58,3.58,0,0,0-.64-.18h0a4.81,4.81,0,0,0-.65-.08H11A5.15,5.15,0,0,0,5.87,7.15V228.64A5.14,5.14,0,0,0,11,233.79H169a5.14,5.14,0,0,0,5.15-5.15V55.14A5.13,5.13,0,0,0,172.66,50.93ZM126.74,19.6l29.78,29.82H126.74ZM16.17,223.49V12.3H116.44V54.58a5.16,5.16,0,0,0,5.15,5.15h42.24V223.49Z"
              />
              <path
                d="M122.16,151.92H57.84A12.9,12.9,0,0,0,45,164.8v2.63a3.44,3.44,0,0,0,6.87,0V164.8a6,6,0,0,1,6-6h64.32a6,6,0,0,1,6,6v2.63a3.44,3.44,0,0,0,6.87,0V164.8A12.9,12.9,0,0,0,122.16,151.92Z"
              />
              <circle cx="56.98" cy="115.94" r="10.54" />
              <circle cx="123.02" cy="115.94" r="10.54" />
            </g>
            <ellipse cx="90" cy="264.96" rx="88.46" ry="13.04" />
          </g>
          <rect width="180" height="280" fill="none" />
        </g>
      </svg>
    </div>
    <div class="error-text">
      {{ text }}
    </div>
    <FeatherButton
      as-anchor
      primary
      :href="downloadUrl"
      download
      target="_blank"
    >
      <template v-slot:icon><FeatherIcon :icon="icon" /></template>
      {{ downloadText }}
    </FeatherButton>
  </div>
</template>
<script>
import { FeatherButton } from "@featherds/button";
import { FeatherIcon } from "@featherds/icon";

import icon from "@featherds/icon/actions/DownloadDocument";

export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    downloadText: {
      type: String,
      required: true,
    },
    downloadUrl: {
      type: String,
      required: true,
    },
  },
  computed: {
    icon: () => icon,
  },
  components: {
    FeatherButton,
    FeatherIcon,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/themes/variables";
.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.error-text {
  @include headline3;
  color: var($secondary-text-on-surface);
  margin-top: 32px;
  margin-bottom: 8px;
}
.error-icon {
  height: 280px;
  width: 180px;
  svg {
    fill: var($primary-text-on-surface);
  }
}
</style>
