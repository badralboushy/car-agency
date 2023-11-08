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
        console.log("employee get all ");
        let query = "select * from employee";
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
router.post("/getallActive", function (req, res) {
    oracledb.getConnection(connAttr, function (err, connection) {
        if (err) {
            console.log(err);
        }
        console.log("Connected to Database");
        console.log("getallactive");
        let query = "select * from employee where active = 1";
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
        console.log("here we want to write the name :");
        console.log(req.body.NAME);
        console.log("employee add ");
        let query =
            "insert into employee values(null , :EMAIL , :PASSWORD ,:SALARY , :ROLE , 0 ,SYSDATE ,null,:NAME,:PERMISSION_ID ,1)";
        let binds = [
            req.body.EMAIL,
            req.body.PASSWORD,
            req.body.SALARY,
            req.body.ROLE,
            req.body.NAME,
            req.body.PERMISSION_ID,
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

router.post("/getallSalesmen", function (req, res) {
    oracledb.getConnection(connAttr, function (err, connection) {
        if (err) {
            console.log(err);
        }
        console.log("Connected to Database");
        console.log("getallsalesman");
        let query = "select * from employee where role ='salesman' ";
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

router.put("/ChangePassword", function (req, res) {
    oracledb.getConnection(connAttr, function (err, connection) {
        if (err) {
            console.log(err);
        }
        console.log("Connected to Database");
        //   let query = "select * from constants where active = 1";
        let query = "update employee set email =:email where ID =:ID";
        let binds = [req.body.ID, req.body.email];
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
                    console.log("connection is released");
                });
                return res.json(result.rows);
            }
        );
    });
});

// router.put("/ChangePassword", function (req, res) {
//     oracledb.getConnection(connAttr, function (err, connection) {
//         if (err) {
//             console.log(err);
//         }
//         console.log("Connected to Database");
//         console.log("changepassword");
//         let query = "update employee set PASSWORD =:PASSWORD where ID =:ID";
//         let binds = [req.body.ID, req.body.PASSWORD];

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

router.put("/deactivateAccount", function (req, res) {
    oracledb.getConnection(connAttr, function (err, connection) {
        if (err) {
            console.log(err);
        }
        console.log("Connected to Database");
        let query = "update employee set ACTIVE = 0 where ID = :ID";
        let binds = [req.body.ID];

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
                    console.log("connection is released");
                });
                return res.json(result.rows);
            }
        );
    });
});
router.post("/getById", function (req, res) {
    oracledb.getConnection(connAttr, function (err, connection) {
        if (err) {
            console.log(err);
        }
        console.log("Connected to Database");
        console.log("employee getById");
        let query = "select * from employee  where ID = :ID";
        let binds = [req.body.ID];

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
                    console.log("connection is released");
                });
                return res.json(result.rows);
            }
        );
    });
});

module.exports = router;
