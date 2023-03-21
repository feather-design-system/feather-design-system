<template>
  <h1>Colors</h1>
  <section>
    <div
      v-for="(item, index) in colorSet"
      :key="colorSetKeys[index]"
      :class="colorSetKeys[index]"
    >
      <h4>{{ item.title }}</h4>
      <div
        v-for="color in item.arr"
        :key="color"
        :class="color"
        class="status-color focus"
        @click="showColor($event)"
      >
        <span
          :class="color"
          class="status-color-text focus"
          @hover.stop="showColor($event)"
          >${{ color }}</span
        >
        <span :class="color" class="hex" @click="hideColor($event)"></span>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { nextTick, ref } from "vue";
// let existingColors = ["error", "warning", "success"];
let newColors = [
  "success",
  "error",
  "major",
  "minor",
  "warning",
  "indeterminate",
  "cleared",
  "ready",
];
const categoricalColors = [
  "categorical1",
  "categorical2",
  "categorical3",
  "categorical4",
  "categorical5",
  "categorical6",
  "categorical7",
  "categorical8",
  "categorical9",
  "categorical10",
];

const colorSet = [
  { title: "New", arr: newColors },
  // { title: "Existing", arr: existingColors },
  { title: "Chart", arr: categoricalColors },
];

const colorSetKeys = ref<string[]>([]);
colorSet.forEach((item) => {
  colorSetKeys.value.push(item.title + "light");
});

const hexVal = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
];
const regex = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;

const themeObserver = new MutationObserver((event) => {
  const [e1] = event;
  forceRerender();
});

themeObserver.observe(document.querySelector("body")!, { attributes: true });

const forceRerender = async () => {
  colorSet.forEach((item, index) => {
    const currentKey = item.title;
    const newTheme = colorSetKeys.value[index].includes("dark")
      ? "light"
      : "dark";
    colorSetKeys.value.splice(index, 1, `${currentKey}${newTheme}`);
  });
  await nextTick();
};

const showColor = (e: MouseEvent) => {
  const { target } = e;
  const el = target as Element;

  // find associated status-color element
  const statusColorEl = el.closest(".status-color")
    ? el.closest(".status-color")
    : el.querySelector(".status-color");

  // find associated status-color-text element
  const statusColorTextEl = el.closest(".status-color-text")
    ? el.closest(".status-color-text")
    : el.querySelector(".status-color-text");

  if (!statusColorEl || !statusColorTextEl) return;
  // find associated hex element
  const hexEl = statusColorEl.closest(".hex")
    ? statusColorEl.closest(".hex")
    : statusColorEl.querySelector(".hex");

  if (!hexEl) return;

  const classList = el.classList;
  if (classList.contains("hex")) {
    hexEl.innerHTML = "";
  } else if (classList.contains("status-color")) {
    // show bg color
    const color = window.getComputedStyle(statusColorEl).backgroundColor;
    const hex = convertRgbToHex(color);
    if (hex) hexEl.innerHTML = hex;
  } else if (classList.contains("status-color-text")) {
    // show color
    const color = window.getComputedStyle(statusColorTextEl).color;
    const hex = convertRgbToHex(color);
    if (hex) hexEl.innerHTML = hex;
  }
};

const hideColor = (e: MouseEvent) => {
  const { target } = e;
  const el = target as Element;
  el.innerHTML = "";
};

const convertRgbToHex = (color: string) => {
  const match = regex.exec(color);
  if (match) {
    const [, r, g, b] = match;
    return `#${numToHex(+r)}${numToHex(+g)}${numToHex(+b)}`;
  }
};

const numToHex = (val: number) => {
  const pos1 = Math.floor(val / 16);
  const pos2 = val % 16;
  return `${hexVal[+pos1]}${hexVal[+pos2]}`;
};
</script>

<style lang="scss">
@import "@featherds/styles/themes/variables";

section {
  background-color: var($surface);
  display: flex;
  padding: 1em;
  margin-top: 1.5em;
}

.status-color {
  padding: 5px;
  margin-right: 1em;
  text-align: left;
  width: 25em;

  &:hover {
    cursor: default;
  }

  .status-color-text {
    color: var($primary-text-on-color);
  }

  .hex {
    background: var($surface);
    padding: 0 0.5rem 0 0.5rem;
    border-radius: 3px;
    float: right;

    &:hover {
      cursor: default;
    }
  }
}

.error {
  background: var($error);
}

.success {
  background: var($success);
}

.major {
  background: var($major);
}

.minor {
  .status-color-text {
    color: var($primary-text-on-warning);
  }

  background: var($minor);
}

.warning {
  .status-color-text {
    color: var($primary-text-on-warning);
  }

  background: var($warning);
}

.indeterminate {
  background: var($indeterminate);
}

.cleared {
  background: var($cleared);
}

.ready {
  background: var($ready);
}
.categorical1 {
  background: var($categorical1);
}
.categorical2 {
  background: var($categorical2);
}
.categorical3 {
  background: var($categorical3);
}
.categorical4 {
  background: var($categorical4);
}
.categorical5 {
  background: var($categorical5);
}
.categorical6 {
  background: var($categorical6);
}
.categorical7 {
  background: var($categorical7);
}
.categorical8 {
  background: var($categorical8);
}
.categorical9 {
  background: var($categorical9);
}
.categorical10 {
  background: var($categorical10);
}
</style>
