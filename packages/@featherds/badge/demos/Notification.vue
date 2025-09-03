<template>
  <div class="notification-badge-demo">
    <h1>Demo</h1>
    <div class="badges">
      <FeatherBadge :badges="badgeNotifications">
        <FeatherButton icon="Notifications" class="notifications-button">
          <FeatherIcon :icon="Notifications" />
        </FeatherButton>
      </FeatherBadge>
      <FeatherBadge :badges="badgeEmails">
        <FeatherButton icon="Email" class="notifications-button">
          <FeatherIcon :icon="Email" />
        </FeatherButton>
      </FeatherBadge>
    </div>
    <div class="controls">
      <FeatherButton
        icon="Add"
        @click="notifications < 0 ? (notifications = 1) : notifications++"
      >
        <FeatherIcon :icon="Add" />
      </FeatherButton>
      <FeatherButton
        icon="Remove"
        @click="notifications <= 0 ? (notifications = 0) : notifications--"
      >
        <FeatherIcon :icon="Remove" />
      </FeatherButton>
      <span class="count">{{ notifications }} Notifications</span>
      <FeatherButton icon="Add" @click="emails < 0 ? (emails = 1) : emails++">
        <FeatherIcon :icon="Add" />
      </FeatherButton>
      <FeatherButton
        icon="Remove"
        @click="emails <= 0 ? (emails = 0) : emails--"
      >
        <FeatherIcon :icon="Remove" />
      </FeatherButton>
      <span class="count">{{ emails }} Emails:</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { FeatherBadge, BadgeTypes } from "@featherds/badge";
import { FeatherButton } from "@featherds/button";
import { FeatherIcon } from "@featherds/icon";
import Notifications from "@featherds/icon/action/Notifications";
import Email from "@featherds/icon/action/Email";
import Add from "@featherds/icon/action/AddCircleAlt";
import Remove from "@featherds/icon/action/Remove";

const notifications = ref(0);
const emails = ref(0);

const badgeNotifications = computed(() => {
  return notifications.value > 0
    ? [
        {
          type: BadgeTypes.error,
          title: `${notifications.value} New Notifications`,
        },
      ]
    : [];
});

const badgeEmails = computed(() => {
  return emails.value > 0
    ? [
        {
          type: BadgeTypes.info,
          title: `${emails.value} New Emails`,
        },
      ]
    : [];
});
</script>

<style scoped>
.notification-badge-demo {
  padding: 20px;
  h1 {
    margin-bottom: 20px;
  }
  .badges {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
  .controls {
    display: grid;
    grid-template-columns: 2.5rem 2.5rem 16rem;
    margin: 2rem;
    align-items: center;
    .count {
      margin: 1rem;
      font-size: large;
    }
  }
}
</style>
