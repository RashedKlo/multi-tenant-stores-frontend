// features/modules/components/ModuleDetail.tsx
import { getModuleDetail } from "@/features/modules/api";
import { ModuleHeaderClient } from "./sections/ModuleHeader/ModuleHeaderClient";
import { ModuleBannersClient } from "./sections/ModuleBanners/ModuleBannersClient";
import { CategoriesClient } from "./sections/Categories/CategoriesClient";
import ModuleHeaderEmpty from "./sections/ModuleHeader/empty";
import ModuleBannersEmpty from "./sections/ModuleBanners/empty";
import CategoriesEmpty from "./sections/Categories/empty";
import { MOCK_MODULE_DETAIL } from "../constants/module-detail";

interface ModuleDetailProps {
  moduleId: string;
  /** From searchParams — keeps categories/stores filter in sync */
  categoryId?: string;
}

/**
 * Fetches ModuleDetail once (server) and distributes data
 * to presentational sections. Empty states are handled per-section.
 */
export async function ModuleDetail({ moduleId, categoryId }: ModuleDetailProps) {
  // const mod = await getModuleDetail(moduleId); // returns null if not found
  const mod=MOCK_MODULE_DETAIL;

  if (!mod) return <ModuleHeaderEmpty />;

  return (
    <>
      <ModuleHeaderClient module={mod} />

      {mod.banners.length > 0 ? (
        <ModuleBannersClient banners={mod.banners} />
      ) : (
        <ModuleBannersEmpty />
      )}

      {mod.categories.length > 0 ? (
        <CategoriesClient categories={mod.categories} activeCategoryId={categoryId} />
      ) : (
        <CategoriesEmpty />
      )}
    </>
  );
}
