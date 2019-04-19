const express=require('express');
var router=express.Router();

router.get('/',(req,res)=>{
    res.render("index/home",{
    })
})
module.exports=router;