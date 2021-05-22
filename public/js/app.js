// const { response } = require("express");
// var request=require('request');


console.log('Client side javascript file is loaded!');

var frm=document.querySelector('form');
var req=document.querySelector('input');
var message=document.querySelector('#message-1');
var message2=document.querySelector('#message-2');



frm.addEventListener('submit',(e)=>{
    e.preventDefault();
    var place=req.value

    message.textContent= 'loading . . . . .'
    message2.textContent= ''


    fetch('http://localhost:3000/weather?address=' + place).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
            {
                // console.log(data.error);
                message.textContent=data.error;
                message2.textContent='';
            }
        else
            {
                // console.log(data.location);
                // console.log(data.forecast);
                message.textContent=data.forecast;
                message2.textContent='Thank You ';
            }
    })
})
});