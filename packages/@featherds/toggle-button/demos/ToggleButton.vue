<template class="toggle-button-demo">
  <section>
    <div class="toggle-button-scenario">
      <h2>Labels</h2>
      <FeatherToggleButton
        :id="tbLabelOnlyId"
        :buttons="buttons"
      ></FeatherToggleButton>
    </div>
    <div class="toggle-button-scenario">
      <h2>Icons</h2>
      <FeatherToggleButton
        id="tbIconOnlyId"
        :buttons="icons"
        :selected="2"
      ></FeatherToggleButton>
    </div>
    <div class="toggle-button-scenario">
      <h2>Disabled</h2>
      <FeatherToggleButton
        id="tbDisabled"
        :buttons="disabled"
      ></FeatherToggleButton>
    </div>
    <div class="toggle-button-scenario">
      <h2>Muted Selected Color</h2>
      <FeatherToggleButton
        id="tbMuted"
        :buttons="muted"
        :muted="true"
      ></FeatherToggleButton>
    </div>
    <div class="toggle-button-scenario">
      <h2>Icons and Labels</h2>
      <sup>NOT ALLOWED: Specifying both will only render Icon</sup>
      <br />
      <FeatherToggleButton
        id="tbBothId"
        :buttons="both"
        :selected="1"
      ></FeatherToggleButton>
    </div>
  </section>
</template>

<script lang="ts" setup>
import Info from "@featherds/icon/action/Info";
import Options from "@featherds/icon/action/Options";
import Apps from "@featherds/icon/navigation/Apps";
import Calendar from "@featherds/icon/action/Calendar";
import { ToggleButton } from "../src/components/types";
import { FeatherToggleButton } from "./../src";
import { DefineComponent } from "vue";

const info = () => {
  return Info as any;
};

const options = () => {
  return Options as any;
};

const apps = () => {
  return Apps as DefineComponent;
};

const tbLabelOnlyId = "togglebtn";

const buttons: ToggleButton[] = [
  { id: "0", label: "Left Section" },
  { id: "1", label: "Middle Section" },
  { id: "2", label: "Right Section" },
  { id: "3", label: "Section Way Too Long", disabled: true },
];
const icons: ToggleButton[] = [
  { id: "0", icon: info() },
  { id: "1", icon: options() },
  { id: "2", icon: apps() }
];

const disabled: ToggleButton[] = [
  { id: "0", icon: info(), disabled: true },
  { id: "1", icon: options(), disabled: true },
  { id: "2", icon: apps(), disabled: true }
];
const muted: ToggleButton[] = [
  { id: "0", label: 'Color Variable' },
  { id: "1", label: 'Missing' },
  { id: "2", label: 'From Figma' }
];

const both: ToggleButton[] = [
  { id: "0", label: '3 months', icon: Calendar, disabled: true },
  { id: "1", label: '6 months', icon: Calendar },
  { id: "2", label: '9 months', icon: Calendar }
];

</script>

<style lang="scss" scoped>
.toggle-button-demo {
  display: inline-flex;
  background-color: var(--feather-surface);
}

.toggle-button-scenario {
  padding: 0.5rem 2rem;
}
</style>
