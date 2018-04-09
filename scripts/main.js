var addButton = document.getElementById('add-task');
var inputTask = document.getElementById('new-task');
var unfinishedTasks = document.getElementById('unfinishedTasks');
var finishedTasks = document.getElementById('finishedTasks');

var localStorageProvider = new LocalStorage();
var dataServiceProvider = new DataService(localStorageProvider);



function DataService (dataProvider) {
    this.load = function () {
        var arrey = dataProvider.load();
        var tasksArr = [];
        if(arrey){
            for (var i=0; i<arrey.length; i++){
                var taskAfterLoad = new Task(arrey[i].text, arrey[i].status);
                tasksArr.push(taskAfterLoad);
            }
        }
        taskList.setTaskArr(tasksArr);
    };

    this.save = function () {
        dataProvider.save(taskList.getTaskArr());
    };
}

function LocalStorage () {
    this.load = function () {
        return JSON.parse(localStorage.getItem("ToDo"));
    };

    this.save = function (arr) {
        var arrey = [];
        arr.forEach(function (item, i, arr) {
            var obj = {
                text : item.text,
                status : item.status
            };
            arrey.push(obj);
        });
        localStorage.setItem('ToDo', JSON.stringify(arrey));
    };
}


function Task(text, statusAfterLoad) {
    var template = document.querySelector('#template');
    var clone = template.content.cloneNode(true);
    var self = this;
    var changeClassToVisible = function (bool) {
        if (bool) {
            this.querySelectorAll('article')[0].classList.add('visible');
            this.querySelectorAll('article')[1].classList.remove('visible');
        } else {
            this.querySelectorAll('article')[0].classList.remove('visible');
            this.querySelectorAll('article')[1].classList.add('visible');
        }
    };

    this.li = clone.querySelector('.task');
    this.text = text;
    this.status = false;
    this.li.onclick = function (evemt) {
        if (evemt.target.tagName === "BUTTON") {
            var e = new Event("click", {bubbles: true});
            evemt.target.querySelector('i').dispatchEvent(e);
            return;
        }
        var result;
        var target = evemt.target.innerText;
        var targets = {
            'delete': function () {
                taskList.deleteTask.call(self);
                taskList.printTask();
            },
            'check_box_outline_blank': function () {
                if (!self.li.querySelector('article').classList.contains('visible')) {
                    alert("press save");
                    return;
                }
                changeClassToVisible.call(self.li, true);
                self.status = true;
                self.li.querySelector('i').innerText = "check_box";
                self.li.querySelector('.editBtn').classList.add('hidden');
                taskList.printTask();
            },
            'check_box': function () {
                self.status = false;
                self.li.querySelector('i').innerText = "check_box_outline_blank";
                self.li.querySelector('.editBtn').classList.remove('hidden');
                taskList.printTask();
            },
            'edit': function () {
                changeClassToVisible.call(self.li, false);
            },
            'save': function () {
                self.text = self.li.querySelector('.toEdit').value || self.text;
                self.li.querySelector('.toEdit').value = self.text;
                self.li.querySelector('label').lastChild.textContent = self.text;
                changeClassToVisible.call(self.li, true);
            },
            'default': function () {
                return true;
            }
        };
        if (targets[target]) {
            result = targets[target];
        } else {
            result = targets['default'];
        }
        return result();
    };
    if(statusAfterLoad){
        changeClassToVisible.call(self.li, true);
        var e = new Event("click", {bubbles: true});
        this.li.querySelector('button').dispatchEvent(e);
    }
    changeClassToVisible.call(self.li, true);
    clone.querySelector('label' ).appendChild(document.createTextNode(self.text));
    clone.querySelector('.toEdit').value = self.text;
}

function TaskList() {
    var taskArr = [];

    this.getTaskArr = function () {
      return taskArr;
    };

    this.setTaskArr = function (arr) {
        taskArr = arr;
    };

    var print = function (openTasks, closeTasks) {
        unfinishedTasks.innerHTML = '';
        finishedTasks.innerHTML = '';
        unfinishedTasks.appendChild(openTasks);
        finishedTasks.appendChild(closeTasks);
    };

    var findTask = function (item) {
        for (var i = 0; i < taskArr.length; i++) {
            var taskText = item.text;
            if (taskText === taskArr[i].text) {
                return i
            }
        }
    };

    this.newTask = function (task) {
        task.li.querySelector('article').classList.add('visible');
        taskArr.push(task);
    };

    this.printTask = function () {
        var openTasks = document.createDocumentFragment();
        var closeTasks = document.createDocumentFragment();
        taskArr.forEach(function (item) {
            if (item.status) {
                closeTasks.appendChild(item.li);
            } else {
                openTasks.appendChild(item.li);
            }
        });
        dataServiceProvider.save();
        print(openTasks, closeTasks);
    };

    this.deleteTask = function () {
        var taskIndex = findTask(this);
        taskArr.splice(taskIndex, 1);
    };
}

function addTask() {
    if (inputTask.value) {
        var taskItem = new Task(inputTask.value, false);
        taskList.newTask(taskItem);
        inputTask.value = "";
        taskList.printTask();
    } else {
        alert("no text");
    }
}

var taskList = new TaskList();
dataServiceProvider.load();
taskList.printTask();
addButton.onclick = addTask;


