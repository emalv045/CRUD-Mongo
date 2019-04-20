const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Renta=mongoose.model('Renta');


router.get('/',(req,res)=>{
    res.render("renta/addOrEditRenta",{
        viewTittle:"Generar Renta"
    })
})

router.post('/',(req,res)=>{
    if(req.body._id=='')
        insertRenta(req,res);
    else
        updateRenta(req,res);
    
});

function insertRenta(req,res){
    var renta=new Renta();
    renta.cedula=req.body.cedula;
    renta.placa=req.body.placa;
    renta.dia=req.body.dia;
    renta.monto=req.body.monto;

    renta.save((err,doc)=>{
        if(!err)
            res.redirect('renta/list');
        else{
            console.log("Ocurrio un error: "+err);
        }
    })
}

function updateRenta(req,res){
    Renta.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
        if(!err){
            res.redirect('renta/list');
        }
    });
}

router.get('/list',(req,res)=>{
    Renta.find((err,docs)=>{
        if(!err){
            res.render("renta/list",{
                list: docs
            })
        }
        else{
            console.log("Error en la busqueda de rentas: "+err);
        }
    });
 });

 router.get('/:id',(req,res)=>{
     Renta.findById(req.params.id,(err,doc)=>{
         if(!err){
             res.render("renta/addOrEditRenta",{
                viewTittle:"Modificar Renta",
                renta: doc
             });
         }
     });
});

router.get('/delete/:id',(req,res)=>{
    Renta.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.redirect('/renta/list');
        }        
        else{
            console.log("Ocurrio un error: "+err);
        }
    });
});

module.exports=router;