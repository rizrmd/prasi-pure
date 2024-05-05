import { GlobalContext } from "@/lib/use-global";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "./parts/router";
import { initWS } from "./ws/init";
import { dbProxy } from "@/lib/db-client";

document.body.innerHTML = '<div id="root"></div>';

const Provider = GlobalContext.Provider;
const el = document.getElementById("root");

if (el) {
  initWS();

  const w = window as any;
  const cur = new URL(w.basehost || location.href);
  const base_url = `${cur.protocol}//${cur.host}`;
  w._db = dbProxy(base_url);

  const root = createRoot(el);
  const Root = () => {
    const [, render] = useState({});
    return (
      <Provider
        value={{
          global: {},
          render() {
            render({});
          },
        }}
      >
        <Router />
      </Provider>
    );
  };
  root.render(<Root />);
}
