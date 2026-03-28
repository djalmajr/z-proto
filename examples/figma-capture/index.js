import { html } from "htm/preact";
import { render, createContext } from "preact";
import { useState, useContext, useCallback } from "preact/hooks";
import { createPortal } from "preact/compat";

const SCENES = ["idle", "first-use", "active", "settings"];
const LABELS = { idle: "Idle", "first-use": "1st use", active: "Hash active", settings: "Settings" };

const KEYS = [
  { id: "1", label: "Platform", fileKey: "aBcDeFgHiJkLmNoPqRsT" },
  { id: "2", label: "Application", fileKey: "xYzAbCdEfGhIjKlMnOpQ" },
];

const SceneCtx = createContext();
const useScene = () => useContext(SceneCtx);
const headerEl = document.getElementById("scene-nav");

function Icon({ name, size = 16 }) {
  return html`<iconify-icon icon="lucide:${name}" width="${size}" />`;
}

// --- Scene Nav ---

function SceneNav() {
  const { scene, goTo } = useScene();
  const idx = SCENES.indexOf(scene);

  return html`
    <div class="flex items-center gap-1">
      <button onClick=${() => goTo(SCENES[(idx - 1 + SCENES.length) % SCENES.length])} class="px-1.5 py-0.5 rounded text-[11px] text-[hsl(240_3.8%_46.1%)] hover:text-[hsl(240_10%_3.9%)]">←</button>
      <select value=${scene} onChange=${(e) => goTo(e.target.value)} class="zp-select">
        ${SCENES.map(s => html`<option value=${s}>${LABELS[s]}</option>`)}
      </select>
      <button onClick=${() => goTo(SCENES[(idx + 1) % SCENES.length])} class="px-1.5 py-0.5 rounded text-[11px] text-[hsl(240_3.8%_46.1%)] hover:text-[hsl(240_10%_3.9%)]">→</button>
    </div>
  `;
}

// --- App Header ---

function AppHeader() {
  const { scene, goTo, prevScene } = useScene();

  if (scene === "settings") {
    return html`
      <div class="flex items-center gap-2.5 px-4 py-3 border-b border-fg-border">
        <button class="text-fg-muted hover:text-white" onClick=${() => goTo(prevScene)}>
          <${Icon} name="arrow-left" />
        </button>
        <span class="text-sm font-semibold tracking-tight">Settings</span>
      </div>
    `;
  }

  return html`
    <div class="flex items-center gap-2.5 px-4 py-3 border-b border-fg-border">
      <${Icon} name="figma" size=${20} />
      <span class="text-sm font-semibold tracking-tight">Figma Capture</span>
      <div class="flex-1" />
      <button class="text-fg-muted hover:text-white" onClick=${() => goTo("settings")}>
        <${Icon} name="settings" />
      </button>
    </div>
  `;
}

// --- Scenes ---

function SceneIdle() {
  const { goTo } = useScene();
  return html`
    <div class="flex flex-col flex-1 p-4 gap-4">
      <div class="flex items-center gap-2 px-3 py-2 bg-fg-card rounded-lg border border-fg-border">
        <div class="w-2 h-2 rounded-full bg-fg-success" />
        <span class="text-xs text-fg-muted">Ready to capture</span>
      </div>
      <div class="flex flex-col gap-2 px-3 py-3 bg-fg-card rounded-lg border border-fg-border">
        <div class="flex items-center justify-between">
          <span class="text-[11px] text-fg-muted">Figma File</span>
          <span class="text-xs text-white">Platform</span>
        </div>
      </div>
      <div class="flex-1" />
      <button onClick=${() => goTo("active")} class="flex items-center justify-center gap-2 w-full py-2.5 bg-fg-purple hover:bg-fg-purple-hover text-white rounded-lg text-[13px] font-medium transition-colors">
        <${Icon} name="figma" /> Copy to Figma
      </button>
    </div>
  `;
}

function SceneFirstUse() {
  const { goTo } = useScene();
  return html`
    <div class="flex flex-col flex-1 p-4 gap-4">
      <div class="flex flex-col items-center gap-3 py-6">
        <div class="w-12 h-12 rounded-xl bg-fg-purple/10 flex items-center justify-center">
          <${Icon} name="figma" size=${24} />
        </div>
        <div class="text-center">
          <p class="text-sm font-medium text-white">Add a Figma File</p>
          <p class="text-[11px] text-fg-muted mt-1 leading-relaxed px-4">
            Enter a Figma file key.<br />Then just click the extension icon to capture.
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-[11px] font-medium text-fg-muted uppercase tracking-wider">Label</label>
        <input type="text" placeholder="Ex: Platform" class="px-3 py-1.5 bg-fg-card border border-fg-border rounded-md text-[13px] text-white placeholder:text-fg-hint outline-none focus:border-fg-purple" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-[11px] font-medium text-fg-muted uppercase tracking-wider">Figma File Key</label>
        <input type="text" placeholder="Ex: aBcDeFgHiJkLmNoPqRsT" class="px-3 py-1.5 bg-fg-card border border-fg-border rounded-md text-xs text-white font-mono placeholder:text-fg-hint outline-none focus:border-fg-purple" />
      </div>
      <div class="flex-1" />
      <button onClick=${() => goTo("idle")} class="flex items-center justify-center gap-2 w-full py-2.5 bg-fg-purple hover:bg-fg-purple-hover text-white rounded-lg text-[13px] font-medium transition-colors">
        <${Icon} name="save" /> Save and capture
      </button>
    </div>
  `;
}

function SceneActive() {
  const { goTo } = useScene();
  return html`
    <div class="flex flex-col flex-1 p-4 gap-4">
      <div class="flex items-center gap-2 px-3 py-2 bg-fg-card rounded-lg border border-fg-warning/30">
        <div class="w-2 h-2 rounded-full bg-fg-warning animate-pulse" />
        <span class="text-xs text-fg-warning">Capture hash active</span>
      </div>
      <div class="flex flex-col gap-2 px-3 py-3 bg-fg-card rounded-lg border border-fg-border">
        <div class="flex items-center justify-between">
          <span class="text-[11px] text-fg-muted">Figma File</span>
          <span class="text-xs text-white">Platform</span>
        </div>
      </div>
      <div class="py-2 px-3 bg-fg-card/50 rounded-md border border-fg-border/50">
        <span class="text-[10px] text-fg-muted leading-relaxed">
          The <b class="text-gray-400 font-medium">#hash</b> is still in the URL. Click below to remove it and return to normal.
        </span>
      </div>
      <div class="flex-1" />
      <div class="flex flex-col gap-2">
        <button class="flex items-center justify-center gap-2 w-full py-2.5 bg-fg-purple hover:bg-fg-purple-hover text-white rounded-lg text-[13px] font-medium transition-colors">
          <${Icon} name="refresh-cw" /> Capture again
        </button>
        <button onClick=${() => goTo("idle")} class="flex items-center justify-center gap-2 w-full py-2 text-fg-muted hover:text-white rounded-lg text-xs transition-colors">
          <${Icon} name="x" size=${14} /> Clear hash and reload
        </button>
      </div>
    </div>
  `;
}

function SceneSettings() {
  return html`
    <div class="flex flex-col flex-1 p-4 gap-4 overflow-auto">
      <div>
        <div class="text-[11px] font-medium text-fg-muted uppercase tracking-wider mb-2">Figma Files</div>
        <div class="flex flex-col gap-2">
          ${KEYS.map(k => html`
            <div class="flex items-center gap-2.5 px-3 py-2.5 bg-fg-card rounded-lg border ${k.id === "1" ? "border-fg-purple/30" : "border-fg-border"} cursor-pointer">
              <div class="w-2 h-2 rounded-full ${k.id === "1" ? "bg-fg-purple" : "bg-fg-border"} shrink-0" />
              <span class="text-[13px] text-white flex-1">${k.label}</span>
              <span class="text-[11px] text-fg-muted font-mono">${k.fileKey.slice(0, 6)}...${k.fileKey.slice(-2)}</span>
              <button class="text-fg-hint hover:text-fg-error shrink-0 p-1">
                <${Icon} name="trash-2" size=${12} />
              </button>
            </div>
          `)}
        </div>
        <div class="flex gap-2 mt-3">
          <input type="text" placeholder="Label" class="w-22 shrink-0 px-2.5 py-1.5 bg-fg-card border border-fg-border rounded-md text-[13px] text-white placeholder:text-fg-hint outline-none focus:border-fg-purple" />
          <input type="text" placeholder="File key" class="flex-1 min-w-0 px-2.5 py-1.5 bg-fg-card border border-fg-border rounded-md text-xs text-white font-mono placeholder:text-fg-hint outline-none focus:border-fg-purple" />
          <button class="px-2.5 py-1.5 bg-fg-purple hover:bg-fg-purple-hover rounded-md text-white shrink-0">
            <${Icon} name="plus" size=${14} />
          </button>
        </div>
        <p class="text-[11px] text-fg-hint mt-2 leading-relaxed">Click a key to activate it. The active key is used when clicking the icon.</p>
      </div>
    </div>
  `;
}

// --- App ---

const SCENE_MAP = { idle: SceneIdle, "first-use": SceneFirstUse, active: SceneActive, settings: SceneSettings };

function App() {
  const [scene, setScene] = useState("idle");
  const [prevScene, setPrevScene] = useState("idle");

  const goTo = useCallback((id) => {
    setScene((cur) => { setPrevScene(cur); return id; });
  }, []);

  const Scene = SCENE_MAP[scene];

  return html`
    <${SceneCtx.Provider} value=${{ scene, prevScene, goTo }}>
      ${createPortal(html`<${SceneNav} />`, headerEl)}
      <div class="flex flex-col min-h-full flex-1 bg-fg-dark text-white text-[13px]">
        <${AppHeader} />
        <${Scene} />
      </div>
    <//>
  `;
}

render(html`<${App} />`, document.getElementById("app"));
