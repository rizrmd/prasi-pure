import { createRoot } from "react-dom/client";

document.body.innerHTML = '<div id="root"></div>';

const el = document.getElementById("root");
if (el) {
  const root = createRoot(el);
  root.render(<h1>joni joni yes papa</h1>);
}
