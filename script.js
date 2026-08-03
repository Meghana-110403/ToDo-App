const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const filterButtons = document.querySelectorAll(".filter-buttons button");
const totalEl = document.getElementById("total");
const completedEl = document.getElementById("completed");
const pendingEl = document.getElementById("pending");
const progressBar = document.getElementById("progressBar");
const clearCompletedBtn = document.getElementById("clearCompleted");
const emptyMessage = document.getElementById("emptyMessage");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter="all";
function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
function addTask(){
    const text = taskInput.value.trim();
    if(text===""){
        alert("please enter a task.");
        return;
    }
    const task={
        id:Date.now(),text:text,completed:false,date:new Date().toLocaleString()
    };
    tasks.push(task);
    saveTasks();
    taskInput.value="";
    renderTasks();
}
function deleteTask(id){
    tasks=tasks.filter(task=>task.id!==id);
    saveTasks();
    renderTasks();
}
function toggleTask(id){
    tasks=tasks.map(task=>{
        if(task.id===id){
            return {
                ...task,completed: !task.completed
            };
        }
        return task;
    });
    saveTasks();
    renderTasks();
}
function clearCompleted(){
    tasks = tasks.filter(task=>!task.completed);
    saveTasks();
    renderTasks();
}
function updateStats(){
    const total=tasks.length;
    const completed = tasks.filter(task=>task.completed).length;
    const pending = total-completed;
    totalEl.textContent=total;
    completedEl.textContent=completed;
    pendingEl.textContent=pending;
    const progress = total===0?0:(completed/total)*100;
    progressBar.style.width=progress+"%";
}
function renderTasks(){
    taskList.innerHTML="";
    const searchValue = searchInput.value.toLowerCase();
    const filteredTasks = tasks
    .filter(task=>{
        const matchSearch=task.text.toLowerCase().includes(searchValue);
        const matchFilter=
        currentFilter==="all"
        ? true
        : currentFilter==="completed" 
        ?task.completed
        : !task.completed;
        return matchSearch && matchFilter;
    })
    .sort((a,b)=>{
        if(sortSelect.value==="new"){
            return b.id-a.id;
        }
        return a.id-b.id;
    });
    if(filteredTasks.length===0){
        emptyMessage.style.display="block";
    } else{
        emptyMessage.style.display="none";
    }
    filteredTasks.map(task=>{
        const card=document.createElement("div");
        card.className="card";
        card.innerHTML=`
        <div class="left">
        <input type="checkbox" ${task.completed ? "checked" : ""}>
        <div>
        <div class="task-text ${task.completed ? "completed" : ""}">
        ${task.text}
        </div>
        <div class="date">
        ${task.date}
        </div>
        </div>
        </div>
        <button class="delete">
        Delete
        </button>
        `;
        card.querySelector("input").addEventListener("change",()=>{
            toggleTask(task.id);
        });
        card.querySelector(".delete").addEventListener("click",()=>{
            deleteTask(task.id);
        });
        taskList.appendChild(card);
    });
    updateStats();
}
addBtn.addEventListener("click",addTask);
taskInput.addEventListener("keypress",function(e){
    if(e.key==="Enter"){
        addTask();
    }
});
searchInput.addEventListener("input",renderTasks);
sortSelect.addEventListener("change",renderTasks);
filterButtons.forEach(button=>{
    button.addEventListener("click",()=>{
        filterButtons.forEach(btn=>btn.classList.remove("active"));
        button.classList.add("active");
        currentFilter=button.dataset.filter;
        renderTasks();
    });
});
clearCompletedBtn.addEventListener("click",clearCompleted);
renderTasks();