<template>
  <h1>Cards</h1>
  <div class="cards">
    <FeatherCard
      title="Article Card"
      subtitle="The Article HTML Tag"
      class="card"
    >
      <template #image>
        <img src="https://picsum.photos/400/400" class="large-image fill" />
      </template>
      The &lt;article&gt; HTML element represents a self-contained composition
      in a document, page, application, or site, which is intended to be
      independently distributable or reusable (e.g., in syndication). Examples
      include: a forum post, a magazine or newspaper article, or a blog entry, a
      product card, a user-submitted comment, an interactive widget or gadget,
      or any other independent item of content.
      <template #actions>
        <FeatherButton text @click="viewDetails('article')">
          View Details
        </FeatherButton>
      </template>
    </FeatherCard>
  </div>
  <div class="cards">
    <FeatherCard
      title="Anchor Card"
      subtitle="The Anchor HTML Tag"
      href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a"
      class="card"
    >
      <template #image>
        <img src="https://picsum.photos/400/300" class="large-image fill" />
      </template>
      The &lt;a&gt; HTML element (or anchor element), with its href attribute,
      creates a hyperlink to web pages, files, email addresses, locations in the
      same page, or anything else a URL can address. Content within each
      &lt;a&gt; should indicate the link's destination. If the href attribute is
      present, pressing the enter key while focused on the &lt;a&gt; element
      will activate it.
      <template #actions>
        <FeatherButton text @click="viewDetails('anchor')">
          View Details
        </FeatherButton>
      </template>
    </FeatherCard>
    <FeatherCard
      title="Second of Two Cards"
      subtitle="Some Lorem Ipsum"
      class="card"
    >
      <template #image>
        <img src="https://picsum.photos/400/250" class="large-image fill" />
      </template>
      Malesuada fames ac turpis egestas maecenas pharetra convallis posuere.
      Magna etiam tempor orci eu lobortis elementum nibh tellus molestie. Vitae
      sapien pellentesque habitant morbi tristique senectus et.
    </FeatherCard>
  </div>
  <div class="cards">
    <FeatherCard
      title="First of Three Cards"
      subtitle="Card Detail"
      class="card"
    >
      The &lt;article&gt; HTML element represents a self-contained composition
      in a document, page, application, or site, which is intended to be
      independently distributable or reusable (e.g., in syndication). Examples
      include: a forum post, a magazine or newspaper article, or a blog entry, a
      product card, a user-submitted comment, an interactive widget or gadget,
      or any other independent item of content.
      <template #actions>
        <FeatherButton text @click="viewDetails('article')">
          View Details
        </FeatherButton>
      </template>
    </FeatherCard>
    <FeatherCard
      title="Second of Three Cards"
      subtitle="An exercise"
      class="card"
    >
      This is content for the second of three cards.
      <br /><br />Dr. Josephus Evil <br />123 Main Street <br />Boston, MA 02102
    </FeatherCard>
    <FeatherCard title="Third of Three Cards" class="card">
      <template #image>
        <img src="https://picsum.photos/400/300" class="large-image fill" />
      </template>
      Pretty, pretty picture. <a href="https://www.google.com">Google</a>
    </FeatherCard>
  </div>
  <div class="cards">
    <FeatherCard title="First of Four Cards" subtitle="First Card" class="card">
      <template #image>
        <img src="https://picsum.photos/200/200" class="large-image fill" />
      </template>
      Tempus quam pellentesque nec nam aliquam sem et.
    </FeatherCard>
    <FeatherCard
      title="Second of Four Cards"
      subtitle="Second Card"
      href="https://www.google.com"
      class="card"
    >
      Content
      <template #actions>
        <FeatherButton text>Cancel</FeatherButton>
        <FeatherButton text>Ok</FeatherButton>
      </template>
    </FeatherCard>
    <FeatherCard
      title="Third of Four Cards"
      subtitle="Image Shown Above"
      class="card"
    >
      <template #image>
        <img src="https://picsum.photos/100/100" class="large-image fill" />
      </template>
      Ultricies tristique nulla aliquet enim. Tortor consequat id porta nibh
      venenatis cras sed felis.
    </FeatherCard>
    <FeatherCard
      title="Fourth of Four Cards"
      subtitle="Admittedly, This is a Contrived, Rather Large Sub-Title.  In My Defense, I am Trying to Determine if Margins Are A Problem For Sub-Titles."
      class="card"
    >
      Tristique senectus et netus et malesuada fames. Pellentesque pulvinar
      pellentesque habitant morbi tristique. Vitae sapien pellentesque habitant
      morbi tristique senectus et netus.
      <template #actions>
        <FeatherButton text>Cancel</FeatherButton>
        <FeatherButton text>Ok</FeatherButton>
      </template>
    </FeatherCard>
  </div>
  <FeatherCard
    title="This is a 400 x 300 image"
    subtitle="This image is really large and ill-rendered."
    class="card"
  >
    <template #image>
      <img src="https://picsum.photos/400/300" class="large-image fill" />
    </template>
    Issues with images on cards.
    <ul>
      <li>Allow consumer to pass whatever image they like.</li>
      <li>Consumer styles the image passed in parent component.</li>
      <li>Document examples of different image sizes</li>
    </ul>
  </FeatherCard>
  <FeatherCard title="Title, Image &amp; Content" class="card">
    <template #image>
      <img src="https://picsum.photos/200/200" class="small-image" />
    </template>
    Here is a card with a title, image and the content. No subtitle used.
  </FeatherCard>
  <FeatherCard
    title="A Card"
    subtitle="With 2 Buttons"
    class="card two-buttons"
  >
    <template #image>
      <img
        src="https://picsum.photos/200/200"
        class="small-image"
      />
    </template>
    Pretty, pretty picture.
    <template #actions>
      <FeatherButton secondary>Cancel</FeatherButton>
      <FeatherButton primary>Ok</FeatherButton>
    </template>
  </FeatherCard>
  <FeatherCard
    title="Title, Subtitle &amp; Content"
    subtitle="Using Property Named 'sub-title'"
    class="card"
  >
    Here is a card with only the title, subtitle, and content without image and
    buttons; supports <span class="kebab-case">kebab-case</span>
    .
  </FeatherCard>
  <FeatherCard
    title="Title, Subtitle  &amp; Content"
    subtitle="Using Property Named 'subTitle'"
    href="https://www.google.com"
    class="card"
  >
    Here is a card with only the title, subtitle, and content without image and
    buttons; supports <span class="camel-case">camelCase</span>. Lorem ipsum
    dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua. Non sodales neque sodales ut.
    Tortor consequat id porta nibh venenatis cras. Neque vitae tempus quam
    pellentesque nec. Vitae tortor condimentum lacinia quis vel eros donec ac
    odio. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis
    feugiat vivamus at. Sapien nec sagittis aliquam malesuada bibendum arcu
    vitae elementum curabitur. Non enim praesent elementum facilisis leo vel. In
    massa tempor nec feugiat nisl. Nisi porta lorem mollis aliquam ut porttitor
    leo.
  </FeatherCard>
  <h2>Original Images</h2>
  <div class="cards">
    <span class="original-image">
      <h3>400x400</h3>
      <img src="https://picsum.photos/400/400" />
    </span>
    <span class="original-image">
      <h3>400x300</h3>
      <img src="https://picsum.photos/400/300" />
    </span>
    <span class="original-image">
      <h3>400x250</h3>
      <img src="https://picsum.photos/400/250" />
    </span>
    <span class="original-image">
      <h3>200x200</h3>
      <img src="https://picsum.photos/200/200" />
    </span>
    <span class="original-image">
      <h3>100x100</h3>
      <img src="https://picsum.photos/100/100" />
    </span>
  </div>
</template>
<script lang="ts">
import * as components from "./../src";
import { FeatherButton } from "@featherds/button";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    ...components,
    FeatherButton,
  },
  methods: {
    viewDetails(topic: string) {
      if (topic === "article") {
        location.href =
          "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article";
      } else if (topic === "anchor") {
        location.href =
          "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/anchor";
      }
    },
  },
});
</script>

<style scoped>
.cards {
  display: flex;
  flex-direction: row;
}
.card {
  /* flex-grow: 1; */
  margin: 1rem 0.5rem;
  max-width: 41rem;
  min-width: 15rem;
}
.original-image {
  padding: 1rem;
}
.large-image {
  max-width: 100%;
}
.small-image {
  min-width: 100%;
}
.fill {
  object-fit: fill;
  object-position: center;
  width: 100%;
}
.two-buttons {
  max-width: 20.5rem;
}
.camel-case {
  color: orange;
  font-size: 1.125rem;
}
.kebab-case {
  color: red;
  font-size: 1.125rem;
}
</style>
