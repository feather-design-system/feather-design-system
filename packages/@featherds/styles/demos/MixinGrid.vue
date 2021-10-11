<template>
  <div class="container">
    <div class="row">
      <div class="lhs">
        <div class="content">I AM LEFT HAND COLUMN</div>
      </div>
      <div class="rhs">
        <div class="row">
          <div class="split">
            <div class="content">i am a third of 10 columns</div>
          </div>
          <div class="split">
            <div class="content">i am a third of 10 columns</div>
          </div>
          <div class="split">
            <div class="content">i am a third of 10 columns</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@featherds/styles/mixins/grid";

.container {
  @include container;
}

.row {
  @include row;
}

.lhs {
  @include col(2);
}

.rhs {
  @include col(10);
}

.split {
  @include col(4);
}

.row {
  div.content {
    border: 1px solid red;
  }
}
</style>
