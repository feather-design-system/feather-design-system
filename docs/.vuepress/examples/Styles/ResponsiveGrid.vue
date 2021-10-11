<template>
  <div class="feather-container">
    <div class="feather-row">
      <div
        class="
          feather-col-xl-10
          feather-col-l-8
          feather-col-m-6
          feather-col-s-4
          feather-col-xs-4
        "
      >
        <ul>
          <li>xl col 10</li>
          <li>l col 8</li>
          <li>m col 6</li>
          <li>s col 4</li>
          <li>xs col 4</li>
        </ul>
      </div>
      <div
        class="
          feather-col-xl-2
          feather-col-l-4
          feather-col-m-2
          feather-col-s-4
          feather-col-xs-4
        "
      >
        <ul>
          <li>xl col 2</li>
          <li>l col 4</li>
          <li>m col 2</li>
          <li>s col 4</li>
          <li>xs col 4</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
.feather-row {
  ul {
    border: 1px solid var($primary);
  }
}
</style>
