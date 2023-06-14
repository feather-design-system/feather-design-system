<template>
  <section>
    <FeatherAppRail :labels="labels" :content="content">
      <template v-slot:icon>
        <IconTextAnimate>
          <template v-slot:icon>
            <FeatherIcon
              :icon="app"
              title="Awesome Product"
              class="product-icon"
            ></FeatherIcon>
          </template>

          <template v-slot:text>
            <span class="product-text">Product</span>
          </template>
        </IconTextAnimate>
      </template>
      <FeatherAppRailNavHeader title="Applications" />
      <template v-slot:nav>
        <FeatherAppRailNavItem href="/#Card-Cards" :icon="app" title="Cards" />
        <FeatherAppRailNavItem
          href="#/AppRail-Feather_711/#rodeo"
          :icon="app"
          title="Rodeo"
        />
        <FeatherAppRailNavItem
          href="#/AppRail-Feather_711/#letters"
          :icon="app"
          title="Letters"
        />
        <FeatherAppRailNavItem
          href="#/AppRail-Feather_711/#section1"
          :icon="app"
          title="Section One"
        />
        <FeatherAppRailNavItem
          href="#/AppRail-Feather_711/#section2"
          :icon="app"
          title="Section Two"
        />
        <FeatherAppRailNavItem
          href="#/AppRail-Feather_711/#section3"
          :icon="app"
          title="Section Three"
        />
      </template>
    </FeatherAppRail>
    <div id="test">
      <h1>Page Contents</h1>
      <ul>
        <li>
          <RouterLink to="/Card-Cards">Cards</RouterLink>
        </li>
        <li>
          <a href="#/AppRail-Feather_711/#rodeo">Rodeo</a>
        </li>
        <li>
          <a href="#/AppRail-Feather_711/#letters">Letters</a>
        </li>
        <li>
          <a href="#/AppRail-Feather_711/#section1">Section One</a>
        </li>
        <li>
          <a href="#/AppRail-Feather_711/#section2">Section Two</a>
        </li>
        <li>
          <a href="#/AppRail-Feather_711/#section3">Section Three</a>
        </li>
      </ul>
      <RouterView />
      <section id="rodeo">
        <h3>Rodeo</h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, saepe
        nostrum corporis laudantium quaerat ipsam, consequuntur officia
        aspernatur hic temporibus aut adipisci porro! Temporibus repudiandae,
        est voluptates expedita cumque facere.
      </section>
      <section id="letters">
        <h3>Letters</h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
        voluptatibus est ipsam impedit aut, voluptates, molestiae delectus sint
        cumque a soluta reprehenderit quod molestias blanditiis? Odit, iure. Ea,
        est ut!
      </section>
      <section id="section1">
        <h3 id="one">Section One</h3>
        <p>
          Maecenas quis nisl quis elit gravida luctus. Sed auctor, leo quis
          consequat ullamcorper, justo erat ultricies nisi, sit amet aliquet
          quam lorem id magna. Aliquam erat volutpat. Cras vitae semper leo.
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Proin vitae dolor sit amet lacus tincidunt
          rutrum.
        </p>
      </section>
      <section id="section2">
        <h3>Section Two</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis leo
          vitae lorem ultrices consequat. Quisque auctor, nisl ac tincidunt
          lacinia, eros nisi aliquet arcu, id sagittis nisi quam quis mauris.
          Fusce euismod lacus ut leo fringilla, vitae aliquam lectus mattis.
          Phasellus quis semper justo. Suspendisse potenti. Vivamus et magna sit
          amet nunc sagittis mollis. Praesent eget felis id diam ullamcorper
          consequat. Nunc auctor augue id lacus pulvinar, vitae malesuada sapien
          egestas. Curabitur vitae tortor quis elit condimentum sollicitudin.
          Duis eget velit sed nisl fermentum tincidunt. Etiam in semper lorem.
          Sed in purus at eros vehicula tristique. Morbi ut neque ut erat luctus
          accumsan.
        </p>
      </section>
      <section id="section3">
        <div id="foo">test</div>
        <h3>Section Three</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Pharetra
          magna ac placerat vestibulum lectus mauris ultrices eros in. Senectus
          et netus et malesuada fames ac turpis. Pellentesque nec nam aliquam
          sem et tortor consequat id. Mauris rhoncus aenean vel elit scelerisque
          mauris pellentesque. Integer eget aliquet nibh praesent tristique. Sed
          id semper risus in hendrerit. Eu ultrices vitae auctor eu augue ut
          lectus. Purus ut faucibus pulvinar elementum integer enim neque.
          Ornare quam viverra orci sagittis. At auctor urna nunc id. Gravida in
          fermentum et sollicitudin. Placerat in egestas erat imperdiet.
        </p>
        <p>
          Adipiscing elit pellentesque habitant morbi tristique senectus et.
          Justo donec enim diam vulputate ut pharetra sit amet aliquam. Mattis
          nunc sed blandit libero volutpat sed cras ornare arcu. Enim tortor at
          auctor urna nunc id cursus metus. Nisi scelerisque eu ultrices vitae
          auctor eu augue ut. Sit amet facilisis magna etiam tempor orci eu.
          Mollis aliquam ut porttitor leo. At tellus at urna condimentum mattis
          pellentesque id. Fusce ut placerat orci nulla pellentesque dignissim.
          Faucibus ornare suspendisse sed nisi lacus sed viverra tellus. Auctor
          neque vitae tempus quam pellentesque. Proin libero nunc consequat
          interdum varius sit amet. Auctor augue mauris augue neque gravida in
          fermentum et sollicitudin. Faucibus purus in massa tempor nec. Dapibus
          ultrices in iaculis nunc sed augue lacus viverra. Phasellus egestas
          tellus rutrum tellus. Dui sapien eget mi proin sed libero enim sed.
        </p>
        <p>
          Orci phasellus egestas tellus rutrum tellus pellentesque eu.
          Consectetur lorem donec massa sapien faucibus et molestie ac. Sit amet
          justo donec enim diam vulputate ut. Vitae sapien pellentesque habitant
          morbi tristique senectus et netus et. Tristique sollicitudin nibh sit
          amet commodo nulla facilisi nullam. Felis imperdiet proin fermentum
          leo vel. Magnis dis parturient montes nascetur ridiculus mus mauris
          vitae. Eros in cursus turpis massa tincidunt dui ut ornare. Ut aliquam
          purus sit amet luctus venenatis. Risus nullam eget felis eget. Nisl
          purus in mollis nunc sed id semper risus in. Enim nec dui nunc mattis
          enim ut tellus. Nibh nisl condimentum id venenatis. Aliquet eget sit
          amet tellus cras adipiscing. In massa tempor nec feugiat.
        </p>
      </section>
    </div>
  </section>
</template>
<script lang="ts">
import * as components from "./../src";
import App from "@featherds/icon/medical/Hospital";
import { FeatherIcon } from "@featherds/icon";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      labels: {
        skip: "Skip to main content",
      },
      content: "test",
      app: App,
    };
  },
  components: {
    ...components,
    FeatherIcon,
  },
});
</script>
<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";

#test {
  height: 120vh;
  width: 80%;
  padding-left: 5em;
}

.product-icon {
  font-size: 18px;
}

.product-text {
  margin-left: 0.5rem;
  @include headline3;
  color: var(--feather-app-rail-text-color);
}
</style>
