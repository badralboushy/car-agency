const express = require("express");
const oracledb = require("oracledb");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
var app = express();
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
const hbs = require("hbs");
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");

// var password = "hr";

// let connAttr = {
//     user: "hr",
//     password: password,
//     connectString: "localhost:1521/xe",
// };

var car = require("./routes/Car");
var client = require("./routes/Client");
var contract = require("./routes/Contracts");
var permission = require("./routes/Permission");
var constant = require("./routes/Constants");
var employee = require("./routes/Employee");
var payment = require("./routes/payment");
var salesman = require("./routes/salesman");
var admin = require("./routes/admin");
var manager = require("./routes/manager");
var installment = require("./routes/installement_payment");
var contractshow = require("./routes/contract");
var login = require("./routes/login");

app.use("/login", login);
app.use("/contractShow", contractshow);
app.use("/installment", installment);
app.use("/manager", manager);
app.use("/admin", admin);
app.use("/car", car);
app.use("/client", client);
app.use("/permission", permission);
app.use("/contract", contract);
app.use("/constant", constant);
app.use("/employee", employee);
app.use("/payment", payment);
app.use("/salesman", salesman);

var port = 3001;
app.listen(port, () => {
    console.log("The web server is ready on port " + port);
});
