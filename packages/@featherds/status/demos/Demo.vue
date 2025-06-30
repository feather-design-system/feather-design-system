<template>
  <h3>Feather Status</h3>
  <div class="status-demo">
    <h4>No Padding/Margins Tag Sizing (16px)</h4>
    <div class="no-gaps">
      <FeatherStatus status="allocated" title="allocated" />
      <FeatherStatus status="cleared" title="cleared" />
      <FeatherStatus status="critical" title="critical" />
      <FeatherStatus status="down" title="down" />
      <FeatherStatus status="error" title="error" />
      <FeatherStatus status="expired" title="expired" />
      <FeatherStatus status="info" title="info" />
      <FeatherStatus status="initializing" title="initializing" />
      <FeatherStatus status="major" title="major" />
      <FeatherStatus status="minor" title="minor" />
      <FeatherStatus status="normal" title="normal" />
      <FeatherStatus status="offline" title="offline" />
      <FeatherStatus status="online" title="online" />
      <FeatherStatus status="ready" title="ready" />
      <FeatherStatus status="success" title="success" />
      <FeatherStatus status="unknown" title="unknown" />
      <FeatherStatus status="up" title="up" />
      <FeatherStatus status="warning" title="warning" />
    </div>
    <h4>No Padding/Margins Alert Sizing (20px)</h4>
    <div class="no-gaps">
      <FeatherStatus status="allocated" :dimension="20" title="allocated" />
      <FeatherStatus status="cleared" :dimension="20" title="cleared" />
      <FeatherStatus status="critical" :dimension="20" title="critical" />
      <FeatherStatus status="down" :dimension="20" title="down" />
      <FeatherStatus status="error" :dimension="20" title="error" />
      <FeatherStatus status="expired" :dimension="20" title="expired" />
      <FeatherStatus status="info" :dimension="20" title="info" />
      <FeatherStatus
        status="initializing"
        :dimension="20"
        title="initializing"
      />
      <FeatherStatus status="major" :dimension="20" title="major" />
      <FeatherStatus status="minor" :dimension="20" title="minor" />
      <FeatherStatus status="normal" :dimension="20" title="normal" />
      <FeatherStatus status="offline" :dimension="20" title="offline" />
      <FeatherStatus status="online" :dimension="20" title="online" />
      <FeatherStatus status="ready" :dimension="20" title="ready" />
      <FeatherStatus status="success" :dimension="20" title="success" />
      <FeatherStatus status="unknown" :dimension="20" title="unknown" />
      <FeatherStatus status="up" :dimension="20" title="up" />
      <FeatherStatus status="warning" :dimension="20" title="warning" />
    </div>
    <h4>1rem Gap</h4>
    <div class="with-gaps">
      <FeatherStatus status="allocated" title="allocated" />
      <FeatherStatus status="cleared" title="cleared" />
      <FeatherStatus status="critical" title="critical" />
      <FeatherStatus status="down" title="down" />
      <FeatherStatus status="error" title="error" />
      <FeatherStatus status="expired" title="expired" />
      <FeatherStatus status="info" title="info" />
      <FeatherStatus status="initializing" title="initializing" />
      <FeatherStatus status="major" title="major" />
      <FeatherStatus status="minor" title="minor" />
      <FeatherStatus status="normal" title="normal" />
      <FeatherStatus status="offline" title="offline" />
      <FeatherStatus status="online" title="online" />
      <FeatherStatus status="ready" title="ready" />
      <FeatherStatus status="success" title="success" />
      <FeatherStatus status="unknown" title="unknown" />
      <FeatherStatus status="up" title="up" />
      <FeatherStatus status="warning" title="warning" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { FeatherStatus } from "../src";
</script>

<style lang="scss" scoped>
.status-demo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .with-gaps {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .no-gaps {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
  }
}
</style>
