<template>
  <div class="feather-pdfviewer" v-show="modelValue" ref="element">
    <transition
      name="fade"
      v-on:after-enter="shown = true"
      v-on:after-leave="shown = false"
    >
      <FocusTrap :enable="shown && modelValue" class="trap" v-show="modelValue">
        <div
          class="content"
          role="dialog"
          aria-modal="true"
          :aria-label="computedViewerTitle"
          data-ref-id="feather-pdfviewer"
        >
          <div class="focus-area" tabindex="-1" first-focus>
            <header>
              <span data-ref-id="feather-pdfviewer-title">{{
                titleLabel
              }}</span>

              <FeatherButton
                as-anchor
                text
                on-color
                v-if="!hideActions && downloadUrl"
                :href="downloadUrl"
                download
                target="_blank"
                data-ref-id="feather-pdfviewer-download-button"
              >
                <template v-slot:icon
                  ><FeatherIcon :icon="downloadIcon" flex
                /></template>
                {{ computedDownloadLabel }}</FeatherButton
              >
            </header>
            <div class="viewer-body">
              <div class="lhs-panel" v-if="hasPanel">
                <slot name="panel" />
              </div>
              <div class="main-panel">
                <iframe
                  :src="preview"
                  :title="titleLabel"
                  frameborder="0"
                  v-if="state === 3"
                  data-ref-id="feather-pdfviewer-preview-iframe"
                ></iframe>
                <div class="loading" v-if="state === 0">
                  <FeatherSpinner />
                </div>
                <div class="file-error" v-if="state === 2">
                  <slot name="error">
                    <ErrorPanel
                      :text="errorPreviewFileLabel"
                      :download-text="computedDownloadLabel"
                      :download-url="documentUrl"
                  /></slot>
                </div>
                <div class="file-error" v-if="state === 1">
                  <slot name="no-preview">
                    <ErrorPanel
                      :text="noPreviewFileLabel"
                      :download-text="computedDownloadLabel"
                      :download-url="documentUrl"
                  /></slot>
                </div>
              </div>
            </div>

            <FeatherButton
              as-anchor
              on-color
              href="#"
              :icon="closeLabel"
              class="close-icon"
              @click="close"
              data-ref-id="feather-pdfviewer-close"
            >
              <FeatherIcon :icon="closeIcon"></FeatherIcon>
            </FeatherButton>
          </div>
        </div>
      </FocusTrap>
    </transition>
  </div>
</template>
<script>
import { FocusTrap } from "@featherds/dialog";
import { FeatherSpinner } from "@featherds/progress";
import { FeatherButton } from "@featherds/button";
import { FeatherIcon } from "@featherds/icon";
import CloseIcon from "@featherds/icon/navigation/ChevronLeft";
import DownloadIcon from "@featherds/icon/action/DownloadFile";
import { useCloseOnEsc } from "@featherds/composables/modal/CloseOnEsc";
import { useRestoreFocus } from "@featherds/composables/modal/RestoreFocus";
import { useHideBodyOverflow } from "@featherds/composables/modal/HideOverflow";
import { useLabelProperty } from "@featherds/composables/LabelProperty";
import ErrorPanel from "./ErrorPanel";
import { computed, toRef, ref, watch } from "vue";
const LABELS = {
  title: "REQUIRED",
  download: "download ${ext}",
  close: "Close Viewer",
  errorPreviewFile: "OOPS! Preview failed to load!",
  noPreviewFile: "OOPS! Preview failed to load!",
  viewerTitle: "PDF Viewer - ${docname}",
};
export default {
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  emits: ["update:modelValue", "shown", "hidden", "check-request"],
  props: {
    modelValue: {
      type: Boolean,
    },
    forceError: {
      type: Boolean,
      default: false,
    },
    hideActions: {
      type: Boolean,
      default: false,
    },
    documentExtension: {
      type: String,
      required: true,
    },
    documentUrl: {
      type: String,
      required: true,
    },
    previewUrl: {
      type: String,
    },
    labels: {
      type: Object,
      default() {
        return LABELS;
      },
      validator(v) {
        return (
          v &&
          v.title &&
          v.title !== LABELS.title &&
          v.viewerTitle &&
          v.viewerTitle.length
        );
      },
    },
  },
  setup(props, context) {
    const LOADING = 0;
    const NOPREVIEW = 1;
    const ERROR = 2;
    const PREVIEW = 3;
    const state = ref(LOADING);

    const labels = useLabelProperty(toRef(props, "labels"), LABELS);
    const visible = toRef(props, "modelValue");
    const previewUrl = toRef(props, "previewUrl");
    const ext = toRef(props, "documentExtension");
    const docUrl = toRef(props, "documentUrl");
    const forceError = toRef(props, "forceError");
    const element = ref();
    const close = () => {
      context.emit("update:modelValue", false);
    };
    const hasPanel = computed(() => {
      return !!context.slots.panel;
    });
    const downloadUrl = computed(() => {
      return ext.value && docUrl ? docUrl.value : "";
    });
    useHideBodyOverflow(visible);
    useRestoreFocus(visible);
    watch(useCloseOnEsc(visible), () => {
      close();
    });

    //if the extension is pdf then we can just use the document url
    const preview = computed(() => {
      if (ext.value.toLowerCase() === "pdf") {
        return props.documentUrl;
      }
      return previewUrl.value ? previewUrl.value : undefined;
    });

    const msie = window.navigator.userAgent.indexOf("MSIE ");
    let hasPreviewer = true;
    if (msie >= 0) {
      try {
        //eslint-disable-next-line
        new window.ActiveXObject("AcroPDF.PDF");
      } catch (e) {
        hasPreviewer = false;
      }
    }

    const updateState = (incoming) => {
      if (forceError.value) {
        state.value = ERROR;
      } else {
        state.value = incoming;
      }
    };

    //if we dont have a pdf extension and no preview url then show error.
    watch(
      [visible, preview, ext, docUrl],
      ([vis, url, extension, docUrl]) => {
        if (vis && ((url && url.length) || (docUrl && docUrl.length))) {
          updateState(LOADING);
          var http = new window.XMLHttpRequest();
          let requestUrl = url ? url : docUrl;
          http.open("HEAD", requestUrl);
          http.onload = function () {
            context.emit("check-request", http);
            if (http.status !== 200) {
              updateState(ERROR);
            } else {
              if (url === requestUrl && hasPreviewer) {
                //preview url is good
                updateState(PREVIEW);
              } else {
                updateState(NOPREVIEW);
              }
            }
          };
          http.onerror = function () {
            context.emit("check-request", http);
            updateState(ERROR);
          };

          http.send();
        }
      },
      { immediate: true }
    );

    const shown = ref(props.modelValue);
    watch(shown, (v) => {
      if (v) {
        context.emit("shown");
      } else {
        context.emit("hidden");
      }
    });
    const computedDownloadLabel = computed(() => {
      if (labels.downloadLabel) {
        return labels.downloadLabel.value.replace(
          "${ext}",
          props.documentExtension
        );
      }
      return "";
    });
    const computedViewerTitle = computed(() => {
      if (labels.viewerTitleLabel) {
        return labels.viewerTitleLabel.value.replace(
          "${docname}",
          labels.titleLabel.value
        );
      }
      return "";
    });
    const closeIcon = computed(() => CloseIcon);
    const downloadIcon = computed(() => DownloadIcon);
    return {
      close,
      element,
      shown,
      hasPanel,
      ...labels,
      computedDownloadLabel,
      computedViewerTitle,
      preview,
      closeIcon,
      downloadIcon,
      state,
      downloadUrl,
    };
  },
  components: {
    FocusTrap,
    FeatherButton,
    FeatherIcon,
    FeatherSpinner,
    ErrorPanel,
  },
};
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/typography";
@import "@featherds/styles/mixins/grid";

.feather-pdfviewer {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var($zindex-modal);

  header {
    background-color: var($secondary);
    @include subtitle1;
    color: var($primary-text-on-color);
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    padding-left: 24px + 36px + 16px;
  }

  .focus-area {
    display: flex;
    flex-direction: column;
    position: relative;

    .viewer-body {
      flex: 1;
      iframe,
      object,
      embed {
        vertical-align: bottom;
        height: 100%;
        width: 100%;
      }
    }

    .close-icon {
      position: absolute;
      left: 24px;
      top: 12px;
      margin: 0;
    }
  }
}

.viewer-body {
  overflow: hidden;

  .lhs-panel,
  .main-panel {
    display: inline-block;
    overflow: auto;
  }

  .main-panel {
    width: 100%;
    height: 100%;
  }
  .lhs-panel {
    vertical-align: top;
    width: 25%;
    min-width: 180px;
    height: 100%;
    + .main-panel {
      width: 75%;
    }
  }
}

.focus-area,
.content,
.trap,
:deep(.focus-trap-content) {
  height: 100%;
  width: 100%;
}

.content {
  background-color: var($surface);
}

.loading {
  padding-top: 48px;
}
.file-error {
  height: auto;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-to,
.fade-leave,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-from,
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
