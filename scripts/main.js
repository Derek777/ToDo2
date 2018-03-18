var addButton = document.getElementById('add-task');
var deleteBtn = document.querySelector('.deleteBtn');
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

    clone.querySelector('label').appendChild(val);
    clone.querySelector('.deleteBtn').addEventListener('click', taskList.deleteTask.bind(this));
    clone.querySelector('.checkBtn').addEventListener('click', taskList.checkTask.bind(this));
}

function TaskList() {
    var taskArr = [];

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
            if(item.status){
                var elem = document.createElement('ul');
                elem.appendChild(item.li);
                elem.querySelector('i').innerText = "check_box";
                closeTasks.appendChild(elem.firstChild);
            } else {
                var elem2 = document.createElement('ul');
                elem2.appendChild(item.li);
                elem2.querySelector('i').innerText = "check_box_outline_blank";
                openTasks.appendChild(elem2.firstChild);
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
        printTask(taskArr);
    };

    this.checkTask = function () {
        var num = findTask(this);
        taskArr[num].status = !taskArr[num].status;
        printTask();
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


