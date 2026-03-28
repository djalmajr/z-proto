import { html } from "htm/preact";
import { useLocation } from "preact-iso";

export function AddTask() {
  const { route } = useLocation();
  const back = () => route("../list");

  return html`
    <div class="flex flex-col flex-1">
      <div class="flex flex-col gap-4 p-5">
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-gray-500">Task name</label>
          <input type="text" value="Prepare sprint demo" class="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-gray-500">Description</label>
          <textarea rows="3" class="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none" placeholder="Optional details..."></textarea>
        </div>
        <div class="flex gap-3">
          <div class="flex flex-col gap-1.5 flex-1">
            <label class="text-xs font-medium text-gray-500">Priority</label>
            <select class="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:border-primary">
              <option>High</option>
              <option selected>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div class="flex flex-col gap-1.5 flex-1">
            <label class="text-xs font-medium text-gray-500">Due date</label>
            <input type="date" value="2026-04-02" class="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:border-primary" />
          </div>
        </div>
      </div>
      <div class="mt-auto flex gap-2 p-5 border-t border-gray-200 bg-white">
        <button onClick=${back} class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
        <button onClick=${back} class="flex-1 px-4 py-2 bg-primary text-primary-fg rounded-lg text-sm font-medium">Save</button>
      </div>
    </div>
  `;
}
