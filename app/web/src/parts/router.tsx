import { useLocal } from "@/lib/use-local";
import { createRouter } from "radix3";
import { routes } from "../pages";

const w = window as unknown as { params: any };
export const Router = () => {
  const local = useLocal(
    { router: createRouter<{ url: string | string[]; page: any }>({}) },
    () => {
      for (const route of routes) {
        const { url, page } = route;
        if (Array.isArray(url)) {
          url.map((url) => local.router.insert(url, route));
        } else {
          local.router.insert(url, route);
        }
      }
      local.render();
    }
  );

  const found = local.router.lookup(location.pathname);
  w.params = found?.params || {};
  if (found && found.page) return <found.page />;
  return null;
};
