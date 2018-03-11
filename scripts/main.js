var addButton = document.getElementById('add-task');
var inputTask = document.getElementById('new-task');
var unfinishetTasks = document.getElementById('unfinishetTasks');


function Task(text) {
    var template = document.querySelector('#template');
    var clone = template.content.cloneNode(true);
    var val = document.createTextNode(text);
    clone.querySelector('label').appendChild(val);
    this.obj = clone;
}

Task.prototype.newTask = function () {
    unfinishetTasks.appendChild(this.obj);
};

function addTask() {
    if (inputTask.value){
        var taskItem = new Task(inputTask.value);
        // console.log(taskItem);
        taskItem.newTask();
        inputTask.value = "";
    } else {
        alert("no text");
    }
}
addButton.onclick = addTask;
// var newTask = new Task();
// newTask.addTask();