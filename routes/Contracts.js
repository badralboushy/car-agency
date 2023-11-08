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
        let query = "select * from contract";
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

router.post("/getCarClientContractEmployee", function (req, res) {
    oracledb.getConnection(connAttr, function (err, connection) {
        if (err) {
            console.log(err);
        }
        console.log("Connected to Database");
        let query =
            "select * from contract join client on ( contract.client_id = client.client_id) join car on ( contract.car_car_id= car.car_id) join employee on ( employee.id = contract.employee_id)";
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
            "insert into contract values(null , :PAYMENT_METHOD , :EMPLOYEE_ID ,:CLIENT_ID , :CAR_CAR_ID , SYSDATE ,1)";
        let binds = [
            req.body.PAYMENT_METHOD,
            req.body.EMPLOYEE_ID,
            req.body.CLIENT_ID,
            req.body.CAR_CAR_ID,
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

// router.post("/getContractsForEmployee", function (req, res) {
//     oracledb.getConnection(connAttr, function (err, connection) {
//         if (err) {
//             console.log(err);
//         }
//         console.log("Connected to Database");
//         let query = "select * from Contract where EMPLOYEE_ID = :EMPLOYEE_ID";
//         let binds = req.body.EMPLOYEE_ID;
//         connection.execute(query, binds, {}, function (err, result) {
//             console.log("Executing query....");
//             if (err) {
//                 console.log(err);
//             }
//             connection.release(function (err) {
//                 console.log("connection is released");
//             });
//             return res.json(result.rows);
//         });
//     });
// });
router.post("/getContractsForEmployee", function (req, res) {
    oracledb.getConnection(connAttr, function (err, connection) {
        if (err) {
            console.log(err);
        }
        console.log("Connected to Database");
        let query = "select * from contract where employee_id = :EMPLOYEE_ID";
        let binds = [req.body.EMPLOYEE_ID];
        connection.execute(query, binds, {}, function (err, result) {
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
router.post("/getMaxId", function (req, res) {
    oracledb.getConnection(connAttr, function (err, connection) {
        if (err) {
            console.log(err);
        }
        console.log("Connected to Database");
        let query = "select max(CONTRACT_ID) from contract";
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

module.exports = router;
