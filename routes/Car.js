const { Console } = require("console");
const express = require("express");
const oracledb = require("oracledb");

var router = express.Router();

var password = "samara_badr";
let connAttr = {
    user: "samara_badr",
    password: password,
    connectString: "localhost:1521/xe",
};

router.post("/getAll", function (req, res) {
    oracledb.getConnection(connAttr, function (err, connection) {
        if (err) {
            console.log(err);
        }
        console.log("Connected to Database");
        let query = "select * from car";
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
            "insert into car values( null , :MANUFACTURER , :STATUS ,:NAME , :COLOR , :PRICE , :READY , :ENGINE , :TANK_SIZE , :DATE_OF_MANUFACTURE ,:REGISTRATION_DATE )";
        let binds = [
            req.body.MANUFACTURER,
            req.body.STATUS,
            req.body.NAME,
            req.body.COLOR,
            req.body.PRICE,
            req.body.READY,
            req.body.ENGINE,
            req.body.TANK_SIZE,
            req.body.DATE_OF_MANUFACTURE,
            req.body.REGISTRATION_DATE,
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

// router.delete("/delete", function (req, res) {
//     oracledb.getConnection(connAttr, function (err, connection) {
//         if (err) {
//             console.log(err);
//         }
//         console.log("Connected to Database");
//         let query = "delete from car where CAR_ID =:CAR_ID";
//         let binds = [req.body.CAR_ID];
//         connection.execute(
//             query,
//             binds,
//             { autoCommit: true },
//             function (err, result) {
//                 console.log("Executing query....");
//                 if (err) {
//                     console.log(err);
//                 }

//                 connection.release(function (err) {
//                     console.log("connection is releasesd");
//                 });
//                 return res.json(result.rows);
//             }
//         );
//     });
// });

router.post("/getReady", function (req, res) {
    oracledb.getConnection(connAttr, function (err, connection) {
        if (err) {
            console.log(err);
        }
        console.log("Connected to Database");
        let query = "select * from car where ready = 1";
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

router.post("/getPriceByContractId", function (req, res) {
    oracledb.getConnection(connAttr, function (err, connection) {
        if (err) {
            console.log(err);
        }
        console.log("Connected to Database");
        let query =
            "select price from car join contract on (car.car_id = contract.car_car_id) where Contract_ID = :Contract_ID";
        let binds = [req.body.Contract_ID];
        connection.execute(query, binds, {}, function (err, result) {
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

//////////////////////////////////

module.exports = router;
