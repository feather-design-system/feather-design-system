import { config } from "@vue/test-utils";

config.global.stubs = {
  ...config.global.stubs,
  teleport: true,
};

config.global.renderStubDefaultSlot = true;
