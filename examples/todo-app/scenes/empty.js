import { html } from "htm/preact";

export function Empty() {
  return html`
    <div class="flex flex-col flex-1 items-center justify-center gap-3 p-8">
      <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
        <iconify-icon icon="lucide:clipboard-list" width="28" class="text-primary/40"></iconify-icon>
      </div>
      <p class="text-sm font-medium text-gray-500">No tasks yet</p>
      <p class="text-xs text-gray-400 text-center">Click "Add task" to create your first one.</p>
    </div>
  `;
}
