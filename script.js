//getting all the items
const preloader = document.querySelector(".loader");
const addbtn1 = document.querySelector(".btn.list");
const inpfd1 = document.querySelector(".new.list");
const addbtn2 = document.querySelector(".btn.taskbt");
const inpfd2 = document.querySelector(".new.task");
const todoList = document.querySelector(".task_list");
const slist = document.querySelectorAll(".task_list li");
const tododiv = document.querySelector(".todo_list");
const task_title = document.querySelector(".list_title");
const todoTask = document.querySelector(".tasks");
const taskcount = document.querySelector(".task_count");
const cleartask = document.querySelector(".btn.delete.cleartask");
const deletelist = document.querySelector(".btn.delete.clearlist");
const f1 = document.querySelector(".f1");
const f2 = document.querySelector(".f2");
window.addEventListener("load", vanish);
 
function vanish(){
    preloader.classList.add("disappear");
}
let listname,taskname,curListInd;
const listitems = todoList.children;//selects the descendants of ul
const taskitems = todoTask.children;//selects the descendants of task
showlists();//display the tasks
tododiv.style.display = "none";
f1.classList.add("slide");


//for getting input of list name
inpfd1.onkeyup = () =>{
    listname = inpfd1.value;
    if(listname.length != 0){
        addbtn1.classList.add("active");
    }
    else{
        addbtn1.classList.remove("active");
    }
}
//for getting input of task name
inpfd2.onkeyup = () =>{
    taskname = inpfd2.value;
    if(taskname.length != 0){
        addbtn2.classList.add("active");
    }
    else{
        addbtn2.classList.remove("active");
    }
}
// getting list from local storage
addbtn1.onclick = () => {
    let listarr = [];
    let getloacallist = localStorage.getItem("Lists");
    if(getloacallist == null){
        listarr = [];
    }else{
        listarr = JSON.parse(getloacallist);
    }
    listarr.push(listname);
    localStorage.setItem("Lists", JSON.stringify(listarr));
    showlists();
    addbtn1.classList.remove("active");
    inpfd1.value="";
}
//adding task to local storage
addbtn2.onclick = () => {
    let name = task_title.innerHTML;
    let getloacaltask = localStorage.getItem(`${name}`);
    let taskarr = [];
    if(getloacaltask == null){
        taskarr = [];
    }else{
        taskarr = JSON.parse(getloacaltask);
    }
    taskarr.push(taskname);
    localStorage.setItem(`${name}`, JSON.stringify(taskarr));
    showtasks(name);
    addbtn2.classList.remove("active");
    inpfd2.value="";
    
}

// function to show the list of tasks
function showlists(){
    todoList.classList.toggle("fade");
    let listarr = [];
    let getloacallist = localStorage.getItem("Lists");
    if(getloacallist == null){
        listarr = [];
    }else{
        listarr = JSON.parse(getloacallist);
    }
    let newLiTag='';
    listarr.forEach((element,index) => {
        
        newLiTag +=`<li onclick="selectlist(${index})"> ${element} </li>`; // add new li tag to ul
    });
    todoList.innerHTML= newLiTag;
    inpfd1.value="";
}

//choosing the list
function selectlist(index){
    f2.classList.toggle("slide");
    for (var i=0; i<listitems.length;i++)
       {
           if(listitems[i].classList.contains("act"))
            listitems[i].classList.remove("act");
       }
  listitems[index].classList.add("act");//using the descendants of ul
  // to diplay the todo div
    tododiv.style.display="block";
    // to display the task title
  task_title.innerHTML = `${listitems[index].innerHTML}`;
  curListInd = index;
    showtasks(task_title.innerHTML);
}


// function to show the tasks
function showtasks(name){
    
    todoTask.classList.toggle("fade");
    let taskarr = [];
    let getloacaltask = localStorage.getItem(`${name}`);
    if(getloacaltask == null){
        taskarr = [];
    }else{
        taskarr = JSON.parse(getloacaltask);
    }
    //to render the available tasks
    let newLiTag='';
    taskcount.innerHTML = `${taskarr.length} Task Remaining`;
    taskarr.forEach((element) => {

        newLiTag +=` <li class="task"><input type="checkbox" name="task-1" onclick="selecttask(this)"/>${element}</li>`; // add new task in the list
    });
    todoTask.innerHTML= newLiTag;
    
    // to render the completed task
    let completedtask = [];
    let alltask = localStorage.getItem(`${task_title.innerHTML}comp`);
    if(alltask == null){
        completedtask = [];
    }else{
        completedtask = JSON.parse(alltask);
    }
    
    completedtask.forEach((element) => {
        var li = document.createElement('li');
        li.innerHTML =`<input type="checkbox" name="task-1" onclick="selecttask(this)"/>${element}`; // add new task in the list
        li.classList.add("task");
        li.classList.add("addstroke");
        li.firstChild.checked = true;
        todoTask.appendChild(li);
    });
    

    inpfd2.value="";

}

// task handling when a task is selected
function selecttask(elel){

    let taskarr = [];
    let getloacaltask = localStorage.getItem(`${task_title.innerHTML}`);
    if(getloacaltask == null){
        taskarr = [];
    }else{
        taskarr = JSON.parse(getloacaltask);
    }
 
    let completedtask = [];
    let alltask = localStorage.getItem(`${task_title.innerHTML}comp`);
    if(alltask == null){
        completedtask = [];
    }else{
        completedtask = JSON.parse(alltask);
    }

    if(!completedtask.includes(elel.parentElement.innerText)){

                 //adds the element to completedtask
                    completedtask.push(elel.parentElement.innerText);
                    localStorage.setItem(`${task_title.innerHTML}comp`, JSON.stringify(completedtask));
                    //removes from taskarray
                     taskarr.splice(taskarr.indexOf(elel.parentElement.innerText),1);
                     localStorage.setItem(`${task_title.innerHTML}`, JSON.stringify(taskarr));
    
                    elel.parentElement.classList.add("addstroke");
                }
    else{
                     //adds the element to taskarray
                    taskarr.push(elel.parentElement.innerText);
                    localStorage.setItem(`${task_title.innerHTML}`, JSON.stringify(taskarr));
                    //removes from completedtask
                    completedtask.splice(completedtask.indexOf(elel.parentElement.innerText),1);
                    localStorage.setItem(`${task_title.innerHTML}comp`, JSON.stringify(completedtask));
    
                       
                    elel.parentElement.classList.remove("addstroke");
                }

    taskcount.innerHTML = `${taskarr.length} Task Remaining`;

}

//deleteing the task
cleartask.onclick = () =>{

    let completedtask = [],complete = [];
    let alltask = localStorage.getItem(`${task_title.innerHTML}comp`);
    if(alltask == null){
        completedtask = [];
    }else{
        completedtask = JSON.parse(alltask);
        complete = completedtask;
    }
//traverse to find the complted task and remove
    completedtask.forEach((cb) =>{
        complete.splice(complete.indexOf(cb),1);
         
     });
     localStorage.setItem(`${task_title.innerHTML}comp`,JSON.stringify(complete));
        showtasks(`${task_title.innerHTML}`);

}


//deleteing the list
deletelist.onclick = () =>{
    //removing all its task
        localStorage.removeItem(`${task_title.innerHTML}`);
        localStorage.removeItem(`${task_title.innerHTML}comp`);
    //removing list from local storage
    let listarr = [];
    let getloacallist = localStorage.getItem("Lists");
    if(getloacallist == null){
        listarr = [];
    }else{
        listarr = JSON.parse(getloacallist);
    }
        listarr.splice(curListInd,1);
        localStorage.setItem("Lists", JSON.stringify(listarr));
        tododiv.style.display="none";
        showlists();
    
}
