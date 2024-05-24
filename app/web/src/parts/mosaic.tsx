import { useLocal } from "@/lib/use-local";
import { ReactElement, useContext } from "react";
import {
  Mosaic,
  MosaicBranch,
  MosaicContext,
  MosaicNode,
  MosaicWindow,
} from "react-mosaic-component";
import "react-mosaic-component/react-mosaic-component.css";
import { PaneItemTree } from "./pane/item-tree";
import { PaneEditor } from "./pane/editor";
import { PaneProps } from "./pane/props";

type ViewId = keyof typeof Panes;

export const Panes = {
  "item-tree": PaneItemTree,
  editor: PaneEditor,
  props: PaneProps,
};

const defaultMosaic = () => {
  return localStorage.prasi_mosaic
    ? JSON.parse(localStorage.prasi_mosaic)
    : ({
        direction: "row",
        first: "item-tree",
        second: {
          direction: "row",
          first: "editor",
          second: "props",
          splitPercentage: 80,
        },
        splitPercentage: 15,
      } as MosaicNode<ViewId>);
};

export const PMosaic = () => {
  const local = useLocal(
    {
      value: defaultMosaic(),
      comps: {} as Record<string, ReactElement>,
    },
    () => {
      for (const [k, Comp] of Object.entries(Panes)) {
        local.comps[k] = <Comp />;
      }
      local.render();
    }
  );

  if (Object.keys(local.comps).length === 0) return null;

  return (
    <div
      className={cx(
        "p-w-full p-h-full p-bg-background",
        css`
          .mosaic-root {
            background: hsl(var(--background));
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }
          .mosaic-tile,
          .mosaic-window,
          .mosaic-preview {
            border: 0 !important;
            border-image-width: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }
          .mosaic-window-toolbar {
            display: none !important;
          }

          .mosaic-split.-row {
            .mosaic-split-line {
              border-left: 1px solid #e2e8f0;
            }
          }
          .mosaic-split.-column {
            .mosaic-split-line {
              border-top: 1px solid #e2e8f0;
            }
          }

          .dark {
            .mosaic-split.-row {
              .mosaic-split-line {
                border-left: 1px solid #1e293b;
              }
            }
            .mosaic-split.-column {
              .mosaic-split-line {
                border-top: 1px solid #1e293b;
              }
            }
          }

          .mosaic-split:hover {
            .mosaic-split-line {
              border: 0 !important;
            }
          }
        `
      )}
    >
      <Mosaic<string>
        onChange={(val) => {
          local.value = val;
          localStorage.prasi_mosaic = JSON.stringify(val);
          local.render();
        }}
        resize={{ minimumPaneSizePercentage: 10 }}
        renderTile={(id, path) => (
          <MosaicWindow<ViewId>
            path={path}
            title={id}
            renderPreview={({ children }) => {
              return <div className="mosaic-preview">{children}</div>;
            }}
            renderToolbar={(cur) => {
              return (
                <div className="p-w-full p-h-full p-flex">
                  <WindowTitle path={cur.path} value={local.value} />
                </div>
              );
            }}
          >
            <div className="p-bg-background p-w-full p-h-full p-flex p-flex-col">
              {local.comps[id]}
            </div>
          </MosaicWindow>
        )}
        value={local.value}
      />
    </div>
  );
};

const WindowTitle = ({
  value,
  path,
}: {
  value: MosaicNode<string>;
  path: MosaicBranch[];
}) => {
  const ctx = useContext(MosaicContext);
  return (
    <div
      className="p-w-full p-h-full p-flex p-bg-background"
      onDoubleClick={() => {
        ctx.mosaicActions.expand(path);
      }}
    >
      {path}
    </div>
  );
};
