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
  const result = await getModuleDetail(moduleId); // returns null if not found
  // const result=MOCK_MODULE_DETAIL;

  if (!result.success || !result.data) return <ModuleHeaderEmpty />;

  return (
    <>
      <ModuleHeaderClient module={result.data} />

      {result.data.banners.length > 0 ? (
        <ModuleBannersClient banners={result.data.banners} />
      ) : (
        <ModuleBannersEmpty />
      )}

      {result.data.categories.length > 0 ? (
        <CategoriesClient categories={result.data.categories} activeCategoryId={categoryId} />
      ) : (
        <CategoriesEmpty />
      )}
    </>
  );
}
