import { getModules } from "@/features/home/api";
import { ModulesClient } from "./ModulesClient";
import ModulesEmpty from "./empty";
import ModulesSkeleton from "./skeleton";

/**
 * Server entry for home modules / categories.
 */
export const Modules = Object.assign(
  async function Modules() {
    // fetch backend data 
    const result = await getModules();
    
    // fetch mock data
    // const modules = MOCK_MODULES;
    if (!result.success || result.data.length === 0) {
      return <ModulesEmpty />;
    }

    return <ModulesClient modules={result.data} />;
  },
  { skeleton: ModulesSkeleton, empty: ModulesEmpty }
);