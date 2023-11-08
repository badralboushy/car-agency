$(document).ready(function () {
    $("#addEmployee").on("click", function (e) {
        e.preventDefault();
        alert("Add employee");
        alert($("#NAME").val());
        axios
            .post("http://localhost:3001/employee/add", {
                NAME: $("#NAME").val(),
                EMAIL: $("#EMAIL").val(),
                PASSWORD: $("#PASSWORD").val(),
                SALARY: $("#SALARY").val(),
                ROLE: $("#ROLE").val(),
                PERMISSION_ID: $("#PERMISSION_ID").val(),
            })
            .then(
                (response) => {
                    console.log(response);
                },
                (error) => {
                    alert(error);
                    console.log(error);
                }
            );
    });
});
