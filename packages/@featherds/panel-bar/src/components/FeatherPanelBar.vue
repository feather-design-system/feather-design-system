<template>
  <div
    :id="id"
    :class="panelBarClasses"
    role="region"
    :aria-labelledby="id"
    ref="panelBarRef"
  >
    <div v-if="header" class="feather-panel-bar-header">
      <FeatherIcon
        v-if="!isDockCollapsed && props.icon"
        :icon="props.icon"
      ></FeatherIcon>
      {{ !isDockCollapsed && props.title ? props.title : "" }}
    </div>
    <details
      v-for="(panel, index) in props.items"
      class="feather-panel-bar-details hover focus"
      :key="index"
      :id="`panel-${panel.id || index}`"
      :name="props.mode === 'single' ? props.id : panel.id"
      @toggle="handlePanelToggle($event, panel)"
    >
      <summary
        :id="`feather-panel-bar-summary-${panel.id || index}`"
        class="feather-panel-bar-summary"
        :aria-controls="`feather-panel-bar-content-${panel.id || index}`"
        :aria-expanded="isPanelOpen(panel.id).value"
      >
        <span class="summary">
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
        <component
          v-if="panel.component"
          :is="panel.component"
          v-bind="panel.componentProps || {}"
        />
        <div>{{ panel.content }}</div>
      </div>
    </details>
    <div v-if="footer" class="feather-panel-bar-footer"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, PropType, ref } from "vue";
import { FeatherIcon } from "@featherds/icon";
import ExpandMore from "@featherds/icon/navigation/ExpandMore";
import type { Panel } from "./types";
import { useDock } from "@featherds/composables/dock/useDock";

const props = defineProps({
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
const emit = defineEmits(["panel-toggle"]);

const panelBarRef = ref<HTMLElement | undefined>(undefined);

// #region DockConfig (use composable)
const { dockConfig, isDocked, isDockCollapsed } = useDock({
  onDockClosed: () => {
    if (!panelBarRef.value) return;
    const openDetails = panelBarRef.value.querySelectorAll("details[open]");
    openDetails.forEach((details) => details.removeAttribute("open"));
  },
});

const requestDockExpansion = inject<() => void>("requestDockExpansion", () => {
  if (dockConfig.value.location !== "none") {
    console.log("requestDockExpansion not provided");
  }
});

// #endregion

const panelBarClasses = computed(() => {
  return {
    "feather-panel-bar": true,
    docked: isDocked.value,
    "dock-closed": isDocked.value && isDockCollapsed.value,
  };
});

const openPanelIds = ref<Set<string>>(new Set());

const isPanelOpen = (panelId: string) =>
  computed(() => {
    return openPanelIds.value.has(panelId);
  });

const handlePanelToggle = (e: Event, panel: Panel) => {
  const details = e.target as HTMLDetailsElement;
  if (details.open) {
    openPanelIds.value.add(panel.id);
    requestDockExpansion();
  } else {
    openPanelIds.value.delete(panel.id);
  }
  emit("panel-toggle", e, openPanelIds.value);
};
</script>

<style lang="scss">
/* NON-SCOPED SO OVERRIDABLE PROPERTIES CAN BE OVERRIDEN */
.feather-panel-bar {
  --feather-panel-bar-background-color: inherit;
  --feather-panel-bar-color: inherit;
  // Panel Bar Title
  --feather-panel-bar-title-font-size: var(--feather-headline4-font-size);
  --feather-panel-bar-title-font-weight: var(--feather-headline4-font-weight);

  // Panel Bar Panel Title
  --feather-panel-bar-panel-title-font-size: var(
    --feather-body-small-font-size
  );
  --feather-panel-bar-panel-title-font-weight: var(
    --feather-body-small-font-weight
  );
}
</style>

<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/themes/utils" as utils;
@use "@featherds/styles/mixins/typography" as typo;

.feather-panel-bar {
  --transition-speed: 0.375s;
  --border-width: 1px;
  --border-radius: 0;
  display: flex;
  flex-direction: column;

  width: 100%; // fits to parent
  max-width: 100%; // but not more
  box-shadow: var(vars.$shadow-2);
  border-radius: var(--border-radius);
  background-color: var(--feather-panel-bar-background-color);
  color: var(--feather-panel-bar-color);

  & > .feather-panel-bar-header,
  & > .feather-panel-bar-footer {
    @include typo.headline4();
    background-color: var(--feather-panel-bar-background-color);
    color: var(--feather-panel-bar-color);
    padding: 0.5rem 1.5rem;
    font-size: var(--feather-panel-bar-title-font-size);
  }

  & > .feather-panel-bar-details {
    @include utils.state-on-surface();

    interpolate-size: allow-keywords;
    width: auto;
    overflow: hidden;
    outline: 1px solid transparent;
    border: var(--border-width) solid transparent;
    border-top: var(--border-width) solid var(vars.$shade-4);
    background-color: var(--feather-panel-bar-background-color);

    &:focus-within,
    &:hover {
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
      user-select: none;
      padding-inline: 0.5rem;

      @include typo.body-small();
      .summary {
        display: flex;
        align-items: center;
        .icon {
          font-size: 1.5rem;
          margin-right: 0.5em;
        }
        .title {
          font-size: var(--feather-panel-bar-panel-title-font-size);
          font-weight: var(--feather-panel-bar-panel-title-font-weight);
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
      scrollbar-color: transparent transparent; // prevent scrollbar flashing
      padding-inline: 0.5rem;
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
      .feather-panel-bar-summary {
        @include utils.state-on-surface();
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
  &.docked {
    box-shadow: none;
    .feather-panel-bar-details {
      border: 1px solid transparent;
    }
  }
  &.docked.dock-closed {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;

    box-shadow: none;
    .feather-panel-bar-details {
      .feather-panel-bar-summary {
        @include utils.state-on-surface();
        .summary {
          justify-content: center;
          align-items: center;
          .icon {
            margin: 0;
            padding: 0.5rem;
          }
          .title {
            display: none;
          }
        }
        .expand {
          display: none;
        }
      }
    }
    .feather-panel-bar-header,
    .feather-panel-bar-footer {
      display: none;
    }
  }
}
</style>
