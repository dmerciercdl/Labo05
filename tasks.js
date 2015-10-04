/**
 * Created by dmercier on 2015-09-29.
 */

$(document).ready(function() {
    nextID = 1;
    populateTasksList();

    $("#add").click(function () {
        $("#overlay").attr('style','visibility: visible');
        $("#newTaskDescription").focus();
    });

    $("#modify").click(function() {
        modifyTask(document.getElementById("taskID").value, document.getElementById("taskContent").value);
        /*
        $("#selectedTask").attr('style','display: hidden');
        $("#taskID").val("");
        $("#taskContent").val("");
        $("#delete").attr("disabled", "disabled");
        $("#modify").attr("disabled", "disabled");
        */
    });

    $("#delete").click(function() {
        deleteTask(document.getElementById("taskID").value);
        $("#selectedTask").attr('style','display: hidden');
        $("#taskID").val("");
        $("#taskContent").val("");
        $("#delete").attr("disabled", "disabled");
        $("#modify").attr("disabled", "disabled");
    });

    $("#cancel").click(function() {
        $("#overlay").attr('style','visibility: hidden');
        $("#newTaskDescription").val("");
    });

    $("#submit").click(function() {
        var taskDesc = "";
        //taskDesc = $("newTaskDescription").value;
        taskDesc = document.getElementById("newTaskDescription").value;
        if(taskDesc == "" || taskDesc == undefined) {
            alert("Can't add an empty task");
            return;
        }
        else {
            addNewTask(taskDesc);
        }
        $("#overlay").attr('style','visibility: hidden');
        $("#newTaskDescription").val("");
    });
});

function populateTasksList() {
    var request = $.ajax({
        url: 'http://127.0.0.1:5000/tasks',
        type: 'GET'
    });

    request.done(function (data) {
        $('#tasksContainer').empty();
        processNewData(data);
        bindClickForTasks();
        $("#add").removeAttr("disabled");
    });

    request.fail(function (jqXHR, textStatus) {
        console.log(textStatus);
        alert("fail " + textStatus);
    });
}

function addNewTask(description) {
    var newUrl = 'http://127.0.0.1:5000/tasks/' + nextID;
    var myJSONObject = "{\"task\": \"" + description + "\"}";
    var request = $.ajax({
        url : newUrl,
        type : 'POST',
        data : myJSONObject,
        contentType : 'application/json'
    });

    request.done(function (data) {
        $('#tasksContainer').empty();
        processNewData(data);
        bindClickForTasks();
    });

    request.fail(function (jqXHR, textStatus) {
        console.log(textStatus);
        alert("fail " + textStatus);
    });
}

function deleteTask(id) {
    var urlToDelete = 'http://127.0.0.1:5000/tasks/' + id;
    var request = $.ajax({
        url : urlToDelete,
        type : 'DELETE'
    });

    request.done(function (data) {
        //$('#tasksContainer').empty();
        //processNewData(data);
        //bindClickForTasks();
        var elem = "#" + id;
        $(elem).remove();
    });

    request.fail(function (jqXHR, textStatus) {
        console.log(textStatus);
        alert("fail " + textStatus);
    });
}

function modifyTask(id, task) {
    var urlToModify = 'http://127.0.0.1:5000/tasks/' + id;
    var myJSONObject = "{\"task\": \"" + task + "\"}";
    var request = $.ajax({
        url : urlToModify,
        type : 'PUT',
        data : myJSONObject,
        contentType : 'application/json'
    });

    request.done(function (data) {
        $('#tasksContainer').empty();
        processNewData(data);
        bindClickForTasks();
    });

    request.fail(function (jqXHR, textStatus) {
        console.log(textStatus);
        alert("fail " + textStatus);
    });
}

function generateTaskHtml(id, task) {
    var html = "<button type='button' class='list-group-item taskButton' id='";
    html += id;
    html += "'>";
    html += task;
    html += "</button>";
    return html;
}

function processNewData(data) {
    data.tasks.forEach(function(task) {
        var html = generateTaskHtml(task.id, task.task);
        $("#tasksContainer").append(html);
        if(task.id >= nextID) {
            nextID = task.id;
        }
    });
    nextID++;
}

function bindClickForTasks() {
    $(document).on("click", ".taskButton", function(){
        $("#selectedTask").attr('style','display: block');
        $("#taskID").val(this.id);
        $("#taskContent").val(this.innerText);
        $("#delete").removeAttr("disabled");
        $("#modify").removeAttr("disabled");
    });
}