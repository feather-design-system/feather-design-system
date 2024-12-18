<template>
  <section>
    <FeatherExpansionPanel title="Suggested Patients">
      <template #icon>
        <FeatherIcon :icon="imageIcon" />
      </template>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Member ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Steve Smith</td>
            <td>12 Bedford Avenue</td>
            <td>1235434123</td>
            <td class="icon-cell">
              <FeatherIcon :icon="icon" title="Select Patient" />
            </td>
          </tr>
          <tr>
            <td>Bradley Smith</td>
            <td>12 Bedford Avenue</td>
            <td>1235434123</td>
            <td class="icon-cell">
              <FeatherButton icon="Select Patient">
                <FeatherIcon :icon="icon" title="Select Patient" />
              </FeatherButton>
            </td>
          </tr>
          <tr>
            <td>Sarah Smith</td>
            <td>12 Bedford Avenue</td>
            <td>1235434123</td>
            <td class="icon-cell">
              <FeatherIcon :icon="icon" title="Select Patient" />
            </td>
          </tr>
        </tbody>
      </table>
    </FeatherExpansionPanel>
    <FeatherExpansionPanel
      title="Suggested Patients"
      :icon="(folderIcon as any)"
    >
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Member ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Steve Smith</td>
            <td>12 Bedford Avenue</td>
            <td>1235434123</td>
            <td class="icon-cell">
              <FeatherIcon :icon="icon" title="Select Patient" />
            </td>
          </tr>
          <tr>
            <td>Bradley Smith</td>
            <td>12 Bedford Avenue</td>
            <td>1235434123</td>
            <td class="icon-cell">
              <FeatherButton icon="Select Patient">
                <FeatherIcon :icon="icon" title="Select Patient" />
              </FeatherButton>
            </td>
          </tr>
          <tr>
            <td>Sarah Smith</td>
            <td>12 Bedford Avenue</td>
            <td>1235434123</td>
            <td class="icon-cell">
              <FeatherIcon :icon="icon" title="Select Patient" />
            </td>
          </tr>
        </tbody>
      </table>
    </FeatherExpansionPanel>
  </section>
</template>
<script lang="ts">
import * as components from "./../src";
import { FeatherIcon } from "@featherds/icon";
import { FeatherButton } from "@featherds/button";
import Icon from "@featherds/icon/navigation/ChevronRight";
import Image from "@featherds/icon/file/Image";
import Folder from "@featherds/icon/file/Folder";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      icon: Icon,
      imageIcon: Image,
      folderIcon: Folder,
    };
  },
  components: {
    ...components,
    FeatherIcon,
    FeatherButton,
  },
});
</script>
<style lang="scss" scoped>
@import "@featherds/table/scss/table";
table {
  width: 100%;
  @include table;
  @include table-condensed;
  @include row-hover;
}
</style>
