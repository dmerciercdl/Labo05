/**
 * Created by dmercier on 2015-09-29.
 */

$(document).ready(function() {

    $("#add").click(function () {

        var request = $.ajax({
            url: 'http://127.0.0.1:5000/tasks',
            type: 'GET'
        });

        request.done(function (data) {
            $('#noteContainerContent').empty();

            data.tasks.forEach(function(task) {
                var html = generateNote(task.id, task.task);
                $("#noteContainerContent").append(html);
            });

            bindClickForNotes();
        });

        request.fail(function (jqXHR, textStatus) {
            console.log(textStatus);
            alert("fail");
        });
    });

    $("#modify").click(function() {

    });

    $("#delete").click(function() {

    });
});

function generateNote(id, task) {
    var html = "<div id='" + id + "' class='noteButton'>" + task + "</div>";
    return html;
}

function bindClickForNotes() {
    $(document).on("click", ".noteButton", function(){
        alert("click on " + this.id);

    });
}