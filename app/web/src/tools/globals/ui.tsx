import { useGlobal } from "../lib/use-global";

const GlobalUI = {
  code: { popup: false },
};

export const useUI = () => {
  return useGlobal(GlobalUI, "ui");
};
