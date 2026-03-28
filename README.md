# z-proto

Prototyping shell web component for building interactive UI prototypes. Framework-agnostic, zero dependencies.

## Features

- 17 device presets (mobile, tablet, desktop) + responsive mode
- Manual width/height inputs with min-width/min-height constraints
- 5 zoom levels (50%–125%)
- 8 drag-to-resize handles
- macOS-style window chrome (traffic lights + title bar)
- Figma capture toggle (`?FIGMA_KEY=<key>` or `figma-key` attribute)
- Screenshot to clipboard (Screen Capture API)
- Light/dark theme via CSS custom properties
- CSS loaded via `import ... with { type: "css" }` + adoptedStyleSheets

## Usage

```html
<script type="module" src="https://cdn.jsdelivr.net/gh/djalmajr/z-proto@main/src/z-proto.js"></script>

<z-proto>
  <z-proto-header>
    <!-- optional: scenario selector, nav buttons -->
  </z-proto-header>
  <z-proto-body title="My App" width="1280" height="800" min-width="320" min-height="400">
    <!-- your prototype content -->
  </z-proto-body>
</z-proto>
```

## Attributes

### `<z-proto>`

| Attribute | Type | Description |
|---|---|---|
| `figma-key` | string | Figma file key for capture (also reads `?FIGMA_KEY=` from URL) |
| `zoom` | number | Initial zoom level (default: 1) |

### `<z-proto-body>`

| Attribute | Type | Default | Description |
|---|---|---|---|
| `title` | string | `""` | Window title bar text |
| `width` | number | 800 | Initial viewport width |
| `height` | number | 600 | Initial viewport height |
| `min-width` | number | 320 | Minimum resize width |
| `min-height` | number | 400 | Minimum resize height |

### Child slots

| Element | Purpose |
|---|---|
| `<z-proto-header>` | Content below toolbar (scenario selectors, etc.) |
| `<z-proto-extras>` | Content in title bar right side |
| `<z-proto-body>` | Main content area |

## Toolbar buttons

- **Screenshot** (camera icon) — captures the content area to clipboard via Screen Capture API
- **Figma** (appears when figma-key is set) — toggles `#figmacapture` hash for Figma HTML-to-Design capture

## Examples

```bash
npm run serve
# open http://localhost:8080/examples/figma-capture/
# open http://localhost:8080/examples/todo-app/
```

- **figma-capture/** — Chrome extension popup prototype using htm/preact with scene state management
- **todo-app/** — Multi-page todo app using preact-iso with client-side routing

## Local development

```bash
git clone https://github.com/djalmajr/z-proto.git
cd z-proto
npm run serve
```

## License

MIT
