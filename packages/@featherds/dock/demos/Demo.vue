<template>
  <FeatherDock
    id="my-dock"
    @update:dock-expanded="requestDockExpansion"
    @update:dock-collapsed="console.log('dock collapsed')"
  >
    <template #docked>
      <FeatherIcon
        id="feather-dock-demo-icon"
        :icon="markRaw(Home)"
        @click="requestDockExpansion()"
      >
      </FeatherIcon>
    </template>
  </FeatherDock>
  <main id="feather-dock-demo-main-content">
    <h1>Dock Demo</h1>
    <p>
      This is a demo of the Feather Dock component. The dock can be expanded or
      collapsed, and it can contain various components. Lorem ipsum dolor sit
      amet consectetur adipisicing elit. Corporis nihil sapiente laborum
      aperiam, dolore dolores quae iure facere, autem sed reiciendis, similique
      eum quasi repudiandae veniam qui quidem voluptas ipsa.
    </p>
    <FeatherSelect
      id="feather-dock-demo-select"
      label="Select a timing function"
      placeholder="Choose an option"
      textProp="label"
      :options="timingFunctions"
      :modelValue="timingFn"
      @update:modelValue="handleTimingFnChange"
    >
    </FeatherSelect>
    <p>
      To override timing function in your application, you can set the CSS to
      the following:
    </p>
    <pre>
        #&lt;your-dock-id-here&gt;.feather-dock {
          --feather-dock-toggle-timing-fn: {{ timingFn.fn }};
        }
    </pre>
    <p>
      Brian... We should think about picking a few of our favorite timing
      functions and give them a name and expose them as feather variables.
    </p>
  </main>
</template>

<script lang="ts" setup>
import { inject, markRaw, ref } from "vue";
import { FeatherDock } from "@featherds/dock";
import { FeatherSelect } from "@featherds/select";
import { FeatherIcon } from "@featherds/icon";
import Home from "@featherds/icon/action/Home";
import { ISelectItemType } from "@featherds/select";

const timingFn = ref<ISelectItemType>({
  label: "ease-out Brian",
  fn: "cubic-bezier(0, 0.8, 0.4, 1)",
});

const timingFunctions = [
  { label: "ease-in-out", fn: "ease-in-out" },
  { label: "ease-in", fn: "ease-in" },
  { label: "ease-out", fn: "ease-out" },
  { label: "ease-out Brian", fn: "cubic-bezier(0, 0.8, 0.4, 1)" },
  { label: "ease-out", fn: "ease-out" },
  { label: "fast, snap late", fn: "cubic-bezier(0.06, 1.78, 0.8, 0.68)" },
  { label: "hard bounce", fn: "cubic-bezier(0.06, 1.78, 0.13, 0.43)" },
  { label: "wee bounce", fn: "cubic-bezier(0.26, 1.57, 0.15, 0.79)" },
  { label: "overshot", fn: "cubic-bezier(0.06, 1.78, 0.8, 0.82)" },
  { label: "warp", fn: "cubic-bezier(0.01, 1.13, 0.21, 0.93)" },
];

const handleTimingFnChange = (value: ISelectItemType | undefined) => {
  if (!value) {
    console.warn("No timing function selected");
    return;
  }
  timingFn.value = value;
};

// Components that need to request expansion can do so
const requestDockExpansion = inject("requestDockExpansion", () => {
  // fallback
  console.log("dock expanded");
  // feather components like PanelBar can request dock expansion when they are opened
  // by calling this function.  This function is overridden in panel-bar to open the dock
  // when any panel is opened.  Other components can override this function to open the dock
  // as well.
  // requestDockExpansion();
});
</script>
<style>
#my-dock.feather-dock {
  --feather-dock-toggle-timing-fn: v-bind(timingFn.fn), ease-in-out;
  --feather-dock-toggle-top: 3rem;
  --feather-dock-content-padding-top: 6rem;
}
#feather-dock-demo-main-content {
  display: grid;
  grid-template-columns: auto;
  justify-items: center;
  gap: 1rem;
}
</style>
