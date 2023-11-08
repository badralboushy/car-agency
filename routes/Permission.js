const express = require("express");
const oracledb = require("oracledb");

var router = express.Router();

var password = "samara_badr";
let connAttr = {
    user: "samara_badr",
    password: password,
    connectString: "localhost:1521/xe",
};

router.post("/getall", function (req, res) {
    oracledb.getConnection(connAttr, function (err, connection) {
        if (err) {
            console.log(err);
        }
        console.log("Connected to Database");
        let query = "select * from permissions";
        connection.execute(query, {}, {}, function (err, result) {
            console.log("Executing query....");
            if (err) {
                console.log(err);
            }
            connection.release(function (err) {
                console.log("connection is releasesd");
            });
            return res.json(result.rows);
        });
    });
});
router.post("/add", function (req, res) {
    oracledb.getConnection(connAttr, function (err, connection) {
        if (err) {
            console.log(err);
        }
        console.log("Connected to Database");
        let query =
            "insert into permissions values(:CHANGE_COMMISSION , null , :CH_NUMBER_OF_SALES ,:CH_MAX_INSTALLMENT_PERIOD , :CH_MIN_FIRST_PAYMENT , :CH_BENIFIT,:CH_FINE,:CH_AVAILABLE_PAYMENT_PERIOD,:CH_ACCEPTABLE_LATE_PERIOD,:CH_ACTIVE,:OPEN_ACCOUNT,:CH_PASSWORD,:CLOSE_ACCOUNT,:ACTIVE,SYSDATE,:ROLE)";
        let binds = [
            req.body.CHANGE_COMMISSION,
            req.body.CH_NUMBER_OF_SALES,
            req.body.CH_MAX_INSTALLMENT_PERIOD,
            req.body.CH_MIN_FIRST_PAYMENT,
            req.body.CH_BENIFIT,
            req.body.CH_FINE,
            req.body.CH_AVAILABLE_PAYMENT_PERIOD,
            req.body.CH_ACCEPTABLE_LATE_PERIOD,
            req.body.CH_ACTIVE,
            req.body.OPEN_ACCOUNT,
            req.body.CH_PASSWORD,
            req.body.CLOSE_ACCOUNT,
            req.body.ACTIVE,
            req.body.ROLE,
        ];

        connection.execute(
            query,
            binds,
            { autoCommit: true },
            function (err, result) {
                console.log("Executing query....");
                if (err) {
                    console.log(err);
                }

                connection.release(function (err) {
                    console.log("connection is releasesd");
                });
                return res.json(result.rows);
            }
        );
    });
});

module.exports = router;
