<template>
  <div class="feather-panel-bar" role="region" :aria-labelledby="id">
    <div v-if="header" class="feather-panel-bar-header">
      {{ title }}
    </div>
    <!-- @vue-ignore -->
    <details
      v-for="(panel, index) in items"
      class="feather-panel-bar-details"
      :key="index"
      :id="`panel-${panel.id || index}`"
      :name="mode === 'single' ? id : panel.id"
      @toggle="handleToggle($event, panel)"
    >
      <summary
        :id="`feather-panel-bar-summary-${panel.id || index}`"
        class="feather-panel-bar-summary"
        :aria-controls="`feather-panel-bar-content-${panel.id || index}`"
        :aria-expanded="isOpen(panel.id).value"
      >
        <span class="icon-and-title">
          <span v-if="panel.icon" class="icon">
            <FeatherIcon :icon="panel.icon" />
          </span>
          <span class="title">{{ panel.title }}</span>
        </span>
        <span class="expand">
          <FeatherIcon :icon="ExpandMore" />
        </span>
      </summary>
      <div class="feather-panel-bar-content">
        <component :is="panel.component"></component>
        <div>{{ panel.content }}</div>
      </div>
    </details>
    <div v-if="footer" class="feather-panel-bar-footer"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref } from "vue";
import { FeatherIcon } from "@featherds/icon";
import ExpandMore from "@featherds/icon/navigation/ExpandMore";
import { Panel } from "./types";

const openPanelIds = ref<Set<string>>(new Set());

const isOpen = (panelId: string) =>
  computed(() => {
    return openPanelIds.value.has(panelId);
  });

defineProps({
  id: {
    type: String as PropType<string>,
    required: true,
  },
  mode: {
    type: String as PropType<"single" | "multi">,
    required: false,
    default: "single",
  },
  title: {
    type: String as PropType<string | null>,
    required: false,
  },
  items: {
    type: Array as PropType<Panel[]>,
    required: true,
  },
  icon: {
    type: Object as PropType<typeof FeatherIcon>,
    required: false,
  },
  header: {
    type: Boolean as PropType<boolean>,
    required: false,
  },
  footer: {
    type: Boolean as PropType<boolean>,
    required: false,
  },
});
const emit = defineEmits(["toggle"]);

const handleToggle = (e: Event, panel: Panel) => {
  const details = e.target as HTMLDetailsElement;
  if (details.open) {
    openPanelIds.value.add(panel.id);
  } else {
    openPanelIds.value.delete(panel.id);
  }
  emit("toggle", e, panel.id, details.open, panel.title);
};
</script>
<style lang="scss">
@import "@featherds/styles/themes/variables";

.feather-panel-bar {
  // overridable feather-panel-bar-details component variables
  --feather-panel-bar-title-font-size: var(--feather-headline4-font-size);
  --feather-panel-bar-title-font-weight: var(--feather-headline4-font-weight);
  --feather-panel-bar-title-line-height: var(--feather-headline4-line-height);

  --feather-panel-bar-panel-title-font-size: var(
    --feather-body-small-font-size
  );
  --feather-panel-bar-panel-title-font-weight: var(
    --feather-body-small-font-weight
  );
  --feather-panel-bar-panel-title-line-height: var(
    --feather-body-small-line-height
  );
}
</style>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/themes/utils";
@import "@featherds/styles/mixins/typography";

.feather-panel-bar {
  --transition-speed: 0.375s;
  --border-width: 1px;
  --border-radius: 0;
  width: clamp(320px, 80%, 1280px);
  box-shadow: var($shadow-2);
  border-radius: var(--border-radius);

  .feather-panel-bar-header,
  .feather-panel-bar-footer {
    @include headline4();
    background-color: alpha($primary, 0.06);
    padding: 0.5rem 1.5rem;
    font-size: var(--feather-panel-bar-title-font-size);
    font-weight: var(--feather-panel-bar-title-font-weight);
    line-height: var(--feather-panel-bar-title-line-height);
  }

  .feather-panel-bar-details {
    // scss-lint:disable-next-line unknown-property
    interpolate-size: allow-keywords;
    padding: 0 1.5rem;
    overflow: hidden;
    outline: 0.125px solid transparent;
    border: var(--border-width) solid transparent;
    border-top: var(--border-width) solid var($shade-4);

    &:hover {
      border: var(--border-width) solid var($shade-2);
      summary {
        cursor: pointer;
      }
    }
    &:nth-child(1) {
      border-radius: var(--border-radius) var(--border-radius) 0 0;
    }
    &:last-child {
      border-radius: 0 0 var(--border-radius) var(--border-radius);
    }

    .feather-panel-bar-summary {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 3rem;
      @include body-small();
      .icon-and-title {
        display: flex;
        align-items: center;
        .icon {
          font-size: 1.5rem;
          margin-right: 0.5em;
        }
        .title {
          font-size: var(--feather-panel-bar-panel-title-font-size);
          font-weight: var(--feather-panel-bar-panel-title-font-weight);
          line-height: var(--feather-panel-bar-panel-title-line-height);
        }
      }
      .expand {
        font-size: 1.25rem;
        align-self: center;
        .feather-icon {
          transition: transform var(--transition-speed) ease;
        }
      }
      list-style: none;
      &::marker {
        display: none;
      }
      &:focus-visible,
      &:focus {
        color: var($primary);
        outline: none;
      }
    }
    .feather-panel-bar-content {
      display: grid;
      grid-template-rows: 0fr;
      padding: 0.5rem 0 1.25rem;
      will-change: grid-template-rows, opacity;
      opacity: 0;
      transition: grid-template-rows var(--transition-speed) ease-out,
        opacity var(--transition-speed) ease-in-out;
      height: auto;
      width: 100%;
    }
    &::details-content {
      height: 0;
      transition: height var(--transition-speed) ease-out,
        content-visibility var(--transition-speed) ease-out;
      transition-behavior: allow-discrete;
    }
    &[open] {
      &::details-content {
        height: auto;
      }
      summary {
        .expand {
          .feather-icon {
            transform: rotate(-180deg);
          }
        }
      }
      .feather-panel-bar-content {
        grid-template-rows: auto;
        opacity: 1;
      }
    }
  }
}
</style>
