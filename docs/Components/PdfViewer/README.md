---
title: "PDF Viewer"
pre: ""
npm: "@featherds/pdf-viewer"
description: "Designed to view documents within the existing context and provide access to controls."
lang: en-US
tags: ["PdfViewer", "component"]
menu: components
---

## Design

The PDF Viewer is built to provide application-specific funtionality around documents while relying on the default PDF viewer that ships with all major web browsers to render the document. The UI for the Feather PDF viewer must not rely on or obfuscate any portion of the browser PDF viewer since the browser viewer does not provide any means of interface with external components or applications.

## Examples

<PdfViewer-Examples />

## PdfViewer

### Getting Started

`PdfViewer` is created to view PDF documents in the browser. You may choose to convert certain document types into PDF so they can be viewed directly in the browser.

When using the `PdfViewer` be sure to use the `aria-expanded` attribute on the element that triggers the viewer to help indicate to a screen reader that something will be opened.

PDF Viewer performs a `HEAD` request against the given document to preview. If a `previewUrl` is specified it will make a request for that. Failing that it will use the `documentUrl`. The corresponding `XMLHttpRequest` object is emitted via the `check-request` event. If a state other than `200` is returned the error state will be displayed. Unique error messages can be configured via the [labels](#labels) or the [error slot](#slots).

### Props

| Name              | Description                                                                                                                           | Type      | Required | Default                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- | ----------------------------- |
| modelValue        | when `true` viewer will open                                                                                                          | `Boolean` | `false`  | -                             |
| documentExtension | extension of the file being viewed                                                                                                    | `String`  | `true`   | -                             |
| documentUrl       | url to the document                                                                                                                   | `String`  | `true`   | -                             |
| previewUrl        | url to the PDF preview                                                                                                                | `String`  | `false`  | -                             |
| forceError        | forces viewer into error state                                                                                                        | `Boolean` | `false`  | -                             |
| hideActions       | hides any of the actions that appear in the header                                                                                    | `Boolean` | `false`  | -                             |
| labels            | Object containing labels to be used by this component. Mainly used for i18n or customization of labels. See [Labels](#labels) example | `Object`  | `false`  | See [Labels](#labels) example |

### Labels

Text labels for the preview can be customized via the `labels` property. The default `labels` values are:

```js
{
  title: "REQUIRED",
  download: "download ${ext}",
  close: "Close Viewer",
  errorPreviewFile: "OOPS! Preview failed to load!",
  noPreviewFile: "OOPS! Preview failed to load!",
  viewerTitle: "PDF Viewer - ${docname}"
}
```

Please note that both `title` and `viewerTitle` are **required**

### Events

- `update:modelValue` - emitted when `modelValue` is updated
- `shown` - emitted when preview dialog is visible
- `hidden` - emitted when preview dialog is hiddne
- `check-request` - emitted with the `XMLHttpRequest` when it has completed

### Slots

- `panel` - places content in the left hand panel in the preview
- `error` - places content in the center of the main panel. Only shown when there is an error. Default content is provided only use as needed for customization
- `no-preview` - places content in the center of the main panel. Only shown when the document cannot be previewed. Default content is provided only use as needed for customization

### data-ref-ids

- `feather-pdfviewer` - main PDF Viewer container
- `feather-pdfviewer-title` - the span containing the document title
- `feather-pdfviewer-close` - the close button
- `feather-pdfviewer-download-button` - the download button anchor tag
- `feather-pdfviewer-preview-iframe` - the iframe hosting the document preview
