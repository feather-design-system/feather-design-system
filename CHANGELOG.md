## [0.9.6](https://github.com/feather-design-system/feather-design-system/compare/v0.9.5...v0.9.6) (2022-02-17)


### Bug Fixes

* **#35:** feather PDF Viewer changes the route when the back button is clicked ([06fd9a5](https://github.com/feather-design-system/feather-design-system/commit/06fd9a54b226205eceb0b3d7f0b67a1493f6f894)), closes [#35](https://github.com/feather-design-system/feather-design-system/issues/35)
* **#39:** date input clear button works when value is typed in ([f73645f](https://github.com/feather-design-system/feather-design-system/commit/f73645f41d08d4c59d17d62f3555a802ee77721f)), closes [#39](https://github.com/feather-design-system/feather-design-system/issues/39)
* **build:** adding CDN purge to the 'docs' action ([151309f](https://github.com/feather-design-system/feather-design-system/commit/151309f4e6a618b218d88114cf6e23e495f8a2f2))
* date input tests now fully running ([74e2ab2](https://github.com/feather-design-system/feather-design-system/commit/74e2ab2b35ce693c78820f54b10356556a01aef6))
* **date-input:** preventing data-ref-id duplication. fixes [#51](https://github.com/feather-design-system/feather-design-system/issues/51) ([945a660](https://github.com/feather-design-system/feather-design-system/commit/945a6605fb50e827a3ef13a17be6a65dc8d08e7e))
* **input:** hide label should now be accessible with axe wcag standards,  fixes [#36](https://github.com/feather-design-system/feather-design-system/issues/36) ([b735b67](https://github.com/feather-design-system/feather-design-system/commit/b735b67ac19abb553e7712af0d0deca667b10684))
* **select:** clicking clear icon now behaves as expected [#33](https://github.com/feather-design-system/feather-design-system/issues/33) ([2dd719f](https://github.com/feather-design-system/feather-design-system/commit/2dd719f124e377c94143b14da064a3e77cc573a1))
* **select:** fixing validation on keyboard navigation, fix [#44](https://github.com/feather-design-system/feather-design-system/issues/44) ([9cec288](https://github.com/feather-design-system/feather-design-system/commit/9cec288938f3ef434094b0f8a7c54e47b0fee588))
* updating PDF viewer titles and updated missed Readme for Autocomplete ([2c9e4cd](https://github.com/feather-design-system/feather-design-system/commit/2c9e4cdd7741fd83487e191110af279821987674))


### Features

* **algolia:** updating algolia  and fixing skipped urls, closing [#52](https://github.com/feather-design-system/feather-design-system/issues/52) ([bc22cc0](https://github.com/feather-design-system/feather-design-system/commit/bc22cc0ca3015ca7b452c172990cc370d6791f51))
* **validation:** review ideas ([27979a9](https://github.com/feather-design-system/feather-design-system/commit/27979a97cd4461535746e2ba805d4da9a36240d7))
* **vuepress:** upgrading vuepress beta, closing [#52](https://github.com/feather-design-system/feather-design-system/issues/52) ([5bf8b2e](https://github.com/feather-design-system/feather-design-system/commit/5bf8b2ed9d5f58b13a9105add4e0902ee732d2a4))



## [0.9.5](https://github.com/feather-design-system/feather-design-system/compare/v0.9.4...v0.9.5) (2022-02-14)


### Bug Fixes

* adding data-ref-id to autocomplete and error icon ([f2ef596](https://github.com/feather-design-system/feather-design-system/commit/f2ef59694b09772b6cdc437ff169182fefb9e86e))



## [0.9.4](https://github.com/feather-design-system/feather-design-system/compare/v0.9.2...v0.9.4) (2022-02-02)


### Bug Fixes

* **focus-trap:** refactored to resolve quirks in some browsers where order wasn't maintained ([a6c5b9b](https://github.com/feather-design-system/feather-design-system/commit/a6c5b9b8901a6b4cbe5b32ec8d5282858d3ad896))
* resolved buid issue with vuepress theme ([91ae9ca](https://github.com/feather-design-system/feather-design-system/commit/91ae9ca4c5cb2139aeffd78021ab331661d492ce))
* **select:** only emitting update on click and close of menu [#23](https://github.com/feather-design-system/feather-design-system/issues/23) ([50dc0b2](https://github.com/feather-design-system/feather-design-system/commit/50dc0b26329a07c188bbed0284193e3a9d0586a0))
* updated instances using 'user-select: none' in CSS to also include vendor prefixes ([90de488](https://github.com/feather-design-system/feather-design-system/commit/90de488af3ec08e209b73b01dffd0a8090d571ab))


### Features

* ensuring schema/validation support for all form controls and building validation examples ([65bc2fb](https://github.com/feather-design-system/feather-design-system/commit/65bc2fbb88f665b8eb559ecd874fae31b891fa6f))
* **vuepress-theme:** adding new vuepress theme package ([fd893b1](https://github.com/feather-design-system/feather-design-system/commit/fd893b1a7b8d64115aaa641e7d65755232c908ea))



## [0.9.2](https://github.com/feather-design-system/feather-design-system/compare/v0.9.1...v0.9.2) (2021-12-03)


### Bug Fixes

* adjusted all p margin-bottom on mobile to 24px instead of 8 ([f40ed2a](https://github.com/feather-design-system/feather-design-system/commit/f40ed2ac02304f2daf38e7bc9f231090f5fd2627))
* docs issues ([46c5706](https://github.com/feather-design-system/feather-design-system/commit/46c5706a844af7ce74684bde1653fae694d19696))
* line height for body-small adjusted to 1.5rem. Minor adjustment made to spacing for H3 in cards ([9df8bd2](https://github.com/feather-design-system/feather-design-system/commit/9df8bd2de8e086b07369294cfadf899fdd055d6b))
* refactored SVGs for docs to not be included in the featherds/styles repo ([88f9471](https://github.com/feather-design-system/feather-design-system/commit/88f94717e77248c46b9b2d9a6ad99f084604b669))


### Features

* added Generate Docs GitHub action ([d8f1b47](https://github.com/feather-design-system/feather-design-system/commit/d8f1b47d281b737293803880813eb3abd2cf8d22))



## [0.9.1](https://github.com/feather-design-system/feather-design-system/compare/v0.2.12...v0.9.1) (2021-11-23)


### Bug Fixes

* **ripple,date-input:** disabled date input behaves as expected, ripple allows fast clicks ([1cab2df](https://github.com/feather-design-system/feather-design-system/commit/1cab2dfd8002e931b8fc4ac6ee763fb9d4e44788))


### Features

* new docs, SSR, assorted fixes, new icons and much more! ([e33e206](https://github.com/feather-design-system/feather-design-system/commit/e33e206981367b2f4a811d339f3e7603395c0b89))



## [0.2.12](https://github.com/feather-design-system/feather-design-system/compare/v0.2.11...v0.2.12) (2021-11-17)


### Bug Fixes

* **date-input:** delete/backspace now working ([ed2916d](https://github.com/feather-design-system/feather-design-system/commit/ed2916d0315837764e5d32fa1a727cd3fd5b6ea8))
* github actions Azure CLI versions stripped to avoid conflicts in future runs ([e4173d2](https://github.com/feather-design-system/feather-design-system/commit/e4173d22961133661bc6acc65abbd21be80afd63))
* **radio:** should update when modelValue is updated ([cd76b09](https://github.com/feather-design-system/feather-design-system/commit/cd76b09cf35d20c6c25977f6912e74197533bf4a))


### Features

* **icons:** new icon set added ([3c6f619](https://github.com/feather-design-system/feather-design-system/commit/3c6f619beb18b55142323d7504214a8121c16f57))
* **list:** adding switch option ([f39b173](https://github.com/feather-design-system/feather-design-system/commit/f39b1736296d94ec2d68fdadde3eb36a458d9587))



## [0.2.11](https://github.com/feather-design-system/feather-design-system/compare/v0.2.10...v0.2.11) (2021-10-19)


### Bug Fixes

* **autocomplete:** disabled chip could still be removed, fixed styling of chip label when disabled ([610706f](https://github.com/feather-design-system/feather-design-system/commit/610706f424ba60a2a3a9882db029ccf3536b7733))
* **button:** disabled icon button should have no ripple ([09476e4](https://github.com/feather-design-system/feather-design-system/commit/09476e4658b236006057c573ec9079f3736b92c2))
* **ci:** adding more depth to release checkout, hopefully changelog etc will start working now ([c1c8c5a](https://github.com/feather-design-system/feather-design-system/commit/c1c8c5ac6dc26d7eb48e7dcffca1a47ebcc84463))
* **demos:** removing auto publish of demos, making this a manual step ([d75ac32](https://github.com/feather-design-system/feather-design-system/commit/d75ac328baf8ae7b8ea61f1caf002e68828da349))
* **nav-rail:** fixing accessibility issue with navbar and icons not showing ([7d056c6](https://github.com/feather-design-system/feather-design-system/commit/7d056c6adc58e27a0d58e4760bfe1b93e75f53b3))


### Features

* **ci:** workflow dispatch on demos. ([ce92844](https://github.com/feather-design-system/feather-design-system/commit/ce92844df26725ff9d9333fac565a14575bca307))



## 0.2.10 (2021-10-05)


### Bug Fixes

* **ci:** retrying the old changelog generation method ([4af8483](https://github.com/feather-design-system/feather-design-system/commit/4af84837938e8400b2e07c3493d1eb63ee79a427))



## 0.2.9 (2021-09-30)


### Bug Fixes

* **demos:** updated deploy.yml ([d04d0cf](https://github.com/feather-design-system/feather-design-system/commit/d04d0cf4f82cca6095eb2942b1cf04d4319f8c0c))



## 0.2.8 (2021-09-30)


### Bug Fixes

* **release notes:** trying a different changelog action ([0830e44](https://github.com/feather-design-system/feather-design-system/commit/0830e44b4d3cd25dda09be62bd84a37f90426f24))



## 0.2.7 (2021-09-30)


### Bug Fixes

* **demos:** switching argument back as it was deleting the entire blob ([b15f895](https://github.com/feather-design-system/feather-design-system/commit/b15f895aa118dcbec45b4ca68b6ac92ff657d14c))



## 0.2.6 (2021-09-29)


### Bug Fixes

* **demos:** updating the cli version ([7c1963e](https://github.com/feather-design-system/feather-design-system/commit/7c1963e477a4dbc98492b804a8df8afc2874f542))



## 0.2.5 (2021-09-29)


### Bug Fixes

* **demos:** typo ([d54b28d](https://github.com/feather-design-system/feather-design-system/commit/d54b28d4d968ef7ea097b0034bf5ffb4a4d8805d))



## 0.2.4 (2021-09-24)


### Bug Fixes

* resolved broken snapshots ([be2638a](https://github.com/feather-design-system/feather-design-system/commit/be2638a1cf27da0b7f33b686c3a33f6ac9bf18fe))



## 0.2.3 (2021-09-21)



## 0.1.15 (2021-09-21)


### Bug Fixes

* **documentation:** fixes for docs site ([e40303e](https://github.com/feather-design-system/feather-design-system/commit/e40303eaa8f2192ea91dd3cc350f101531d29ae3))



## 0.2.2 (2021-09-20)


### Bug Fixes

* **build:** removing changelog, let release generate it again ([70aaf61](https://github.com/feather-design-system/feather-design-system/commit/70aaf61bc6dccc41cd7be80f414fa56076d77b5a))




