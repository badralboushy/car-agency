const express = require("express");
var router = express.Router();
const axios = require("axios");
const session = require("express-session");
router.get("/view", function (req, res) {
    axios.post("http://localhost:3001/constant/getActive").then((resp) => {
        console.log(resp);
        return res.render("partials/manager", {
            constants: resp.data,
        });
    });
});

router.get("/view/addconstants", function (req, res) {
    axios
        .post("http://localhost:3001/constant/unactive", payload)
        .then((resp) => {
            return res.render("partials/manager", {
                // constants: resp.data,
            });
        });
});

router.post("/view/addconstants", function (req, res) {
    axios
        .post("http://localhost:3001/constant/unactive", payload)
        .then((resp) => {
            //console.log("make it un Active");
            return;
        });
    var payload = {
        NUMBER_OF_SALES: req.body.NUMBER_OF_SALES,
        DISCOUNT: req.body.MAX_INSTALLMENT_PERIOD,
        MIN_FIRST_PAYMENT: req.body.MIN_FIRST_PAYMENT,
        BENIFIT: req.body.BENIFIT,
        AVAILABLE_PAYMENT_PERIOD: req.body.AVAILABLE_PAYMENT_PERIOD,
        FINE: req.body.FINE,
        ACCEPTABLE_LATE_PERIOD: req.body.ACCEPTABLE_LATE_PERIOD,
        ACTIVE: "1",
        MIN_PRICE: req.body.MIN_PRICE,
        COMESSION_ONE: req.body.COMESSION_ONE,
        MAX_PRICE: req.body.MAX_PRICE,
        COMESION_TWO: req.body.COMESION_TWO,
        COMESSION_THREE: req.body.COMESSION_THREE,
        date: req.body.date,
    };
    axios.post("http://localhost:3001/constant/add", payload).then((resp) => {
        // console.log("hello");
        //return;
        return res.render("partials/manager", {});
    });

    router.get("/view", function (req, res) {
        axios.post("http://localhost:3001/constant/getActive").then((resp) => {
            // console.log(resp);
            return res.render("partials/manager", {
                constants: resp.data,
            });
        });
    });
});

module.exports = router;
