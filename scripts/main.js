var addButton = document.getElementById('add-task');
var deleteBtn = document.querySelector('.deleteBtn');
var inputTask = document.getElementById('new-task');
var unfinishetTasks = document.getElementById('unfinishetTasks');
var finishetTasks = document.getElementById('finishetTasks');


function Task(text) {
    var template = document.querySelector('#template');
    var clone = template.content.cloneNode(true);
    var val = document.createTextNode(text);

    clone.querySelector('label').appendChild(val);
    clone.querySelector('.deleteBtn').addEventListener('click', taskList.del);

    this.li = clone.querySelector('.task');
    this.text = clone.querySelector('label').textContent;

}

function TaskList() {
    var taskArr = [];

    this.newTask = function (task) {
        taskArr.push(task);
        printTask();
    };
    var printTask = function () {
        unfinishetTasks.innerHTML = '';
        var documentFragment = document.createDocumentFragment();

        taskArr.forEach(function(item, i, taskArr) {
            documentFragment.appendChild(item.li);
        });

        unfinishetTasks.appendChild(documentFragment);
    };

    this.del = function () {
        for (var i=0; i<taskArr.length; i++){
            var taskText = this.parentNode.querySelector('label').textContent;
            if(taskText === taskArr[i].text){
                taskArr.splice(i,1);
                printTask(taskArr);
            }
        }
    };
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


