<template>
  <div class="feather-container">
    <div class="feather-row">
      <div class="feather-col-10">
        <ul>
          <li>col 10</li>
        </ul>
      </div>
      <div class="feather-col-2">
        <ul>
          <li>col 2</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "~@featherds/styles/themes/variables";
.feather-row {
  ul {
    border: 1px solid var($primary);
  }
}
</style>
