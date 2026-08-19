# Feature Architecture — reusable feature pattern

This document describes the feature folder architecture used in this repository and explains the purpose of each file and folder found in the existing features. The goal is to provide a clear, repeatable pattern so new features can be created that are consistent, discoverable, and easy to reuse across the app.

Use this as the canonical reference when creating or modifying features under `src/features/*`.

---

## Principles

- Feature-first: each feature is a self-contained folder with its own API accessors, UI components, constants, types, and utilities.
- Small public surface: each feature should export a small, well-documented set of things from an `index.ts` so other features and pages import from a stable path (for example: `src/features/home`).
- Separation of concerns:
  - api/ — data fetching and server wrappers
  - components/ — UI pieces composed by the feature
  - components/sections/ — smaller composable sections used by the feature shell
  - constants/ — feature-scoped constants (keys, config, mock data)
  - types/ — TypeScript types/interfaces used by the feature
  - lib/ — feature-specific helpers (pure functions, formatters)
- Server vs Client: follow the project conventions for server/client components (component names with Client suffix often imply client-side components).
- Reuse: keep cross-feature shared code in a shared utilities package or in a top-level `src/lib` or `src/components/shared` (not covered here). Feature-level code should be re-exported in a minimal way for others to consume.

---

## Folder layout (convention)

- src/features/<featureName>/
  - api/ — data fetching functions (get-*.ts). These are small wrappers that call backend endpoints or our internal fetch utility.
  - components/ — UI used only by this feature. Prefer small components and compose them into a FeatureShell (e.g., HomeShell, ModuleShell).
    - sections/ — further subdivided UI building blocks (Banners, Stores, Categories, etc.). Provide `index.tsx`, `Client` components for interactive parts, `skeleton.tsx` for loading states and `empty.tsx` for the empty-state UI.
  - constants/ — local constants or sample data for the feature.
  - lib/ — helpers and pure functions used only by this feature.
  - types/ — TypeScript definitions for this feature's domain models.
  - index.ts — re-exports the minimal API of the feature (components, key types, helpers) so other features/pages import from `src/features/<featureName>`.

Notes:
- Keep all fetch logic in api/*. Tests and server-specific code should import those functions rather than duplicating fetching logic.
- Provide `skeleton.tsx` and `empty.tsx` for each section so consumers can show consistent loading/empty states.
- Use explicit filenames (e.g., `BannersClient.tsx`) to make client-side components obvious.

---

## How to consume a feature from another feature or page

- Prefer importing the public entrypoint: `import { HomeShell } from 'src/features/home';`
- If you need a small section component directly, import the exported component from the feature package (or add it to the feature's `index.ts` if it should be public).
- Do not reach into deep file paths of other features unless necessary — keep imports to exported surfaces to allow internal reorganization.

---

## Conventions and best practices

- Naming:
  - Feature shell components: `FeatureShell.tsx` (e.g., `HomeShell.tsx`, `ModuleShell.tsx`). These assemble the sections and expose the main UI for the feature.
  - Interactive components: suffix with `Client` (e.g., `BannersClient.tsx`) to indicate they use client-side hooks or state.
  - Data fetchers: `get-*.ts` and grouped under `api/`.
  - Types: keep types close to the feature in `types/` and export them from `types/index.ts` for consumers.
- Exports: create a single `index.ts` at the feature root to re-export the feature's public pieces.
- Loading & empty states: each section should include `skeleton.tsx` and `empty.tsx` to standardize look-and-feel.
- Constants: put feature-specific constants in `constants/` (e.g., UI labels, static configs). Keep sensitive or environment-specific config outside in a proper configuration mechanism.

---

## Files in existing features

Below are the files currently present in the `home` and `modules` features with suggested explanations for why they exist and how to use them. File links point to the workspace files.

### Feature: Home

- [src/features/home/api/get-banners.ts](D:/projects/multi-tenant-stores/src/features/home/api/get-banners.ts)
  - Purpose: fetch banners data for the home page (likely from a backend endpoint). Consumers: HomeShell's Banners section.

- [src/features/home/api/get-modules.ts](D:/projects/multi-tenant-stores/src/features/home/api/get-modules.ts)
  - Purpose: fetch the list of modules (categories or feature modules) to show on the home UI.

- [src/features/home/api/index.ts](D:/projects/multi-tenant-stores/src/features/home/api/index.ts)
  - Purpose: central re-export of this feature's API functions. Other parts of the app should import from this file to decouple callers from concrete filenames.

- [src/features/home/components/HomeShell.tsx](D:/projects/multi-tenant-stores/src/features/home/components/HomeShell.tsx)
  - Purpose: main composite component that arranges Banners, Modules, and other sections to render the home page.

- [src/features/home/components/sections/Banners/BannersClient.tsx](D:/projects/multi-tenant-stores/src/features/home/components/sections/Banners/BannersClient.tsx)
  - Purpose: interactive client component that renders banners (likely includes carousel behavior, click handlers, etc.).

- [src/features/home/components/sections/Banners/index.tsx](D:/projects/multi-tenant-stores/src/features/home/components/sections/Banners/index.tsx)
  - Purpose: public entry for the Banners section. Exports the appropriate component (server or client) for consumers.

- [src/features/home/components/sections/Banners/skeleton.tsx](D:/projects/multi-tenant-stores/src/features/home/components/sections/Banners/skeleton.tsx)
  - Purpose: UI used while banners are loading — consistent placeholder.

- [src/features/home/components/sections/Banners/empty.tsx](D:/projects/multi-tenant-stores/src/features/home/components/sections/Banners/empty.tsx)
  - Purpose: UI for when the banners dataset is empty.

- [src/features/home/components/sections/Modules/ModulesClient.tsx](D:/projects/multi-tenant-stores/src/features/home/components/sections/Modules/ModulesClient.tsx)
  - Purpose: client-side component for rendering the modules list (interactive: filtering, click-to-open).

- [src/features/home/components/sections/Modules/index.tsx](D:/projects/multi-tenant-stores/src/features/home/components/sections/Modules/index.tsx)
  - Purpose: public entry for the Modules section.

- [src/features/home/components/sections/Modules/skeleton.tsx](D:/projects/multi-tenant-stores/src/features/home/components/sections/Modules/skeleton.tsx)
  - Purpose: loading placeholder for modules section.

- [src/features/home/components/sections/Modules/empty.tsx](D:/projects/multi-tenant-stores/src/features/home/components/sections/Modules/empty.tsx)
  - Purpose: empty-state display for modules.

- [src/features/home/constants/banners.ts](D:/projects/multi-tenant-stores/src/features/home/constants/banners.ts)
  - Purpose: any mock or static data used by the banners UI or sample configurations.

- [src/features/home/constants/modules.ts](D:/projects/multi-tenant-stores/src/features/home/constants/modules.ts)
  - Purpose: static or default configuration for the modules section.

- [src/features/home/types/home.types.ts](D:/projects/multi-tenant-stores/src/features/home/types/home.types.ts)
  - Purpose: TypeScript interfaces/types describing the home feature domain (Banner, Module, etc.).

- [src/features/home/types/index.ts](D:/projects/multi-tenant-stores/src/features/home/types/index.ts)
  - Purpose: re-export types for consumers.

- [src/features/home/lib/]
  - Purpose: appears empty now. Intended for helpers (formatters, mappers) used by home feature components or API wrappers. Add functions here rather than in components for testability.


### Feature: Modules

- [src/features/modules/api/get-module-detail.ts](D:/projects/multi-tenant-stores/src/features/modules/api/get-module-detail.ts)
  - Purpose: fetch detailed information for a single module (description, banners, categories).

- [src/features/modules/api/get-stores-by-module.ts](D:/projects/multi-tenant-stores/src/features/modules/api/get-stores-by-module.ts)
  - Purpose: fetch stores list for a particular module (for the Stores section).

- [src/features/modules/api/index.ts](D:/projects/multi-tenant-stores/src/features/modules/api/index.ts)
  - Purpose: re-export module-related fetchers.

- [src/features/modules/components/ModuleShell.tsx](D:/projects/multi-tenant-stores/src/features/modules/components/ModuleShell.tsx)
  - Purpose: top-level UI that composes Module header, banners, categories, and stores.

- [src/features/modules/components/ModuleDetail.tsx](D:/projects/multi-tenant-stores/src/features/modules/components/ModuleDetail.tsx)
  - Purpose: possibly a page-level component that renders the module details (could be same as or used by ModuleShell).

- Sections:
  - ModuleHeader
    - [src/features/modules/components/sections/ModuleHeader/ModuleHeaderClient.tsx](D:/projects/multi-tenant-stores/src/features/modules/components/sections/ModuleHeader/ModuleHeaderClient.tsx)
      - Purpose: header area for a module (title, quick actions), client interactive behavior.
    - skeleton/empty: same reasons as above.

  - ModuleBanners
    - [src/features/modules/components/sections/ModuleBanners/ModuleBannersClient.tsx](D:/projects/multi-tenant-stores/src/features/modules/components/sections/ModuleBanners/ModuleBannersClient.tsx)
      - Purpose: module-specific banners (carousel, promotions).

  - Categories
    - [src/features/modules/components/sections/Categories/CategoriesClient.tsx](D:/projects/multi-tenant-stores/src/features/modules/components/sections/Categories/CategoriesClient.tsx)
      - Purpose: render categories within a module; client-side interactions (filtering, expansion).

  - Stores
    - [src/features/modules/components/sections/Stores/StoresClient.tsx](D:/projects/multi-tenant-stores/src/features/modules/components/sections/Stores/StoresClient.tsx)
      - Purpose: list of stores for the module. Includes a `StoreCard.tsx` for each store rendering.
    - [src/features/modules/components/sections/Stores/StoreCard.tsx](D:/projects/multi-tenant-stores/src/features/modules/components/sections/Stores/StoreCard.tsx)
      - Purpose: presentational card for a single store; keep this small and stateless so other features can reuse it.

- [src/features/modules/constants/module-detail.ts](D:/projects/multi-tenant-stores/src/features/modules/constants/module-detail.ts)
  - Purpose: static config or sample data for the module detail UI.

- [src/features/modules/constants/stores.ts](D:/projects/multi-tenant-stores/src/features/modules/constants/stores.ts)
  - Purpose: static list or mock data for stores.

- [src/features/modules/types/modules.types.ts](D:/projects/multi-tenant-stores/src/features/modules/types/modules.types.ts)
  - Purpose: TypeScript types for module domain models (ModuleDetail, Store, Category, etc.).

- [src/features/modules/types/index.ts](D:/projects/multi-tenant-stores/src/features/modules/types/index.ts)
  - Purpose: re-export feature types.

---

## Recommendations for making feature pieces reusable

1. Export small presentational components from a feature's `components/` if they are generic (for example `StoreCard.tsx`) and document the props. If many features need the same component, consider moving it to a shared `src/components/` directory.
2. Keep `api/` functions pure and side-effect free (return typed data). Wrap network-specific behavior (headers, auth) in a shared request helper rather than inside feature API functions.
3. Use index files to control the exported surface:
   - src/features/featureName/index.ts
     - export { default as FeatureShell } from './components/FeatureShell';
     - export * as types from './types';
4. Document public contracts (props, expected shapes) in the component file or using JSDoc/TSDoc so consumers can rely on them.
5. For cross-feature imports, prefer `import { StoreCard } from 'src/features/modules/components/sections/Stores/StoreCard'` only if `StoreCard` is considered stable public API. Better: add `export { StoreCard } from './components/sections/Stores/StoreCard'` to `src/features/modules/index.ts` and import from `src/features/modules`.

---

## How to add a new feature

1. Create `src/features/<newFeature>/`.
2. Add `api/`, `components/` (with `sections/`), `constants/`, `types/`, and (optionally) `lib/` following the structure above.
3. Implement feature `index.ts` to export the minimal public API.
4. Add skeleton and empty states to make UI transitions consistent.
5. If a component will be reused across features, promote it to a shared location and update imports.

---

## Example export pattern for a feature index.ts

```ts
// src/features/<feature>/index.ts
export { default as FeatureShell } from './components/FeatureShell';
export * as api from './api';
export * as types from './types';
```

This keeps imports consistent and easy to refactor later.

---

If there are particular files you want me to inspect and write more precise descriptions for (for example the internal props of `StoreCard.tsx` or the exact API call in `get-banners.ts`), point them out and the file contents will be summarized and included in this doc.
