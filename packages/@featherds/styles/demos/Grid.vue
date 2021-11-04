<template>
  <section>
    <h2>Columns at different breakpoints</h2>

    <div class="feather-row">
      <div
        class="
          feather-col-xl-2
          feather-col-l-2
          feather-col-m-2
          feather-col-s-2
          feather-col-xs-1
        "
      >
        <ul>
          <li>xl col 2</li>
          <li>l col 2</li>
          <li>m col 2</li>
          <li>s col 2</li>
          <li>xs col 1</li>
        </ul>
      </div>
      <div
        class="
          feather-col-xl-8
          feather-col-l-8
          feather-col-m-4
          feather-col-s-4
          feather-col-xs-2
        "
      >
        <ul>
          <li>xl col 8</li>
          <li>l col 8</li>
          <li>m col 4</li>
          <li>s col 4</li>
          <li>xs col 2</li>
        </ul>
      </div>
      <div
        class="
          feather-col-xl-2
          feather-col-l-2
          feather-col-m-2
          feather-col-s-2
          feather-col-xs-4
        "
      >
        <ul>
          <li>xl col 2</li>
          <li>l col 2</li>
          <li>m col 2</li>
          <li>s col 2</li>
          <li>xs col 4</li>
        </ul>
      </div>
    </div>
    <h2>Columns at different breakpoints with offset</h2>
    <div class="feather-row">
      <div
        class="
          feather-col-xl-8
          feather-col-l-8
          feather-col-m-4
          feather-col-s-4
          feather-col-xs-2
          offset-xl-2 offset-l-2 offset-m-2 offset-s-2 offset-xs-1
        "
      >
        <ul>
          <li>xl col 8, offset 2</li>
          <li>l col 8, offset 2</li>
          <li>m col 4, offset 2</li>
          <li>s col 4, offset 2</li>
          <li>xs col 2, offset 1</li>
        </ul>
      </div>
      <div
        class="
          feather-col-xl-2
          feather-col-l-2
          feather-col-m-2
          feather-col-s-2
          feather-col-xs-4
        "
      >
        <ul>
          <li>xl col 2</li>
          <li>l col 2</li>
          <li>m col 2</li>
          <li>s col 2</li>
          <li>xs col 4</li>
        </ul>
      </div>
    </div>
    <h2>Generic Column</h2>
    <div class="feather-row">
      <div class="feather-col-3">
        <ul>
          <li>col 3</li>
        </ul>
      </div>
      <div class="feather-col-9">
        <ul>
          <li>col 9</li>
        </ul>
      </div>
    </div>
    <h2>Generic Columnd plus offset</h2>
    <div class="feather-row">
      <div class="feather-col-9 offset-3">
        <ul>
          <li>col 9 offset-3</li>
        </ul>
      </div>
    </div>

    <h2>Nested Columns at different breakpoints</h2>
    <div class="feather-row">
      <div
        class="
          feather-col-xl-2
          feather-col-l-2
          feather-col-m-2
          feather-col-s-2
          feather-col-xs-1
        "
      >
        <ul>
          <li>xl col 2</li>
          <li>l col 2</li>
          <li>m col 2</li>
          <li>s col 2</li>
          <li>xs col 1</li>
        </ul>
      </div>
      <div
        class="
          feather-col-xl-8
          feather-col-l-8
          feather-col-m-4
          feather-col-s-4
          feather-col-xs-2
        "
      >
        <div class="feather-row">
          <div
            class="
              feather-col-xl-2
              feather-col-l-2
              feather-col-m-2
              feather-col-s-2
              feather-col-xs-1
            "
          >
            <ul>
              <li>xl col 2</li>
              <li>l col 2</li>
              <li>m col 2</li>
              <li>s col 2</li>
              <li>xs col 1</li>
            </ul>
          </div>
          <div
            class="
              feather-col-xl-8
              feather-col-l-8
              feather-col-m-4
              feather-col-s-4
              feather-col-xs-2
            "
          >
            <ul>
              <li>xl col 8</li>
              <li>l col 8</li>
              <li>m col 4</li>
              <li>s col 4</li>
              <li>xs col 2</li>
            </ul>
          </div>
          <div
            class="
              feather-col-xl-2
              feather-col-l-2
              feather-col-m-2
              feather-col-s-2
              feather-col-xs-4
            "
          >
            <ul>
              <li>xl col 2</li>
              <li>l col 2</li>
              <li>m col 2</li>
              <li>s col 2</li>
              <li>xs col 4</li>
            </ul>
          </div>
        </div>
      </div>
      <div
        class="
          feather-col-xl-2
          feather-col-l-2
          feather-col-m-2
          feather-col-s-2
          feather-col-xs-4
        "
      >
        <ul>
          <li>xl col 2</li>
          <li>l col 2</li>
          <li>m col 2</li>
          <li>s col 2</li>
          <li>xs col 4</li>
        </ul>
      </div>
    </div>

    <h2>Generic Column + Breakpoint</h2>
    <div class="feather-row">
      <div class="feather-col-3 feather-col-m-4">
        <ul>
          <li>col 3</li>
          <li>m col 4</li>
        </ul>
      </div>
      <div class="feather-col-9 feather-col-m-4">
        <ul>
          <li>col 9</li>
          <li>m col 4</li>
        </ul>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@import "@featherds/styles/lib/grid";
.feather-row {
  ul {
    border: 1px solid red;
  }
}
</style>
