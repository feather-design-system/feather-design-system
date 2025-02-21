<template>
  <section class="all-icons">
    <div class="feather-row">
      <div class="feather-col-3">
        <FeatherInput label="Search Icons" v-model="search" clear />
      </div>
    </div>
    <div class="instruction-banner">
      <img
        :src="getFeatherSrc(getBannerIcon())"
        class="info-icon"
      />
      <span>
        Click any icon below to copy its import statement to the clipboard
      </span>
    </div>
    <h3>Feather Icons</h3>
    <div v-if="!featherIcons.length">No matches</div>
    <div v-for="group in featherIcons" :key="'feather' + group.group">
      <h4>{{ group.group }}</h4>
      <ul>
        <li
          v-for="icon in group.icons"
          :key="'feather' + icon.group + icon.name"
          @click="copyImportToClipboard(icon)"
          @keydown="handeKeydown($event, icon)"
          class="icon-item"
          :class="{
            'copy-active': activeIcon === `${icon.group}-${icon.name}`,
          }"
          tabindex="0"
        >
          <img
            :src="getFeatherSrc(icon)"
            :key="'feather-img' + icon.group + icon.name"
            class="icon"
            :tooltip="`click to copy import for ${icon.name}`"
          />

          <span class="icon-name" :title="icon.name">{{ icon.name }} </span>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
import { FeatherIcon } from "@featherds/icon";
import { FeatherInput } from "@featherds/input";
import Info from "@featherds/icon/action/Info";
import data from "./icons.json";
export default {
  data() {
    return {
      search: "",
      feather: data.feather,
      activeIcon: null,
    };
  },
  computed: {
    featherIcons() {
      const filtered = this.feather.map((x) => {
        return {
          ...x,
          icons: x.icons.filter(
            (i) => i.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
          ),
        };
      });
      return filtered.filter((x) => x.icons.length > 0);
    },
  },
  methods: {
    getFeatherSrc(icon) {
      return this.$withBase(
        `/assets/Packages/Icon/${icon.group}Feather${icon.name}.svg`
      );
    },
    getBannerIcon() {
      const actionGroup = this.feather.find((x) => x.group === "action");
      if (actionGroup) {
        const infoIcon = actionGroup.icons.find((i) => i.name === "Info");
        return infoIcon;
      }
      return ""; // fallback if icon not found
    },
    copyImportToClipboard(icon) {
      const text = `import ${icon.name} from "@featherds/icon/${icon.group}/${icon.name}";`;
      navigator.clipboard.writeText(text);

      this.activeIcon = `${icon.group}-${icon.name}`;
      setTimeout(() => {
        this.activeIcon = null;
      }, 1000 - 50); // 50ms less than the animation duration
    },
    handeKeydown(event, icon) {
      if (event.keyCode === 13 || event.keyCode === 32) {
        event.preventDefault();
        this.copyImportToClipboard(icon);
      }
    },
  },
  components: {
    FeatherIcon,
    FeatherInput,
  },
};
</script>
<style>
.open-dark .all-icons img {
  filter: invert(96%) sepia(1%) saturate(926%) hue-rotate(144deg)
    brightness(111%) contrast(100%);
}

.open-light .all-icons img {
  filter: invert(0%) sepia(100%) saturate(7500%) hue-rotate(59deg)
    brightness(89%) contrast(111%);
}
</style>
<style scoped lang="scss">
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/themes/variables";
ul {
  padding: 0;
  margin: 0;
  list-style: none;
  li {
    position: relative; // Required for copy
    overflow: hidden; // Required for copy

    display: inline-block;
    font-size: 1.5rem;
    color: var($secondary-text-on-surface);
    text-align: center;
    width: 9.375rem;
    padding: 0.5rem;
    transition: background-color 1s;

    &:hover {
      background-color: var($background);
      border-radius: 0.5rem;
    }

    &::after {
      content: "copied";
      position: absolute;
      top: 50%;
      left: 30%;
      opacity: 0;
      transform: scale(1, 1) translate(-50%, -50%);
      transform-origin: 50% 50%;
      pointer-events: none;
    }

    &.copy-active::after {
      opacity: 1;
      background-color: var(--feather-surface);
      color: var(--feather-primary-text-on-surface);
      animation: copy 1s ease-out;
    }

    img {
      height: 3rem;
      width: 3rem;
    }
    .icon-name {
      @include caption();
      color: var($secondary-text-on-surface);
      display: block;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
.instruction-banner {
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 0.5rem;
  background: var($surface);
  border-radius: 4px;

  .info-icon {
    // color: var($primary);
    height: 1rem;
    width: auto;
  }

  span {
    @include caption();
    color: var($primary-text-on-surface);
  }
}

@keyframes copy {
  0% {
    transform: scale(0.25, 0.25) translate(100%, -100%);
    opacity: 1;
  }
  100% {
    transform: scale(1, 1) translate(-5%, 50%);
    opacity: 0;
  }
}
</style>
