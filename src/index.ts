import {v4 as uuidV4} from "uuid";

type Task = {id:string,title:string,completed:boolean,createdAt:
  Date};



const list=document.querySelector<HTMLUListElement>("#list");
const form=document.getElementById("new-task-form") as HTMLFormElement | null; 
const input=document.querySelector<HTMLInputElement>("#new-task-title");


let tasks:Task[] = loadTasks();
tasks.forEach(addListItem);

form?.addEventListener("submit", e=> {
  e.preventDefault();
  if(input?.value =="" || input?.value == null) return;

  const newTask :Task= {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  }
  tasks.push(newTask);
  addListItem(newTask);
  input.value="";
});

function addListItem(task: Task): boolean{
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const del = document.createElement("button");
  checkbox.addEventListener("change",() => {
    task.completed = checkbox.checked;
    saveTasks();

  });
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  del.value = task.id;
  del.name = task.title;
  del.innerHTML = "Delete";
  label.append(checkbox,task.title,del);
  item.append(label);
  list?.append(item);
  del.addEventListener("click" , () => {
    
    let temp = localStorage.getItem("TASKS");
    if(temp==null) return;
    let tem:Task[] = JSON.parse(temp);
    console.log(`tem`, tem);
    console.log(`del.value`, del.value);
    const newtasks = tem.filter((task) => {task.id === del.value});
    console.log(`newtasks`, newtasks);
    // localStorage.clear();
    localStorage.setItem("TASKS",JSON.stringify(newtasks));
    // location.reload();
  });
  return true;
}

function saveTasks(){
  localStorage.setItem("TASKS",JSON.stringify(tasks));
}

function loadTasks() : Task[]{
  const taskJSON = localStorage.getItem("TASKS");
  if(taskJSON == null) return [];
  return JSON.parse(taskJSON);
}