import { getModules } from "@/features/home/api";
import { ModulesClient } from "./ModulesClient";
import ModulesEmpty from "./empty";
import ModulesSkeleton from "./skeleton";
import { MOCK_MODULES } from "@/features/home/constants/modules";

/**
 * Server entry for home modules / categories.
 */
export const Modules = Object.assign(
  async function Modules() {
    // fetch backend data 
    const modules = await getModules();
    
    // fetch mock data
    // const modules = MOCK_MODULES;
    if (!modules.length) {
      return <ModulesEmpty />;
    }

    return <ModulesClient modules={modules} />;
  },
  { skeleton: ModulesSkeleton, empty: ModulesEmpty }
);