const axios = require("axios");
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);
$(document).ready(function(){

    $("#submit_client").on('click' , function(e){
        e.preventDefault();
        console.log("fuck shadi");
            axios.post("http://localhost:3001/client/add" , {
                NAME : $("#client_name").val(),
                ADDRESS: $("#client_address").val(),
                PHONE_NUMBER : $("#client_phone").val(),
                JOB : $("#client_job").val(),
                NATIONAL_NUMBER : $("#client_num").val(),
                JOB : $("#client_job").val()        
        }).then((response)=>{
            console.log(response);
    
        } , (error)=>{
            alert(error);
        });
    });
    
    });
    