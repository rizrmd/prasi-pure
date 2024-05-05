import {
  Context,
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
} from "react";

const w = window as unknown as { globalContext: any };
if (!w.globalContext) {
  w.globalContext = createContext({
    global: {},
    render: () => {},
  });
}

export const GlobalContext = w.globalContext as unknown as Context<{
  global: Record<string, any>;
  render: () => void;
}>;

export const uState = useState;
export const useGlobal = <T extends object>(
  defaultValue: T,
  id: string
): T & { render: () => void } => {
  const ctx = useContext(GlobalContext);
  const { global, render } = ctx;

  if (!global[id]) {
    global[id] = defaultValue;
  }

  useEffect(() => {
    let res: any = null;
    return () => {
      if (typeof res === "function") res();
      else if (res instanceof Promise) {
        res.then((e) => {
          if (typeof e === "function") e();
        });
      }
    };
  }, []);

  const res = global[id];

  if (res) {
    res.render = (reset?: boolean) => {
      if (reset) {
        global[id] = undefined;
      }
      startTransition(render);
    };
  }

  return res as any;
};
