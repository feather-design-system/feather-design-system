<script lang="ts" setup>
import App from "@featherds/icon/medical/Hospital";
import { FeatherIcon } from "@featherds/icon";
import { FeatherCheckbox } from "@featherds/checkbox";
import { FeatherList, FeatherListItem } from "@featherds/list";
import {
  FeatherAppRailNavHeader,
  FeatherAppRail,
  FeatherAppRailNavItem,
  IconTextAnimate,
} from "./../src";

import { reactive, ref } from "vue";

const labels = { skip: "Skip to main content" };
const content = ref("test");
const selectedId = ref("Cupcakes");

const cupcakes = ref(false);
const pirates = ref(false);
const zombies = ref(false);
const dude = ref(false);
const answer = ref(false);

const app = reactive(App);

const clicked = async (e: Event) => {
  const target = e.target as HTMLElement;
  console.log("TARGET", target);
  const item = target.closest(".feather-list-item");
  console.log("ITEM", item);

  if (item && !!item.id) {
    selectedId.value = item.id;
  }
};

const isSelected = (id: string) => {
  return selectedId.value === id;
};
</script>

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
      <template v-slot:nav>
        <FeatherAppRailNavHeader title="Applications" />
        <FeatherAppRailNavItem
          id="Cupcakes"
          href="#/AppRail-Selected/#CupcakesDiv"
          :icon="app"
          title="Cupcakes"
          @click="clicked"
          :class="{ selected: isSelected('Cupcakes') }"
        />
        <FeatherAppRailNavItem
          id="Pirates"
          href="#/AppRail-Selected/#PiratesDiv"
          :icon="app"
          title="Pirates"
          @click="clicked"
          :class="{ selected: isSelected('Pirates') }"
        />
        <FeatherAppRailNavItem
          id="Zombies"
          href="#/AppRail-Selected/#ZombiesDiv"
          :icon="app"
          title="Zombies"
          @click="clicked"
          :class="{ selected: isSelected('Zombies') }"
        />
        <FeatherAppRailNavHeader title="Settings" />
        <FeatherAppRailNavItem
          id="User"
          href="#/AppRail-Selected/#UserDiv"
          :icon="app"
          title="User"
          @click="clicked"
          :class="{ selected: isSelected('User') }"
        />
      </template>
    </FeatherAppRail>
    <div id="test">
      <br /><br />
      <div>
        <div v-if="selectedId == 'Cupcakes'">
          <h3 id="Cupcakes">Cupcakes</h3>
          <p>
            Cupcake ipsum dolor sit amet lollipop jelly beans chocolate. Pudding
            jelly beans powder jelly beans caramels candy canes I love. Tiramisu
            candy canes candy canes I love jelly-o lollipop chupa chups
            chocolate marshmallow. Jelly beans cheesecake carrot cake pastry I
            love tootsie roll muffin. Icing chocolate bar powder I love muffin
            brownie bear claw jujubes. Lollipop sweet roll I love topping powder
            dessert dessert I love jelly.
          </p>
          <p>
            Cupcake jelly beans muffin gummi bears sesame snaps croissant pie
            marzipan macaroon. Cupcake halvah chupa chups shortbread sugar plum
            liquorice lollipop candy jelly. Dessert shortbread dragée toffee
            chocolate bar cake sugar plum. Tootsie roll toffee jelly beans
            pastry bonbon tiramisu.
          </p>
          <h5>Something to TAB to...</h5>
          <FeatherCheckbox id="answer1" class="chkbx" v-model="answer"
            >Will you answer a question?</FeatherCheckbox
          >
          <FeatherCheckbox id="cupcakes" class="chkbx" v-model="cupcakes"
            >Do you like cupcakes?</FeatherCheckbox
          >
        </div>
      </div>
      <div>
        <div v-if="selectedId == 'Pirates'">
          <h3 id="PiratesDiv">Pirates</h3>
          <p>
            Gally knave code of conduct Jack Ketch black spot strike colors
            chase guns topmast spanker topsail lee yardarm topgallant fore Arr.
            Loot Jack Tar coxswain driver chandler poop deck Gold Road league
            Privateer avast grog blossom Yellow Jack dance the hempen jig hands
            gangplank. Boom Spanish Main salmagundi to go on account piracy
            cutlass quarterdeck Gold Road galleon fluke hands square-rigged
            parley Jack Tar coffer.
          </p>
          <p>
            Scourge of the seven seas bounty hearties bring a spring upon her
            cable bilged on her anchor gunwalls keel Sink me lugsail knave me
            transom bucko rutters Nelsons folly. Run a shot across the bow
            parrel scallywag hornswaggle square-rigged list smartly interloper
            shrouds cutlass topmast bilged on her anchor ho yawl Sea Legs. Main
            sheet prow transom flogging hands galleon landlubber or just lubber
            grog black jack Blimey Spanish Main pirate rope's end furl lad.
          </p>
          <h5>Something to TAB to...</h5>
          <FeatherCheckbox id="answer2" class="chkbx" v-model="answer"
            >Will you answer a question?</FeatherCheckbox
          >
          <FeatherCheckbox id="pirates" class="chkbx" v-model="pirates"
            >Walk the plank?</FeatherCheckbox
          >
        </div>
      </div>
      <div v-if="selectedId == 'Zombies'">
        <h3 id="ZombiesDiv">Zombies</h3>
        <p>
          Zombies reversus ab inferno, nam malum cerebro. De carne animata
          corpora quaeritis. Summus sit​​, morbo vel maleficia? De Apocalypsi
          undead dictum mauris. Hi mortuis soulless creaturas, imo monstra
          adventus vultus comedat cerebella viventium. Qui offenderit rapto,
          terribilem incessu. The voodoo sacerdos suscitat mortuos comedere
          carnem. Search for solum oculi eorum defunctis cerebro. Nescio an
          Undead zombies. Sicut malus movie horror.
        </p>
        <p>
          Cum horribilem resurgere de sepulcris creaturis, sicut de iride et
          serpens. Pestilentia, ipsa screams. Pestilentia est haec ambulabat
          mortuos. Sicut malus voodoo. Aenean a dolor vulnerum aperire accedunt,
          mortui iam vivam. Qui tardius moveri, sed in magna copia sint
          terribiles legionis. Alii missing oculis aliorum sicut serpere crabs
          nostram. Putridi odores aere implent.
        </p>
        <h5>Something to TAB to...</h5>
        <FeatherCheckbox id="answer3" class="chkbx" v-model="answer"
          >Will you answer a question?</FeatherCheckbox
        >
        <FeatherCheckbox id="zombies" class="chkbx" v-model="zombies"
          >Have you been bitten?</FeatherCheckbox
        >
      </div>
      <div v-if="selectedId == 'User'">
        <h3 id="User">Dude</h3>
        <p>
          Bro ipsum dolor sit amet avie Whistler granny gear white room. Phat
          hammer pipe, fully hero back country flow gaper bomb hole corduroy
          flow. Granny gear slash Snowboard clipless poaching. Free ride
          afterbang pillow popping schwag.
        </p>
        <p>
          White room method rail bowl lid jib giblets trail swag line. Gear
          jammer switch avie mute stoked free ride laps Bike titanium. Snake
          bite gondy apres cornice misty chain ring air. Gear jammer corn brain
          bucket, newschooler epic gaper betty heli shreddin schwag. Huck stoked
          grab, epic liftie trucks line yard sale chain ring.
        </p>
        <h5>Something to TAB to...</h5>
        <FeatherCheckbox id="answer4" class="chkbx" v-model="answer"
          >Will you answer a question?</FeatherCheckbox
        >
        <FeatherCheckbox id="dude" class="chkbx" v-model="dude"
          >Dude?</FeatherCheckbox
        >
      </div>
      <FeatherList>
        FeatherList list
        <FeatherListItem :selected="isSelected('Cupcakes')"
          >Cupcakes</FeatherListItem
        >
        <FeatherListItem :selected="isSelected('Pirates')"
          >Pirates
        </FeatherListItem>
        <FeatherListItem :selected="isSelected('Zombies')"
          >Zombies</FeatherListItem
        >
        <FeatherListItem :selected="isSelected('User')">User</FeatherListItem>
      </FeatherList>
      <ul>
        Tracking Visited
        <li><a href="#/AppRail-Selected/#CupcakesDiv">Link to Cupcakes</a></li>
        <li><a href="#/AppRail-Selected/#PiratesDiv">Link to Pirates</a></li>
        <li><a href="#/AppRail-Selected/#ZombiesDiv">Link to Zombies</a></li>
        <li><a href="#/AppRail-Selected/#UserDiv">Link to User</a></li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@featherds/styles/mixins/typography";

#test {
  height: 120vh;
}

h5 {
  padding-top: 1.5em;
}

.product-icon {
  font-size: 18px;
}

.product-text {
  margin-left: 0.5rem;
  @include headline3;
  color: var(--feather-app-rail-text-color);
}

.chkbx {
  padding: 1rem;
}
</style>
