let counter=0;
let span =document.getElementById("counter");

async function dataFetch(){
    try{
        let response = await fetch('https://dummyjson.com/todos');
        let result = await response.json();
        if (response.ok){
           /* alert("data fetched");*/
           AddAtLocal(result.todos);
           sendDataTotable();
            return;
        }
        else{
            alert("error happen");
        }
    }
    catch(err){alert("error happen");}
    
}


async function sendDataTotable(){
   let result =await getFromLocal();
console.log(result);
let todos= result;
span.innerHTML=todos.length;

    let tableBody = document.getElementById("bodyTable");
   tableBody.innerHTML=" ";
    todos.forEach(element => {
        let roww = document.createElement('tr');
        tableBody.append(roww);

        let tdId = document.createElement('td');
        tdId.textContent=element.id;
        roww.append(tdId);

        let todoT = document.createElement('td');
        todoT.textContent=element.todo;
        todoT.classList.add("listOfTasks");
        
        

        let userIdd = document.createElement('td');
        userIdd.textContent = element.userId;
       

        let statuss =document.createElement('td');
        if(element.completed){
            statuss.textContent="Completed";
            todoT.classList.add("complete");
        }else{
             statuss.textContent="Pending";
        }
     roww.append(todoT);
      roww.append(userIdd);
        roww.append(statuss);

        let btnss = document.createElement('td');
        
        let btnDelete = document.createElement("button");
        btnDelete.textContent="Delete";
        btnDelete.classList.add("delete");
        btnss.append(btnDelete);
        

        let btnDone = document.createElement('button');
        btnDone.textContent="Done";
        btnDone.classList.add("done");
        btnss.append(btnDone);
        roww.append(btnss);

    });
    
}

function AddAtLocal(todoos){
    localStorage.setItem('todos', JSON.stringify(todoos));

}
function getFromLocal(){
    let storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
console.log(storedTodos);
    return storedTodos;


}
/****************** */
let addbut = document.querySelector(".add");
addbut.onclick= function AddNewTask(){
    let tasks = getFromLocal();
    let tasktext = document.getElementById("newTask");
    console.log(tasktext.value);
    if (tasktext.value != ''){
console.log({"id":tasks.length,"todo":tasktext.value,"completed":false,"userId":"1000"});
    tasks.push({"id":(tasks.length)+1,"todo":tasktext.value,"completed":false,"userId":"1000"});
    tasktext.value="";
    AddAtLocal(tasks);
sendDataTotable();
    }else{
        alert("Please write task");
    }
    
}
//*********************************************** */
let table = document.getElementById("tabletask");
table.addEventListener("click",(event)=>{
   if(event.target.classList.contains ("delete")){
    let row = event.target.closest("tr");
    let id = row.querySelector("td").textContent;
   
    deleteTaskpart(id, row);
   }
});

 function deleteTaskpart(id, row){
if (confirm("Are you sure to Delete?")){
    let tasks=getFromLocal();
    let newtasks = tasks.filter(task =>task.id != id);
    AddAtLocal(newtasks);

  sendDataTotable();
}
 }
 /********************************** */
 
async function sendFilteredDataTotable(todo){
   
let todos= todo;


    let tableBody = document.getElementById("bodyTable");
   tableBody.innerHTML=" ";
    todos.forEach(element => {
        let roww = document.createElement('tr');
        tableBody.append(roww);

        let tdId = document.createElement('td');
        tdId.textContent=element.id;
        roww.append(tdId);

        let todoT = document.createElement('td');
        todoT.textContent=element.todo;
        todoT.classList.add("listOfTasks");
        
        

        let userIdd = document.createElement('td');
        userIdd.textContent = element.userId;
       

        let statuss =document.createElement('td');
        if(element.completed){
            statuss.textContent="Completed";
            todoT.classList.add("complete");
        }else{
             statuss.textContent="Pending";
        }
     roww.append(todoT);
      roww.append(userIdd);
        roww.append(statuss);

        let btnss = document.createElement('td');
        
        let btnDelete = document.createElement("button");
        btnDelete.textContent="Delete";
        btnDelete.classList.add("delete");
        btnss.append(btnDelete);
        

        let btnDone = document.createElement('button');
        btnDone.textContent="Done";
        btnDone.classList.add("done");
        btnss.append(btnDone);
        roww.append(btnss);

    });
    
}
 /****************** */
 let tablee = document.getElementById("tabletask");

 tablee.addEventListener("click",(event)=>{
    if(event.target.classList.contains("done")){
        let trdone = event.target.closest("tr");
        let iddone = trdone.querySelector('td').textContent;
        donedTask(iddone);

    }
 });
function donedTask(id){
let list = getFromLocal();
if(!list[id-1].completed){
list[id-1].completed=true;
 AddAtLocal(list);
  sendDataTotable();
  alert("Done Task! GREAT JOB :)");
}else{
alert("Task Finished Already! Done Another Task ;)");
}


}

let search = document.getElementById("searchTask");
let lisst= getFromLocal();
search.addEventListener("keyup",()=>{
    
lisst= getFromLocal();
console.log(lisst);
let textt = search.value.toLowerCase();
let arrayTaskFilter = [];

lisst.map((e)=>{if (e.todo.toLowerCase().startsWith(textt)){
arrayTaskFilter.push(e);
}
});
console.log(arrayTaskFilter);
sendFilteredDataTotable(arrayTaskFilter);
});

dataFetch();




