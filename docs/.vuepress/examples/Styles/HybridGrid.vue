<template>
  <div class="feather-container">
    <div class="feather-row">
      <div class="feather-col-10 feather-col-m-4">
        <ul>
          <li>col 10</li>
          <li>m col 4</li>
        </ul>
      </div>
      <div class="feather-col-2 feather-col-m-4">
        <ul>
          <li>col 2</li>
          <li>m col 4</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "@featherds/styles/themes/variables" as vars;
.feather-row {
  ul {
    border: 1px solid var(vars.$primary);
  }
}
</style>
