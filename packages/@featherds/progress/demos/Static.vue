<template>
  <div class="demo-container">
    <section class="linear">
      <FeatherProgressLinear :value="not0Value" :show-percentage="true" />
      <FeatherProgressLinear :value="twentyFiveValue" :show-percentage="true" />
      <FeatherProgressLinear :value="fiftyValue" :show-percentage="true" />
      <FeatherProgressLinear
        :value="seventyFiveValue"
        :show-percentage="true"
      />
      <FeatherProgressLinear :value="not100Value" :show-percentage="true" />
      <FeatherProgressLinear :value="oneHundredValue" :show-percentage="true" />
      <FeatherProgressLinear
        :value="oneHundredValue"
        :show-percentage="true"
        :error="errMsg"
      >
        <template #error> {{ errMsg }}</template>
      </FeatherProgressLinear>
    </section>
    <section class="circular">
      <h1>lg</h1>
      <FeatherProgressCircular
        :value="not0Value"
        :show-percentage="true"
        size="lg"
      />
      <FeatherProgressCircular
        :value="twentyFiveValue"
        :show-percentage="true"
        size="lg"
      />
      <FeatherProgressCircular
        :value="fiftyValue"
        :show-percentage="true"
        size="lg"
      />
      <FeatherProgressCircular
        :value="seventyFiveValue"
        :show-percentage="true"
        size="lg"
      />
      <FeatherProgressCircular
        :value="not100Value"
        :show-percentage="true"
        size="lg"
      />
      <FeatherProgressCircular
        :value="oneHundredValue"
        :show-percentage="true"
        size="lg"
      />
      <FeatherProgressCircular
        :value="not0Value"
        :show-percentage="true"
        size="lg"
        :error="errMsg"
      >
        <template #error>
          {{ errMsg }}
        </template>
      </FeatherProgressCircular>
    </section>
    <section class="circular">
      <h1>lg</h1>
      <FeatherProgressCircular :value="not0Value" size="lg" />
      <FeatherProgressCircular :value="twentyFiveValue" size="lg" />
      <FeatherProgressCircular :value="fiftyValue" size="lg" />
      <FeatherProgressCircular :value="seventyFiveValue" size="lg" />
      <FeatherProgressCircular :value="not100Value" size="lg" />
      <FeatherProgressCircular :value="oneHundredValue" size="lg" />
      <FeatherProgressCircular :value="not0Value" size="lg" :error="errMsg">
        <template #error>
          {{ errMsg }}
        </template>
      </FeatherProgressCircular>
    </section>
    <section class="circular">
      <h1>md</h1>
      <FeatherProgressCircular
        :value="not0Value"
        :show-percentage="true"
        size="md"
      />
      <FeatherProgressCircular
        :value="twentyFiveValue"
        :show-percentage="true"
        size="md"
      />
      <FeatherProgressCircular
        :value="fiftyValue"
        :show-percentage="true"
        size="md"
      />
      <FeatherProgressCircular
        :value="seventyFiveValue"
        :show-percentage="true"
        size="md"
      />
      <FeatherProgressCircular
        :value="not100Value"
        :show-percentage="true"
        size="md"
      />
      <FeatherProgressCircular
        :value="oneHundredValue"
        :show-percentage="true"
        size="md"
      />
      <FeatherProgressCircular
        :value="not0Value"
        :show-percentage="true"
        size="md"
        :error="errMsg"
      >
        <template #error>
          {{ errMsg }}
        </template>
      </FeatherProgressCircular>
    </section>
    <section class="circular">
      <h1>md</h1>
      <FeatherProgressCircular :value="not0Value" size="md" />
      <FeatherProgressCircular :value="twentyFiveValue" size="md" />
      <FeatherProgressCircular :value="fiftyValue" size="md" />
      <FeatherProgressCircular :value="seventyFiveValue" size="md" />
      <FeatherProgressCircular :value="not100Value" size="md" />
      <FeatherProgressCircular :value="oneHundredValue" size="md" />
      <FeatherProgressCircular :value="not0Value" size="md" :error="errMsg">
        <template #error>
          {{ errMsg }}
        </template>
      </FeatherProgressCircular>
    </section>
    <section class="circular">
      <h1>sm</h1>
      <FeatherProgressCircular
        :value="not0Value"
        :show-percentage="true"
        size="sm"
      />
      <FeatherProgressCircular
        :value="twentyFiveValue"
        :show-percentage="true"
        size="sm"
      />
      <FeatherProgressCircular
        :value="fiftyValue"
        :show-percentage="true"
        size="sm"
      />
      <FeatherProgressCircular
        :value="seventyFiveValue"
        :show-percentage="true"
        size="sm"
      />
      <FeatherProgressCircular
        :value="not100Value"
        :show-percentage="true"
        size="sm"
      />
      <FeatherProgressCircular
        :value="oneHundredValue"
        :show-percentage="true"
        size="sm"
      />
      <FeatherProgressCircular
        :value="not0Value"
        :show-percentage="true"
        size="sm"
        :error="errMsg"
      >
        <template #error>
          {{ errMsg }}
        </template>
      </FeatherProgressCircular>
    </section>
    <section class="circular">
      <h1>sm</h1>
      <FeatherProgressCircular :value="not0Value" size="sm" />
      <FeatherProgressCircular :value="twentyFiveValue" size="sm" />
      <FeatherProgressCircular :value="fiftyValue" size="sm" />
      <FeatherProgressCircular :value="seventyFiveValue" size="sm" />
      <FeatherProgressCircular :value="not100Value" size="sm" />
      <FeatherProgressCircular :value="oneHundredValue" size="sm" />
      <FeatherProgressCircular :value="not0Value" size="sm" :error="errMsg">
        <template #error>
          {{ errMsg }}
        </template>
      </FeatherProgressCircular>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as components from "./../src";

export default defineComponent({
  components: {
    ...components,
  },
  data() {
    return {
      errMsg: "",
      value: 0,
      not0Value: 0,
      twentyFiveValue: 0,
      fiftyValue: 0,
      seventyFiveValue: 0,
      not100Value: 0,
      oneHundredValue: 0,
      interval: 0,
    };
  },
  methods: {
    setFixedValues() {
      this.not0Value = 1;
      this.twentyFiveValue = 25;
      this.fiftyValue = 50;
      this.seventyFiveValue = 75;
      this.not100Value = 99;
      this.oneHundredValue = 100;
      this.errMsg = "Error Message.";
    },
  },
  mounted() {
    this.setFixedValues();
  },
});
</script>

<style lang="scss">
@import "@featherds/styles/themes/variables";

div#app {
  background: var($surface);
}
section {
  margin: 1em 0 1em;
  border-bottom: 1px solid black;
  &.linear {
    .feather-progress-container {
      margin: 2em;
    }
  }
  &.circular {
    display: flex;
    flex-direction: row;
    flex-grow: 4;
    text-align: center;
    h1 {
      width: 50px;
    }
    .feather-progress-container {
      margin: 0.5em;
    }
  }
}
.spinner {
  display: block;
}
</style>
