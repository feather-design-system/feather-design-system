<template>
  <div class="tag-demo">
    <div>
      <FeatherTagList class="tags">
        <FeatherTag :type="'success'" :emphasis="'low'" />
        <FeatherTag :type="'normal'" :emphasis="'low'" />
        <FeatherTag :type="'error'" :emphasis="'low'" />
        <FeatherTag :type="'critical'" :emphasis="'low'" />
        <FeatherTag :type="'major'" :emphasis="'low'" />
        <FeatherTag :type="'minor'" :emphasis="'low'" />
        <FeatherTag :type="'warning'" :emphasis="'low'" />
        <FeatherTag :type="'indeterminate'" :emphasis="'low'" />
        <FeatherTag :type="'cleared'" :emphasis="'low'" />
        <FeatherTag :type="'ready'" :emphasis="'low'" />
        <FeatherTag :type="'info'" :emphasis="'low'" />
        <FeatherTag :type="'unknown'" :emphasis="'low'" />
        <FeatherTag :type="'allocated'" :emphasis="'low'" />
        <FeatherTag :type="'up'" :emphasis="'low'" />
        <FeatherTag :type="'down'" :emphasis="'low'" />
        <FeatherTag :type="'initializing'" :emphasis="'low'" />
        <FeatherTag :type="'expired'" :emphasis="'low'" />
        <FeatherTag :type="'online'" :emphasis="'low'" />
        <FeatherTag :type="'offline'" :emphasis="'low'" />
      </FeatherTagList>
    </div>
    <div>
      <FeatherTagList class="tags">
        <FeatherTag type="success" />
        <FeatherTag type="normal" />
        <FeatherTag type="error" />
        <FeatherTag type="critical" />
        <FeatherTag type="major" />
        <FeatherTag type="minor" />
        <FeatherTag type="warning" />
        <FeatherTag type="indeterminate" />
        <FeatherTag type="cleared" />
        <FeatherTag type="ready" />
        <FeatherTag type="info" />
        <FeatherTag type="unknown" />
        <FeatherTag type="allocated" />
        <FeatherTag type="up" />
        <FeatherTag type="down" />
        <FeatherTag type="initializing" />
        <FeatherTag type="expired" />
        <FeatherTag type="online" />
        <FeatherTag type="offline" />
      </FeatherTagList>
    </div>
    <div>
      <FeatherTagList class="tags">
        <FeatherTag :type="'success'" :emphasis="'high'" />
        <FeatherTag :type="'normal'" :emphasis="'high'" />
        <FeatherTag :type="'error'" :emphasis="'high'" />
        <FeatherTag :type="'critical'" :emphasis="'high'" />
        <FeatherTag :type="'major'" :emphasis="'high'" />
        <FeatherTag :type="'minor'" :emphasis="'high'" />
        <FeatherTag :type="'warning'" :emphasis="'high'" />
        <FeatherTag :type="'indeterminate'" :emphasis="'high'" />
        <FeatherTag :type="'cleared'" :emphasis="'high'" />
        <FeatherTag :type="'ready'" :emphasis="'high'" />
        <FeatherTag :type="'info'" :emphasis="'high'" />
        <FeatherTag :type="'unknown'" :emphasis="'high'" />
        <FeatherTag :type="'allocated'" :emphasis="'high'" />
        <FeatherTag :type="'up'" :emphasis="'high'" />
        <FeatherTag :type="'down'" :emphasis="'high'" />
        <FeatherTag :type="'initializing'" :emphasis="'high'" />
        <FeatherTag :type="'expired'" :emphasis="'high'" />
        <FeatherTag :type="'online'" :emphasis="'high'" />
        <FeatherTag :type="'offline'" :emphasis="'high'" />
      </FeatherTagList>
    </div>
    <div class="cards">
      <div class="card">
        <FeatherTagList>
          <FeatherTag :text="'boston office'" :type="type6" />
          <FeatherTag :text="'dallas office'" :type="type3" />
          <FeatherTag :text="'raleigh north atlantic office'" :type="type3" />
          <FeatherTag :text="'philadelphia west office'" :type="type5" />
          <FeatherTag :text="'new york office'" :type="type2" />
        </FeatherTagList>
        <p>
          Quisquam, voluptates. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Autem quidem, molestias provident nam dicta alias
          corrupti blanditiis, at quaerat!
        </p>
      </div>
      <div class="card">
        <FeatherTagList>
          <FeatherTag :text="text2" :type="'error'" :emphasis="'low'" />
        </FeatherTagList>
        <p>
          nam dicta unde illo officia aliquam voluptas natus fuga ipsum, eaque
          porro necessitatibus alias corrupti adipisicing elit. Autem quidem,
          molestias provident
        </p>
      </div>
      <div class="card">
        <FeatherTagList>
          <FeatherTag :text="text3" :type="type3" />
          <FeatherTag :text="text4" :type="type4" />
        </FeatherTagList>

        <p>Provident nam dicta unde illo officia aliquam voluptas natus</p>
      </div>
      <div class="card">
        <FeatherTagList>
          <FeatherTag :text="text4" :type="type4" :emphasis="'high'" />
        </FeatherTagList>
        <p>
          Hey Brian Price... Need a color variable for warning brown. #715300
        </p>
      </div>
      <div class="card">
        <FeatherTagList>
          <FeatherTag :text="text5" :type="type5" :emphasis="'high'" />
        </FeatherTagList>
        <p>
          This is high emphasis. ipsum dolor sit amet consectetur adipisicing
          elit. Autem quidem,
        </p>
      </div>
      <div class="card">
        <FeatherTagList>
          <FeatherTag :text="'ready'" :type="type6" :emphasis="'low'" />
        </FeatherTagList>
        <p>
          This is low emphasis. ipsum dolor sit amet consectetur adipisicing
          elit. Autem quidem,
        </p>
      </div>
    </div>
  </div>

  <FeatherAlertDock dock="bottom">
    <FeatherAlert
      type="info"
      message="Hey Brian Price... Need a color variable for warning brown. #715300"
      :active="true"
      closeable
    />
  </FeatherAlertDock>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FeatherTag from "../src/components/FeatherTag.vue";
import FeatherTagList from "../src/components/FeatherTagList.vue";
import { TagType } from "../src/types";
import FeatherAlert from "../../alert/src/components/FeatherAlert.vue";
import FeatherAlertDock from "../../alert/src/components/FeatherAlertDock.vue";

const type2 = ref<TagType>("ready");
const type3 = ref<TagType>("success");
const type4 = ref<TagType>("warning");
const type5 = ref<TagType>("error");
const type6 = ref<TagType>("ready");

const text2 = ref<string>("2nd tag");
const text3 = ref<string>(
  "most beautiful tag anyone has ever seen in their life"
);
const text4 = ref<string>("A warning tag");
const text5 = ref<string>("deoxyribonucleic acid");
</script>

<style>
/* required to show full bleed scenario for Feather Alert; without impacting all other demos */
.feather-container:has(.tag-demo) {
  padding-left: 0;
  padding-right: 0;
  max-width: unset;
}
</style>
<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
@use "@featherds/styles/themes/utils" as utils;
body {
  margin: 0;
  padding: 0;
}
.tag-demo {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 70rem;
  margin: 0 auto;

  .tags {
    margin: 0.5rem;
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    .card {
      // display: flex;
      // flex-direction: column;
      background-color: utils.alpha(vars.$secondary, 0.02);
      border-radius: 0.25rem;
      margin-inline: 0.5rem;
      padding: 0.5rem;
      width: min(275px, 300px);
    }
  }
}
</style>
