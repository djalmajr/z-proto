import { html } from "htm/preact";

const DONE = ["Design landing page", "Write API documentation", "Set up CI pipeline"];

export function Completed() {
  return html`
    <div class="flex flex-col flex-1">
      <div class="flex flex-col gap-2 p-4">
        ${DONE.map(name => html`
          <div class="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-gray-100">
            <input type="checkbox" class="w-4 h-4 accent-primary rounded" checked />
            <p class="text-sm text-gray-400 line-through flex-1">${name}</p>
            <iconify-icon icon="lucide:check-circle-2" width="16" class="text-green-400"></iconify-icon>
          </div>
        `)}
      </div>
      <div class="flex flex-col items-center gap-2 py-6">
        <iconify-icon icon="lucide:party-popper" width="24" class="text-primary/60"></iconify-icon>
        <p class="text-sm font-medium text-gray-600">All done!</p>
        <p class="text-xs text-gray-400">${DONE.length} tasks completed</p>
      </div>
    </div>
  `;
}
