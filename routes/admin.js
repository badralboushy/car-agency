const express = require("express");
var router = express.Router();
const axios = require("axios");
const session = require("express-session");

router.get("/view", function (req, res) {
    axios.post("http://localhost:3001/employee/getall").then((resp) => {
        //console.log("the result is ");
        //   console.log(resp);
        console.log("admin view ");
        return res.render("partials/admin", {
            employees: resp.data,
            title: "Admin",
        });
    });
});
router.get("/view/updatePassword", function (req, res) {
    axios.post("http://localhost:3001/employee/getall").then((resp) => {
        //console.log("the result is ");
        console.log(resp);
        return res.render("partials/admin", {
            employees: resp.data,
            title: "Admin",
        });
    });
});
router.post("/view/updatePassword", function (req, res) {
    var payload = {
        PASSWORD: req.body.PASSWORD,
        ID: req.body.ID,
    };
    console.log("admin view/updatePassword");
    axios
        .put("http://localhost:3001/employee/ChangePassword", payload)
        .then((resp) => {});

    // router.get("/view", function (req, res) {
    //     axios.post("http://localhost:3001/employee/getall").then((resp) => {
    //         //console.log("the result is ");
    //         console.log(resp);
    //         return res.render("partials/admin", {
    //             employees: resp.data,
    //             title: "Admin",
    //         });
    //     });
    // });
});

router.get("/view/addemployee", function (req, res) {
    console.log("admin /view/addemployee ");
    var payload = {
        PASSWORD: req.body.PASSWORD,
        EMAIL: req.body.EMAIL,
        NAME: req.body.NAME,
        SALARY: req.body.SALARY,
        ROLE: req.body.ROLE,
        PERMISSION_ID: req.body.PERMISSION_ID,
    };
    axios.post("http://localhost:3001/employee/add", payload).then((resp) => {
        return;
    });
});

////////////////////
// router.get("/view", function (req, res) {
//     axios.post("http://localhost:3001/car/getReady").then((response) => {
//         return res.render("partials/salesman.hbs", {
//             title: "salesman",
//             cars: response.data,
//         });
//     });
// });

module.exports = router;
