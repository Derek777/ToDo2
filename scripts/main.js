var addButton = document.getElementById('add-task');

// var deleteBtn = document.querySelector('.deleteBtn');
// var editBtn = document.getElementById('.editBtn');
var inputTask = document.getElementById('new-task');
var unfinishedTasks = document.getElementById('unfinishedTasks');
var finishedTasks = document.getElementById('finishedTasks');



function Task(text) {
    var template = document.querySelector('#template');
    var clone = template.content.cloneNode(true);
    var val = document.createTextNode(text);

    this.li = clone.querySelector('.task');
    this.text = text;
    this.status = false;
    this.edit = false;

    clone.querySelector('label').appendChild(val);
    clone.querySelector('.deleteBtn').addEventListener('click', taskList.deleteTask.bind(this));
    clone.querySelector('.checkBtn').addEventListener('click', taskList.checkTask.bind(this));
    clone.querySelector('.editBtn').addEventListener('click', taskList.editTask.bind(this));
}

function TaskList() {
    const taskArr = [];

    this.newTask = function (task) {
        taskArr.push(task);
        printTask();
    };
    var printTask = function () {
        unfinishedTasks.innerHTML = '';
        finishedTasks.innerHTML = '';
        var openTasks = document.createDocumentFragment();
        var closeTasks = document.createDocumentFragment();
        taskArr.forEach(function(item, i, taskArr) {
            var elem = document.createElement('ul');
            elem.appendChild(item.li);
            var editBtn = elem.querySelector('.editBtn');
            var label = elem.querySelector('label');
            var input = elem.querySelector('input');
            if(item.status){
                editBtn.classList.add('hidden');
                elem.querySelector('i').innerText = "check_box";
                closeTasks.appendChild(elem.firstChild);
            } else {
                editBtn.classList.remove('hidden');
                elem.querySelector('.icon').innerText = "check_box_outline_blank";
                if(item.edit){

                } else {

                }
                openTasks.appendChild(elem.firstChild);
            }
        });
        unfinishedTasks.appendChild(openTasks);
        finishedTasks.appendChild(closeTasks);
    };

    var findTask = function (item) {
        for (var i=0; i<taskArr.length; i++){
            var taskText = item.text;
            if(taskText === taskArr[i].text){
                return i
            }
        }
    };

    this.deleteTask = function () {
        var taskIndex = findTask(this);
        taskArr.splice(taskIndex,1);
        printTask();
    };

    this.checkTask = function () {
        var num = findTask(this);
        taskArr[num].status = !taskArr[num].status;
        printTask();
    };

    this.editTask = function () {
        var num = findTask(this);
        taskArr[num].edit = !taskArr[num].edit;
        printTask()
    }
}

function addTask() {
    if (inputTask.value){
        var taskItem = new Task(inputTask.value);
        taskList.newTask(taskItem);
        inputTask.value = "";
    } else {
        alert("no text");
    }
}

var taskList = new TaskList();
addButton.onclick = addTask;


