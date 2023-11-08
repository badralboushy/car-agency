const express = require("express");
var router = express.Router();
const axios = require("axios");
const session = require("express-session");
router.get("/view", function (req, res) {
    axios
        .post("http://localhost:3001/contract/getCarClientContractEmployee")
        .then((resp) => {
            // console.log(resp);
            return res.render("partials/contract", {
                contracts: resp.data,
            });
        });
});

module.exports = router;
