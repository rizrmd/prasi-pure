import { useGlobal } from "../lib/use-global";

const GlobalUI = {
  code: { popup: true },
};

export const useUI = () => {
  return useGlobal(GlobalUI, "ui");
};
 