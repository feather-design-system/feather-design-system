# Declaration & Build Notes

Summary
-------

This repo uses a two-phase build for each package:

- A pre-build step run via `lerna run compile --parallel` which executes each package's `compile` script (commonly `tsc --declaration`). This produces `.d.ts` files and performs type checking.
- A bundling step driven by `node scripts/build.js` (calls Vite) that produces distributable JS in each package `dist/` folder.

Why this matters
-----------------

- `vite build` is configured to bundle JS but does not emit TypeScript declaration files.
- `tsc --declaration` is used to generate `.d.ts` files for consumers and to catch type errors before bundling.

Findings
--------

- Packages that have a `compile` script:
  - `@featherds/composables`
  - `@featherds/utils`
  - `@featherds/autocomplete`
  - `@featherds/input`
  - `@featherds/select`
  - `@featherds/styles` (uses a custom `node build/post.js`)

- Packages that already include hand-authored `src/index.d.ts` files (so `tsc --declaration` is likely redundant for them):
  - `@featherds/select` (has `packages/@featherds/select/src/index.d.ts`)
  - `@featherds/input` (has `packages/@featherds/input/src/index.d.ts`)
  - `@featherds/autocomplete` (has `packages/@featherds/autocomplete/src/index.d.ts`)

- Packages that appear to need `tsc` to generate declarations:
  - `@featherds/utils` (TypeScript sources, no `src/index.d.ts`)
  - `@featherds/composables` (TypeScript sources, no `src/index.d.ts`)

- `@featherds/styles` has a custom compile step for CSS and should keep its compile script.

Recommendations (minimal / safe)
--------------------------------

1. Keep the `compile` step for packages that need generated `.d.ts` files (`@featherds/utils`, `@featherds/composables`) and for `@featherds/styles` (custom script).
2. Remove the `compile` script from packages that already ship `src/index.d.ts` (`@featherds/select`, `@featherds/input`, `@featherds/autocomplete`) so `lerna run compile` doesn't re-run `tsc` for them.
   - Alternative: leave package `compile` scripts but change the root `compile` invocation to only target packages that need it.

Suggested commands
------------------

- Run the bundler-only build (skip Lerna pre-compile):

```bash
node scripts/build.js
```

- Run declarations-only for specific packages with Lerna:

```bash
npx lerna run compile --scope @featherds/utils --scope @featherds/composables --scope @featherds/styles --parallel
```

- To stop redundant `tsc` runs, edit the package `package.json` files and remove the `compile` script (or set it to a no-op) for `select`, `input`, and `autocomplete`.

Further improvements (optional)
------------------------------

- Adopt TypeScript project references (`composite` + `references`) and `emitDeclarationOnly` to centralize declaration generation and avoid duplicated compilation.
- Replace the root `compile` with an explicit list of packages that should emit declarations (script or `lerna` flags), so CI and local builds are deterministic.

If you want, I can implement the minimal change (either remove the three redundant `compile` scripts, or modify the root `compile` invocation) and run a local build to verify. Let me know which approach you prefer.
