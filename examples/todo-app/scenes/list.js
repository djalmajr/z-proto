import { html } from "htm/preact";

const TASKS = [
  { name: "Design landing page", due: "Due tomorrow", priority: "High", pClass: "bg-red-50 text-red-500" },
  { name: "Write API documentation", due: "Due in 3 days", priority: "Medium", pClass: "bg-yellow-50 text-yellow-600" },
  { name: "Set up CI pipeline", due: "Completed", priority: "Low", pClass: "bg-gray-100 text-gray-400", done: true },
  { name: "Review pull requests", due: "Due today", priority: "High", pClass: "bg-red-50 text-red-500" },
  { name: "Update dependencies", due: "Due next week", priority: "Low", pClass: "bg-blue-50 text-blue-500" },
];

function TaskItem({ task }) {
  return html`
    <div class="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-gray-200 shadow-sm">
      <input type="checkbox" class="w-4 h-4 accent-primary rounded" checked=${task.done} />
      <div class="flex-1 min-w-0">
        <p class="text-sm ${task.done ? "text-gray-400 line-through" : "text-gray-800"}">${task.name}</p>
        <p class="text-[11px] ${task.done ? "text-gray-300" : "text-gray-400"} mt-0.5">${task.due}</p>
      </div>
      <span class="px-2 py-0.5 text-[10px] font-medium rounded-full ${task.pClass}">${task.priority}</span>
    </div>
  `;
}

export function List() {
  return html`
    <div class="flex flex-col flex-1 overflow-auto">
      <div class="flex flex-col gap-2 p-4">
        ${TASKS.map(t => html`<${TaskItem} task=${t} />`)}
      </div>
    </div>
  `;
}
