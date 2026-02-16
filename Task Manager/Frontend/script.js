const API_URL = "http://localhost:5000/tasks";

async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    const list = document.getElementById('taskList');
    const countText = document.getElementById('taskCount');
    
    // Update Counter
    const activeTasks = tasks.filter(t => !t.completed).length;
    countText.innerText = `${activeTasks} tugas aktif`;

    if (tasks.length === 0) {
        list.innerHTML = `<div class="text-center py-10 text-slate-400 text-sm">Belum ada rencana hari ini.</div>`;
        return;
    }

    list.innerHTML = "";
    tasks.forEach(task => {
        list.innerHTML += `
            <li class="flex items-center justify-between p-4 rounded-xl border ${task.completed ? 'bg-slate-50 border-slate-100' : 'bg-white border-slate-200 shadow-sm'} transition-all">
                <div class="flex items-center gap-3">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} 
                        onchange="toggleTask(${task.id})"
                        class="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500">
                    <span class="${task.completed ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}">
                        ${task.title}
                    </span>
                </div>
                <button onclick="deleteTask(${task.id})" class="text-slate-300 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </li>
        `;
    });
}

async function addTask() {
    const input = document.getElementById('taskInput');
    if (!input.value.trim()) return; // Jangan tambah jika kosong

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: input.value })
    });
    input.value = "";
    fetchTasks();
}

async function toggleTask(id) {
    await fetch(`${API_URL}/${id}`, { method: 'PATCH' });
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTasks();
}

fetchTasks();