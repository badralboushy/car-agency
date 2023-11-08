const express = require("express");
var router = express.Router();
const axios = require("axios");
const session = require("express-session");

router.get("/", function(req , res){
    return res.render("partials/login.hbs" , {
        
        title: "login"
        

    });
});

router.get("/log", function(req , res){
    return res.render("partials/login.hbs" , {
        
        title: "login"
        

    });
});


var sess;
router.post("/log" , function(req, res){
    
    axios.post("http://localhost:3001/employee/getById" , req.body.log_id).then(function(resp){
        if(resp == null){
            alert("wrong id");
        }
        else{
            if(resp.data.password != req.body.password){
                alert("wrong password");
            }
            else{
                sess = req.session;
                sess.id = req.body.log_id;
                sess.password = req.body.password;
                if(resp.data.role == "salesman"){
                    return res.render("partials/salesman.hbs" , {
                        title: "salesman"
                    });
                }
                else if (resp.data.role == "manager"){
                    return res.render("partials/manager.hbs" , {
                        title: "manager"
                    });
                }
                else{
                    return res.render("partials/admin.hbs" , {
                        title: "admin"
                    });
                }
            }
        }
    })

});

module.exports = router;