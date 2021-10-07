<template>
  <div class="feather-container">
    <div class="feather-row">
      <div class="feather-col-2">
        <div class="content">I AM LEFT HAND COLUMN</div>
      </div>
      <div class="feather-col-10">
        <div class="feather-row">
          <div class="feather-col-4">
            <div class="content">i am a third of 10 columns</div>
          </div>
          <div class="feather-col-4">
            <div class="content">i am a third of 10 columns</div>
          </div>
          <div class="feather-col-4">
            <div class="content">i am a third of 10 columns</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "~@featherds/styles/lib/grid";
.feather-row {
  div.content {
    border: 1px solid red;
  }
}
</style>
