<template>
  <div class="alert-dock-demo">
    <div class="alert-dock-demo-wrapper">
      <h3>Feather Alert Dock Demo</h3>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, ad! A,
        odio sed facilis mollitia est aliquam nisi temporibus esse quod nesciunt
        placeat, perspiciatis cumque doloribus enim maiores saepe debitis. Id
        cum placeat aut! Doloribus ratione porro in cumque consectetur, sapiente
        nesciunt, perferendis modi, labore nostrum ex! Alias excepturi animi in
        unde, cumque asperiores? Nihil iure similique perferendis. Dignissimos,
        maxime! Similique minima iusto quidem accusamus fugiat quae aperiam
        ratione asperiores voluptatem recusandae dolorum doloribus cum veritatis
        nesciunt quisquam dolor est unde, necessitatibus fuga ducimus. Facere
        qui id aliquam placeat adipisci!
      </p>
      <FeatherAlert closeable />
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione sed
        iusto, exercitationem, quis natus error hic eum vel maxime quisquam odio
        ab cum perferendis. Officiis voluptate ullam veniam voluptates hic!
      </p>
      <FeatherAlert type="error" message="Error" closeable />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ipsam
        perspiciatis, exercitationem incidunt eum sunt quisquam explicabo neque
        deserunt ducimus officia reprehenderit fugiat, quidem repellendus
        inventore voluptas culpa vel cupiditate. Et minima error facere, illum
        aperiam quae laboriosam expedita officia laborum nam explicabo
        reprehenderit dolor rerum alias impedit laudantium possimus illo fugiat
        labore? Quaerat, velit explicabo natus eaque fugiat nisi. Odio ducimus
        iste nisi! Sequi iusto laudantium molestiae ad? Dicta sequi reiciendis
        itaque, amet repellat temporibus? Aperiam, incidunt obcaecati, nulla qui
        ullam molestiae, harum voluptatibus minus autem iste provident
        praesentium. Mollitia doloremque qui aperiam laborum sapiente dolorem
        fugit voluptatibus quia, eligendi sit officiis voluptas. Similique
        minima magnam voluptatibus blanditiis quibusdam repellat, quo
        necessitatibus impedit velit tempora ad quia totam nisi. Qui cum nam
        magni, voluptatum eligendi dolores et nobis minus ad libero in alias
        quibusdam praesentium tempore. Sequi, aliquid temporibus mollitia esse
        quas eos reiciendis sit delectus harum ullam est. Harum cumque nulla
        inventore quia numquam et accusamus velit, voluptas placeat ducimus
        maxime nihil nisi ad eum odit! Quasi libero in tenetur minima inventore
        nihil velit atque nulla? Nostrum, rem!
      </p>
      <FeatherAlert
        type="warning"
        message="Warning: Dolore a magnam amet rem, reiciendis repellendus nemo recusandae odit ut
        aliquid, sed molestiae unde quas aut illum nostrum quo iure sapiente
        asperiores. Sapiente, omnis? Quisquam, doloremque veniam. Architecto neque quibusdam placeat culpa, repellat labore
        laudantium perspiciatis eligendi praesentium quisquam? Quos repudiandae
        incidunt fugiat eaque odit eum ea esse, commodi vitae dolor error
        distinctio dolores veritatis iste nobis."
        closeable
      />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
        necessitatibus dignissimos beatae cum reprehenderit a ducimus, iste
        quibusdam deleniti, odio nesciunt doloribus quas! Nostrum expedita,
        minus tempora pariatur alias nesciunt! Id aut corporis facilis tempora!
        Dolore a magnam amet rem, reiciendis repellendus nemo recusandae odit ut
        aliquid, sed molestiae unde quas aut illum nostrum quo iure sapiente
        asperiores. Sapiente, omnis? Quisquam, doloremque veniam. Quidem
        excepturi voluptatum impedit tempora quia incidunt quisquam perferendis,
        praesentium repellat voluptates similique facere deserunt eum cum
        facilis alias illo amet recusandae quasi reiciendis quas! Repellendus,
        error. Architecto neque quibusdam placeat culpa, repellat labore
        laudantium perspiciatis eligendi praesentium quisquam? Quos repudiandae
        incidunt fugiat eaque odit eum ea esse, commodi vitae dolor error
        distinctio dolores veritatis iste nobis.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
        harum, autem accusamus odio officia illo sint sed. Nobis obcaecati
        deleniti, eveniet vero aut ipsam nisi optio est, autem deserunt nihil.
        Consequatur voluptate, labore magni aspernatur consectetur voluptatum
        obcaecati ut? In deserunt blanditiis nobis eligendi placeat incidunt
        necessitatibus totam qui temporibus veritatis, iusto adipisci? Harum
        libero minima, ipsum sapiente quo incidunt! Iure maiores a, modi
        obcaecati eum veritatis nihil dignissimos quo alias eligendi maxime quam
        explicabo possimus! Neque praesentium blanditiis ipsa tempore aspernatur
        expedita nihil aut voluptatem rem sint, quos provident! Possimus nemo
        perspiciatis non laboriosam, dolores odit maxime tenetur facilis illum
        hic corrupti eius officia at neque eligendi tempore, cumque architecto
        rerum fuga in sint accusantium tempora error earum. Maxime!
      </p>
    </div>

    <FeatherAlertDock id="top-dock" :dock="topDock">
      <FeatherAlert type="success" message="Success" closeable />
      <FeatherAlert type="info" message="Info" closeable />
    </FeatherAlertDock>
    <FeatherAlertDock id="bottom-dock" :dock="bottomDock">
      <FeatherAlert
        type="error"
        :message="`Payment is past  due. ${obnoxiouslyLongMessage}`"
        :active="errorActive"
        closeable
      >
        <template #actions>
          <FeatherButton text @click="errorActive = false"
            >make payment</FeatherButton
          >
        </template>
      </FeatherAlert>
      <FeatherAlert
        :message="`This is an important bulletin. ${obnoxiouslyLongMessage}`"
        closeable
      />
      <FeatherAlert
        type="warning"
        message="NOTE: Here there be dragons... and other mythical creatures."
        closeable
      />
    </FeatherAlertDock>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FeatherAlert from "./../src/components/FeatherAlert.vue";
import FeatherAlertDock from "./../src/components/FeatherAlertDock.vue";
import { FeatherButton } from "@featherds/button";
import { type AlertAnchor } from "../src/types";

const topDock = ref<AlertAnchor>("top");
const bottomDock = ref<AlertAnchor>("bottom");

const errorActive = ref(true);

const obnoxiouslyLongMessage = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, ad! A,
odio sed facilis mollitia est aliquam nisi temporibus esse quod nesciunt
placeat, perspiciatis cumque doloribus enim maiores saepe debitis. Id
cum placeat aut! Doloribus`;
// nesciunt, perferendis modi, labore nostrum ex! Alias excepturi animi in
// unde, cumque asperiores? Nihil iure similique perferendis. Dignissimos,
// maxime! Similique minima iusto quidem accusamus fugiat quae aperiam
</script>
<style>
/* required to show full bleed scenario for Feather Alert; without impacting all other demos */
.feather-container:has(.alert-dock-demo) {
  padding-left: 0;
  padding-right: 0;
  max-width: unset;
}
</style>
<style lang="scss" scoped>
.alert-dock-demo-wrapper {
  max-width: 70rem;
  margin: 0 auto;
  p {
    text-indent: 1rem;
  }
}
</style>
