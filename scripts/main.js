var addButton = document.getElementById('add-task');
var inputTask = document.getElementById('new-task');
var unfinishetTasks = document.getElementById('unfinishetTasks');


function Task() {
    var template = document.querySelector('#template');
    var clone = template.content.cloneNode(true);


    this.addTask = function () {
        parent = unfinishetTasks.appendChild(clone);
    };

    this.deleteTask = function () {
        console.log(this);
        // this
       // clone.remove();
        // var parent = self.parentNode;
        // var li = parent.querySelector('.task');
        // this.parentNode.parentNode.parentNode.querySelector('.task').remove();
        // parent.removeChild('.task');
    }.bind(unfinishetTasks);

    clone.querySelector('.deleteBtn').onclick = this.deleteTask;
}

// function deleteTask() {
//     console.log("kffffff");
// }

// Task.prototype.delete = function () {
//     this.delete();
//     console.log(this);
//     // this.parentNode.removeChild('.task');
// };

function addTask() {
    if (inputTask.value){
        var taskItem = new Task();
        taskItem.addTask();
        inputTask.value = "";
    } else {
        alert("no text");
    }
}
addButton.onclick = addTask;
// var newTask = new Task();
// newTask.addTask();