var addButton = document.getElementById('add-task');
var inputTask = document.getElementById('new-task');
var unfinishedTasks = document.getElementById('unfinishedTasks');
var finishedTasks = document.getElementById('finishedTasks');



function Task(text) {
    var template = document.querySelector('#template');
    var clone = template.content.cloneNode(true);
    var self = this;

    var changeClassToVisible = function (bool) {
        if(bool){
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


        if(evemt.target.tagName === "BUTTON"){
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
                if(!self.li.querySelector('article').classList.contains('visible')){
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
            // в ином случае, приравняем к дефолтному значению drinks.default
            // удобно и логично использовать везде квадратные скобки
            result = targets['default'];
        }
        return result();

        // return targets[target]();
    };

    // this.li.onclick = function (evemt) {
    //
    //     if(evemt.target.tagName === "BUTTON"){
    //         var e = new Event("click", {bubbles: true});
    //         evemt.target.querySelector('i').dispatchEvent(e);
    //         return;
    //     }
    //
    //     switch(evemt.target.innerText) {
    //         case 'delete':
    //             taskList.deleteTask.call(self);
    //             taskList.printTask();
    //             break;
    //         case 'check_box_outline_blank':
    //             changeClassToVisible.call(self.li, true);
    //             self.status = true;
    //             self.li.querySelector('i').innerText = "check_box";
    //             this.querySelector('.editBtn').classList.add('hidden');
    //             taskList.printTask();
    //             break;
    //         case 'check_box':
    //             self.status = false;
    //             self.li.querySelector('i').innerText = "check_box_outline_blank";
    //             this.querySelector('.editBtn').classList.remove('hidden');
    //             taskList.printTask();
    //             break;
    //         case 'edit':
    //             changeClassToVisible.call(self.li, false);
    //             break;
    //         case 'save':
    //             self.text = self.li.querySelector('.toEdit').value;
    //             self.li.querySelector('label').lastChild.textContent = self.text;
    //             changeClassToVisible.call(self.li, true);
    //             break;
    //     }
    //
    // };

    clone.querySelector('label').appendChild(document.createTextNode(self.text));
    clone.querySelector('.toEdit').value = self.text;

}

function TaskList() {
    var taskArr = [];

    this.newTask = function (task) {
        task.li.querySelector('article').classList.add('visible');
        taskArr.push(task);
        this.printTask();
    };




    var print = function (openTasks, closeTasks) {
        unfinishedTasks.innerHTML = '';
        finishedTasks.innerHTML = '';
        unfinishedTasks.appendChild(openTasks);
        finishedTasks.appendChild(closeTasks);
        // console.log(taskArr[0].articles[0].classList.contains('visible'));
        // deleteVisibidleClass();
        // console.log(taskArr[0].articles[0].classList.contains('visible'));

    };

    this.printTask = function () {
        var openTasks = document.createDocumentFragment();
        var closeTasks = document.createDocumentFragment();
        taskArr.forEach(function(item, i, taskArr) {
            var elem = document.createElement('ul');

            elem.appendChild(item.li);
            // var editBtn = elem.querySelector('.editBtn');//
            // var label = elem.querySelector('label');//
            // var input = elem.querySelector('input');//
            if(item.status){
                closeTasks.appendChild(elem.firstChild);

            } else {
                openTasks.appendChild(elem.firstChild);
            }


        });
        print(openTasks, closeTasks);
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
    };

    // this.checkTask = function () {
    //
    //     this.status = !this.status;
    //     // this.showArticle(2);
    //     // console.log("check");
    //     printTask();
    // };

    // this.editTask = function () {
    //     var num = findTask(this);
    //     taskArr[num].edit = !taskArr[num].edit;
    //     printTask()
    // }
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


