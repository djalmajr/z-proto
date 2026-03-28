import { html } from "htm/preact";
import { render } from "preact";
import { createPortal } from "preact/compat";
import { LocationProvider, Router, Route, useLocation } from "preact-iso";
import { useCallback } from "preact/hooks";
import { Empty } from "./scenes/empty.js";
import { List } from "./scenes/list.js";
import { AddTask } from "./scenes/add-task.js";
import { Completed } from "./scenes/completed.js";

const BASE = new URL(document.baseURI).pathname.replace(/\/$/, "");

const SCENES = [
  { path: `${BASE}/`, label: "Empty state", Component: Empty },
  { path: `${BASE}/list`, label: "With tasks", Component: List },
  { path: `${BASE}/add`, label: "Adding task", Component: AddTask },
  { path: `${BASE}/completed`, label: "All completed", Component: Completed },
];

const headerEl = document.querySelector("z-proto-header");

function SceneNav() {
  const { path, route } = useLocation();
  const current = SCENES.find((s) => s.path === path || s.path === path + "/" || s.path + "/" === path) || SCENES[0];
  const idx = SCENES.indexOf(current);

  const prev = useCallback(() => {
    route(SCENES[(idx - 1 + SCENES.length) % SCENES.length].path);
  }, [idx, route]);

  const next = useCallback(() => {
    route(SCENES[(idx + 1) % SCENES.length].path);
  }, [idx, route]);

  return html`
    <div class="flex items-center gap-1">
      <button onClick=${prev} class="px-1.5 py-0.5 rounded text-[11px] text-[hsl(240_3.8%_46.1%)] hover:text-[hsl(240_10%_3.9%)]">←</button>
      <select value=${current.path} onChange=${(e) => route(e.target.value)} class="zp-select">
        ${SCENES.map((s) => html`<option value=${s.path}>${s.label}</option>`)}
      </select>
      <button onClick=${next} class="px-1.5 py-0.5 rounded text-[11px] text-[hsl(240_3.8%_46.1%)] hover:text-[hsl(240_10%_3.9%)]">→</button>
    </div>
  `;
}

function Header() {
  const { route } = useLocation();
  return html`
    <div class="flex items-center justify-between px-5 py-4 bg-white border-b border-gray-200">
      <div>
        <h1 class="text-lg font-semibold text-gray-900">My Tasks</h1>
        <p class="text-xs text-gray-400 mt-0.5">Prototype</p>
      </div>
      <button onClick=${() => route(`${BASE}/add`)} class="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-fg rounded-lg text-sm font-medium">
        <iconify-icon icon="lucide:plus" width="14"></iconify-icon>
        Add task
      </button>
    </div>
  `;
}

function App() {
  return html`
    <${LocationProvider}>
      ${createPortal(html`<${SceneNav} />`, headerEl)}
      <div class="flex flex-col flex-1 bg-gray-50 overflow-hidden">
        <${Header} />
        <${Router}>
          ${SCENES.map((s) => html`<${Route} path=${s.path} component=${s.Component} />`)}
        <//>
      </div>
    <//>
  `;
}

render(html`<${App} />`, document.getElementById("app"));
