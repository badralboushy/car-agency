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
        let query = "select * from constants";
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
            'insert into constants values( :NUMBER_OF_SALES , :DISCOUNT ,:MAX_INSTALLMENT_PERIOD , :MIN_FIRST_PAYMENT , :BENIFIT,:AVAILABLE_PAYMENT_PERIOD,:FINE,:ACCEPTABLE_LATE_PERIOD, null ,:ACTIVE,:MIN_PRICE,:COMESSION_ONE,:MAX_PRICE,:COMESION_TWO,:COMESSION_THREE,:"DATE")';
        let binds = [
            req.body.NUMBER_OF_SALES,
            req.body.DISCOUNT,
            req.body.MAX_INSTALLMENT_PERIOD,
            req.body.MIN_FIRST_PAYMENT,
            req.body.BENIFIT,
            req.body.AVAILABLE_PAYMENT_PERIOD,
            req.body.FINE,
            req.body.ACCEPTABLE_LATE_PERIOD,
            req.body.ACTIVE,
            req.body.MIN_PRICE,
            req.body.COMESSION_ONE,
            req.body.MAX_PRICE,
            req.body.COMESION_TWO,
            req.body.COMESSION_THREE,
            req.body.DATE,
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

router.post("/getDiscount", function (req, res) {
    oracledb.getConnection(connAttr, function (err, connection) {
        if (err) {
            console.log(err);
        }
        console.log("Connected to Database");
        let query = "select discount from constants where active = 1";
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

router.post("/getActive", function (req, res) {
    oracledb.getConnection(connAttr, function (err, connection) {
        if (err) {
            console.log(err);
        }
        console.log("Connected to Database");
        let query = "select * from constants where active = 1";
        connection.execute(query, {}, {}, function (err, result) {
            console.log("Executing query....");
            if (err) {
                console.log(err);
            }
            connection.release(function (err) {
                console.log("connection is released");
            });
            return res.json(result.rows);
        });
    });
});

router.put("/unactive", function (req, res) {
    oracledb.getConnection(connAttr, function (err, connection) {
        if (err) {
            console.log(err);
        }
        console.log("Connected to Database");
        //   let query = "select * from constants where active = 1";
        let query = "update constants set active ='0' where active = 1";
        connection.execute(
            query,
            {},
            { autoCommit: true },
            function (err, result) {
                console.log("Executing query....");
                if (err) {
                    console.log(err);
                }
                connection.release(function (err) {
                    console.log("connection is released");
                });
                return res.json(result.rows);
            }
        );
    });
});

module.exports = router;
