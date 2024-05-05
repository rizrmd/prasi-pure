import { useEffect, useRef, useState } from "react";

export const useLocal = <T extends object>(
  data: T,
  effect?: (arg: {
    init: boolean;
  }) => Promise<void | (() => void)> | void | (() => void),
  deps?: any[]
): {
  [K in keyof T]: T[K] extends Promise<any> ? null | Awaited<T[K]> : T[K];
} & { render: () => void } => {
  const [, _render] = useState({});
  const _ = useRef({
    data: data as unknown as T & {
      render: () => void;
    },
    deps: (deps || []) as any[],
    ready: false,
    _loading: {} as any,
  });
  const local = _.current;

  useEffect(() => {
    local.ready = true;
    if (effect) effect({ init: true });
  }, []);

  if (local.ready === false) {
    local._loading = {};

    local.data.render = () => {
      if (local.ready) _render({});
    };
  } else {
    if (local.deps.length > 0 && deps) {
      for (const [k, dep] of Object.entries(deps) as any) {
        if (local.deps[k] !== dep) {
          local.deps[k] = dep;

          if (effect) {
            setTimeout(() => {
              effect({ init: false });
            });
          }
          break;
        }
      }
    }
  }

  return local.data as any;
};
