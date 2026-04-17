# VitePress Migration Plan

## Summary

This conversation covered whether you should migrate from VuePress to VitePress and how to do it safely in a single repository.

Key points:
- Your current docs are built with VuePress in `docs/`.
- VitePress can coexist alongside VuePress in the same repo during migration.
- It is best to use a feature branch like `feature/vitepress` rather than a separate repository.
- You can reuse the existing CDN/path for the final cutover, but not for parallel live sites.
- Local testing of the new VitePress branch is useful, but you should also run a production build and ideally preview a deployed branch build.

## Recommended Migration Flow

1. Create a branch named `feature/vitepress`.
2. Scaffold a new VitePress site in a separate folder such as `vitepress/`.
3. Keep the old VuePress site in `docs/` unchanged while migrating.
4. Copy markdown content and examples from `docs/` into the new VitePress folder gradually.
5. Convert navigation and sidebar configuration from VuePress `docs/.vuepress/config.js` to VitePress `vitepress/config.js`.
6. Replace VuePress component registration (e.g. `@vuepress/plugin-register-components`) with VitePress client enhancement and global component registration.
7. Add new npm scripts for VitePress, while retaining the existing VuePress scripts until migration is complete.
8. Run `vitepress dev` for local testing and `vitepress build` to validate production output.
9. When VitePress is stable, remove the old VuePress site and update deployment to publish the new build to the existing CDN/path.

## Notes

- This repo currently uses a custom VuePress theme package at `packages/@featherds/vuepress-theme-featherds`.
- Examples currently live under `docs/.vuepress/examples/**/*.vue` and will need a VitePress-compatible registration path.
- A side-by-side migration allows you to keep documentation available while moving incrementally.

## Next Steps

- Inspect and map the current VuePress config and theme files to VitePress equivalents.
- Create a new VitePress config file and theme structure.
- Move the highest-priority docs pages first, such as getting started and component reference content.
- Validate the new site with both local development and a build preview.
- Plan the final cutover to the existing CDN when the VitePress branch is fully ready.
