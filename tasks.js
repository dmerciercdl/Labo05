/**
 * Created by dmercier on 2015-09-29.
 */

$(document).ready(function() {

    $("#getTasks").click(function() {

        var request = $.ajax({
            url : 'http://127.0.0.1:5000/tasks',
            type : 'GET'
        });
        request.done(function(data) {

            //result.d[0].EmployeeTitle

        });
        request.fail(function(jqXHR, textStatus) {
            console.log(textStatus);
            alert("fail");
        });
    });

});