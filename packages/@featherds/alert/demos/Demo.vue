<template>
  <div class="alert-demo">
    <FeatherAlert
      :message="`Top Banner 1 of 2.  This alert is a semantic div tag.`"
      tag="div"
      :type="fb1Type"
      :active="fb1Active"
      :banner="true"
      :closeable="true"
      :sticky="true"
      :anchoredTo="fb1Anchor"
      @close="fb1Active = false"
    >
      <template #actions
        ><FeatherButton text @click="fb1Active = false">dismiss</FeatherButton>
      </template>
    </FeatherAlert>
    <FeatherAlert
      :message="`Top Banner 2 of 2.  This alert is a semantic div tag.`"
      tag="div"
      :type="'info'"
      :active="fb2Active"
      :banner="true"
      :closeable="true"
      :sticky="true"
      :anchoredTo="'top'"
      @close="fb2Active = false"
    >
    </FeatherAlert>

    <FeatherAlert
      tag="div"
      :message="`Bottom Banner 1 of 2.  This alert is a semantic div tag. ${fbMsg}`"
      :type="'warning'"
      :active="fbActive"
      :anchored-to="'bottom'"
      banner
      closeable
      sticky
    />
    <FeatherAlert
      tag="div"
      :message="`
      Yolo ipsum dolor sit amet, consectetur adipiscing elit. Ut ac suscipit leo. Carpe diem vulputate est nec commodo rutrum. Pellentesque mattis convallis nisi eu and I ain’t stoppin until the swear jar’s full. Ut rhoncus velit at mauris interdum, fringilla dictum neque rutrum. Curabitur mattis odio at erat viverra lobortis. Poppin’ bottles on the ice, tristique suscipit mauris elementum tempus. Quisque ut felis vitae elit tempor interdum viverra a est. Drop it like it’s hot, at pretium quam. In nec scelerisque purus. Nam dignissim lacus ipsum, a ullamcorper nulla pretium non. Aliquam sed enim faucibus, pulvinar felis at, vulputate augue. Ten, ten, twenties on them fifties, trick, at tempus libero fermentum id. Vivamus ut nisi dignissim, condimentum urna vel, dictum massa. Donec justo yolo, rutrum vitae dui in, dapibus tempor tellus. I do it big. Fusce ut sagittis mi.


      `"
      :type="'success'"
      :active="fbActive"
      :anchored-to="'bottom'"
      banner
      closeable
      sticky
    />
    <FeatherAlert
      tag="section"
      :message="`This is alert is a semantic section tag with a message that is closeable.`"
      :type="'info'"
      :active="fbActive"
      banner
      closeable
    />
    <div class="demo-controls">
      <div>
        <button
          @click="alert1Active = !alert1Active"
          @update:active="alert1Active = !alert1Active"
        >
          Toggle ({{ alert1Active }})
        </button>
      </div>
      <div>
        <button
          @click="alert2Active = !alert2Active"
          @update:active="alert2Active = !alert2Active"
        >
          Toggle ({{ alert2Active }})
        </button>
      </div>
      <div>
        <button
          @click="alert3Active = !alert3Active"
          @update:active="alert3Active = !alert3Active"
        >
          Toggle ({{ alert3Active }})
        </button>
      </div>
      <div>
        <button
          @click="alert4Active = !alert4Active"
          @update:active="alert4Active = !alert4Active"
        >
          Toggle ({{ alert4Active }})
        </button>
      </div>
      <div>
        <button
          @click="fb1Active = !fb1Active"
          @update:active="fb1Active = !fb1Active"
        >
          Toggle ({{ fb1Active }})
        </button>
      </div>
    </div>
    <FeatherAlert
      tag="main"
      :message="alert1Msg"
      :type="alert1Type"
      :active="alert1Active"
      class="alert-demo-content"
    >
      <template #content>
        <div class="alert-demo-cards">
          <div class="alert-demo-card">
            <FeatherAlert
              :message="alert2Msg"
              :type="alert2Type"
              :active="alert2Active"
              closeable
              @close="alert2Active = false"
            />
            <FeatherAlert
              :message="alert3Msg"
              :type="alert3Type"
              :active="alert3Active"
              :closeable="false"
              @close="alert3Active = false"
            >
              <template #actions>
                <FeatherButton text @click="login"> retry </FeatherButton>
              </template>
              <template #content>
                <p>This content is part of the feather-alert content slot.</p>
                <p>
                  Feather Alert can be used to replace the containing div for a
                  section that can display alerts. This content is passed in the
                  content slot of the FeatherAlert component which would
                  normally be a simple div. (or other containing element like
                  section???)
                </p>
                <p>
                  The actions slot can be used to add buttons or other action
                  content to the alert.
                </p>
              </template>
            </FeatherAlert>
            <FeatherAlert
              type="warning"
              message="NOTE:  This alert is not closeable."
              active
            />
          </div>
          <div class="alert-demo-card">
            <FeatherAlert
              :message="alert4Msg"
              :type="alert4Type"
              :active="alert4Active"
              :closeable="alert4Closeable"
              @close="alert4Active = false"
            >
              <template #actions>
                <FeatherButton text @click="alert4Active = false">
                  dismiss
                </FeatherButton>
              </template>
            </FeatherAlert>
            <p>Some normal section that is affiliated with an alert.</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
              repellendus quo explicabo voluptate, velit illo sunt aut,
              doloribus quisquam repellat delectus? Voluptas incidunt nesciunt
              accusantium sunt, magni minus nisi officiis! Repudiandae,
              eligendi. Fugiat accusamus explicabo quasi tempore veniam eaque
              vel et non quibusdam quae? Accusantium cumque beatae dolor natus
              soluta! Velit rem aperiam porro animi? Distinctio, labore quia?
              Dicta, odio!
            </p>
          </div>
        </div>
      </template>
    </FeatherAlert>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { type AlertAnchor, type AlertType } from "../src/types";
import FeatherAlert from "./../src/components/FeatherAlert.vue";
import { FeatherButton } from "@featherds/button";

const fbMsg = ref(
  `
    lorem ipsum dolor sit amet consectetur adipisicing elit. Est, ad! A,
    odio sed facilis mollitia est aliquam nisi temporibus esse quod nesciunt
    placeat, perspiciatis cumque doloribus enim maiores saepe debitis. Id
  `
);
// const fbType = ref<AlertType>("info");
const fbActive = ref(true);

const fb1Type = ref<AlertType>("error");
const fb1Active = ref(true);
const fb1Anchor = ref<AlertAnchor>("top");

const fb2Active = ref(true);

const alert1Msg = ref(
  "This alert is not closeable. Both the angel on my left shoulder and the devil on my right are eager to go to the next board meeting and say we're ditching the business model imagineer, yet if you're not hurting you're not winning, let's see if we can dovetail these two projects cross sabers."
);
const alert1Type = ref<AlertType>("info");
const alert1Active = ref(true);

const alert2Msg = ref("Something good happened.  Congrats.");
const alert2Type = ref<AlertType>("success");
const alert2Active = ref(true);

const alert3Msg = ref("Unauthorized: Please login again");
const alert3Type = ref<AlertType>("error");
const alert3Active = ref<boolean>(true);

const alert4Msg = ref("Alert with actions, no content, but closeable");
const alert4Type = ref<AlertType>("error");
const alert4Active = ref<boolean>(true);
const alert4Closeable = ref<boolean>(true);

const login = () => {
  setTimeout(() => {
    alert3Active.value = false;
  }, 1500);
};

watch(alert2Active, (newVal) => {
  console.log("trigger watch for alert2Active", typeof newVal, newVal);
  alert2Active.value = newVal;
});

watch(alert3Active, (newVal) => {
  console.log("trigger watch for alert3Active", typeof newVal, newVal);
  alert3Active.value = newVal;
});
</script>

<style>
/* required to show full bleed scenario for Feather Alert; without impacting all other demos */
.feather-container:has(.alert-demo) {
  padding-left: 0;
  padding-right: 0;
  max-width: unset;
}
</style>
<style lang="scss" scoped>
body {
  margin: 0;
  padding: 0;
}
.alert-demo {
  margin-bottom: 0;
  .demo-controls {
    display: flex;
    gap: 1rem;
    max-width: 70rem;
    margin: 0 auto;
    margin-bottom: 2rem;
  }
  .alert-demo-content {
    max-width: 70rem;
    margin: 0 auto;
    .alert-demo-cards {
      display: flex;
      gap: 1rem;
      .alert-demo-card {
        flex: 1;
      }
    }
  }
}
</style>
