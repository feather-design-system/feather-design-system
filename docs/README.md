<HomePageAdjust />
<div class="hero">
  <section class="gradient-1">
    <HeaderMask />
    <div class="section-wrapper center">
      <h1>Welcome to the Feather Design System</h1>
      <p class="body-large">Feather DS is an open source design system used<br/>
      for NantHealth and OpenNMS products.</p>
      <FeatherButton primary>Get Started</FeatherButton>
      <FeatherButton secondary>
        <template v-slot:icon>
          <FeatherIcon :icon="icon" aria-hidden="true" focusable="false"></FeatherIcon>
        </template>
        Github
      </FeatherButton>
    </div>
  </section>
</div>

<script>
import { FeatherButton } from "@featherds/button";
import { FeatherIcon } from "@featherds/icon";
import icon from "@featherds/icon/action/Help";
import atom from "@featherds/icon/branding/Atom";
import arrow from "@featherds/icon/navigation/ArrowBack";
import FeatherLogoMotif from "@featherds/icon/branding/FeatherLogoMotif";
import sections from "@source/groups";
  export default{
    components: {
      FeatherButton,
      FeatherIcon
    },
    computed:{
      icon(){
        return icon;
      },
      atom(){
        return atom;
      },
      arrow(){
        return arrow;
      },
      logo(){
        return FeatherLogoMotif;
      }
    },
    data(){
      return {
        sections
      }
    },
  }
</script>

<section>
  <div class="section-wrapper philosophy">
    <div class="left">
      <FeatherIcon class="atom" :icon="atom" focusable="false"></FeatherIcon>
      <span>
        <h2>Our Design Philosophy</h2>
        <p>
          Here we could add a couple sentences about the intent and purpose of the Feather Design System
        </p>
      </span>
    </div>
    <div class="right">
      <ol>
        <li>
          <dl>
            <dt>Simplicity</dt>
            <dd>Here we could add a couple sentences about the intent and purpose of the Feather Design System</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>Consistency</dt>
            <dd>Here we could add a couple sentences about the intent and purpose of the Feather Design System</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>Accessibility</dt>
            <dd>Here we could add a couple sentences about the intent and purpose of the Feather Design System</dd>
          </dl>
        </li>
      </ol>
    </div>
  </div>
</section>

<section class="gradient-2">
  <div class="section-wrapper learn">
    <h2>Learn More About Feather DS</h2>
    <p class="body-small">
      Get started on your next project with our most popular<br/>
      development and design assets and resources.
    </p>
    <div class="card-group">
      <a class="sexy-card">
        <img :src="$withBase('/assets/branding/home-components.png')" title="Components"/>
        <div class="card-inner">
          <span class="overline">Components</span>
          <h3>Getting Started</h3>
          <FeatherIcon :icon="arrow" focusable="false"></FeatherIcon>
        </div>
      </a>
      <a class="sexy-card">
        <img :src="$withBase('/assets/branding/home-foundation.png')" title="Components"/>
        <div class="card-inner">
          <span class="overline">Design</span>
          <h3>Foundational concepts</h3>
          <FeatherIcon :icon="arrow" focusable="false"></FeatherIcon>
        </div>
      </a>
      <a class="sexy-card">
        <img :src="$withBase('/assets/branding/home-typography.png')" title="Components"/>
        <div class="card-inner">
          <span class="overline">Typography</span>
          <h3>Typographical mastery</h3>
          <FeatherIcon :icon="arrow" focusable="false"></FeatherIcon>
        </div>
      </a>
    </div>
  </div>
</section>


<section>
  <div class="section-wrapper story">
    <div class="story-wrapper">
      <FeatherIcon class="logo" :icon="logo" focusable="false"></FeatherIcon>
      <span class="tagline">Our Story</span>
      <span class="title">
        Something about our connection to NantHealth
      </span>
    </div>
  </div>
</section>
