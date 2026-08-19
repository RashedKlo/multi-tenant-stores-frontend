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
}

/**
 * Fetches ModuleDetail once and distributes the data
 * to pure presentational sections.
 */
export async function ModuleDetail({ moduleId }: ModuleDetailProps) {
    //fetch backend data
    const module = await getModuleDetail(moduleId);
    //fetch mock data
    // const module=MOCK_MODULE_DETAIL;

  if (!module) {
    return <ModuleHeaderEmpty />;
  }

  return (
    <>
      <ModuleHeaderClient module={module} />

      {module.banners.length > 0 ? (
        <ModuleBannersClient banners={module.banners} />
      ) : (
        <ModuleBannersEmpty />
      )}

      {module.categories.length > 0 ? (
        <CategoriesClient categories={module.categories} moduleId={moduleId} />
      ) : (
        <CategoriesEmpty />
      )}
    </>
  );
}