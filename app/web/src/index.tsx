import { initWindow, w } from "@/globals/window";
import { GlobalContext } from "@/lib/use-global";
import { ThemeProvider } from "@parts/theme/use-theme";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "./parts/router";
import { initWS } from "./ws/init";
document.body.innerHTML = '<div id="root"></div>';

const Provider = GlobalContext.Provider;
const el = document.getElementById("root");

if (el) {
  initWS();
  const cur = new URL(w.basehost || location.href);
  const base_url = `${cur.protocol}//${cur.host}`;
  initWindow(base_url);

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
        <ThemeProvider defaultTheme="light" storageKey="prasi_theme">
          <Router />
        </ThemeProvider>
      </Provider>
    );
  };
  root.render(<Root />);
}
