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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
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
      <a class="sexy-card" :href="$withBase('/Components/GettingStarted/')">
        <img :src="$withBase('/assets/branding/home-components.png')" title="Components"/>
        <div class="card-inner">
          <span class="overline">Components</span>
          <h3>Getting Started</h3>
          <FeatherIcon :icon="arrow" focusable="false"></FeatherIcon>
        </div>
      </a>
      <a class="sexy-card">
        <img :src="$withBase('/assets/branding/home-foundation.png')" title="Foundation"/>
        <div class="card-inner">
          <span class="overline">Design</span>
          <h3>Foundational concepts</h3>
          <FeatherIcon :icon="arrow" focusable="false"></FeatherIcon>
        </div>
      </a>
      <a class="sexy-card" :href="$withBase('/Components/Typography/')">
        <img :src="$withBase('/assets/branding/home-typography.png')" title="Typography"/>
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
