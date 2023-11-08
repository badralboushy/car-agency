const express = require("express");
var router = express.Router();
const axios = require("axios");
const session = require("express-session");
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);
var client_number = "";
var client_id = 0;
var car_id = 0 ;
router.get("/", function(req , res){
    return res.render("partials/salesman.hbs" , {
        
        title: "salesman"
        

    });
});


router.get("/view", function(req , res){   
    
    axios.post("http://localhost:3001/car/getReady").then( (response) => {
       return res.render("partials/salesman.hbs" , {
        
            title: "salesman",
            cars: response.data
        });
    });
    
});
router.get("/view/addClient", function(req, res){
    res.render('partials/salesman', {
        title: 'salesman',  
        //employees: resp.data      
    });
});
 router.post("/view/addClient" , function(req ,res){
    client_number = req.body.client_num;
    let payload = { 
        NAME: req.body.client_name,
        ADDRESS: req.body.client_address,
        PHONE_NUMBER: req.body.client_phone,
        JOB: req.body.client_job,
        NATIONAL_NUMBER: req.body.client_num
        
    };

    axios.post("http://localhost:3001/client/add", payload).then(function(resp){
    getClientId(req.body.client_num);  
    let x = {
        CLIENT_ID:client_id
     };
        axios.post("http://localhost:3001/client/getClientTimes" , x).then((respoonse)=>{
           if (respoonse.data.TIMES >= 5){
              console.log("this client has discount");
              return res.render("partials/salesman");
           }
           else{
               axios.post("http://localhost:3001/constant/getDiscount").then((respoonse)=>{
                    console.log("this client doesn't have discount" + respoonse.data.DISCOUNT );
                    return res.render("partials/salesman");
               })
           

           }
        })

    });





    router.get("/view/getCarId" , function(req, res){
        return res.render('partials/salesman', {
            title: 'salesman',  
            //employees: resp.data      
        });
    })

    router.post("/view/getCarId" , function(req , res){
        car_id = req.body.id_text;
        alert("finally car id = " + car_id);
        return res.render("partials/salesman.hbs" , {
            title : "salesman"
        });

    });


    function getClientId (national){
        
        axios.post("http://localhost:3001/client/getIdbyNational" , national).then(function(resp){
            client_id = resp.data.CLIENT_ID;
        });

    };

    function getContractId (){
        
        axios.post("http://localhost:3001/client/getMaxId" , national).then(function(resp){
            client_id = resp.data.CLIENT_ID;
        });

    };




/*    router.post("/newContract" , function(req , res ){
        let payload = {
            PAYMENT_METHOD : req.body.payment,

        }
        if(req.body.payment == "cash"){
            
            axios.post("http://localhost:3001/contract/add" , payload).then(function(resp){

            });
        }
    }); */


});



router.get("/view/addPayment", function(req, res){
    res.render('partials/salesman', {
        title: 'salesman',  
        //employees: resp.data      
    });
});
 router.post("/view/addPayment" , function(req ,res){
    let payload = { 
        AMOUNT: req.body.amount,  
        INSTALLEMENT_CONTRACT_ID: req.body.contract_id,
              
    };

    axios.post("http://localhost:3001/payment/add", payload).then(function(resp){

    });
});
module.exports = router;
