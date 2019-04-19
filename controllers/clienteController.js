const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Cliente=mongoose.model('Cliente');


router.get('/',(req,res)=>{
    res.render("cliente/addOrEditCliente",{
        viewTittle:"Insertar Cliente"
    })
})

router.post('/',(req,res)=>{
    if(req.body._id=='')
        insertCliente(req,res);
    else
        updateCliente(req,res);
    
});

function insertCliente(req,res){
    var cliente=new Cliente();
    cliente.cedula=req.body.cedula;
    cliente.nombre=req.body.nombre;
    cliente.correo=req.body.correo;
    cliente.telefono=req.body.telefono;

    cliente.save((err,doc)=>{
        if(!err)
            res.redirect('cliente/list');
        else{
            console.log("Ocurrio un error: "+err);
        }
    })
}

function updateCliente(req,res){
    Cliente.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
        if(!err){
            res.redirect('cliente/list');
        }
    });
}

router.get('/list',(req,res)=>{
    Cliente.find((err,docs)=>{
        if(!err){
            res.render("cliente/list",{
                list: docs
            })
        }
        else{
            console.log("Error en la busqueda de clientes: "+err);
        }
    });
 });

 router.get('/:id',(req,res)=>{
     Cliente.findById(req.params.id,(err,doc)=>{
         if(!err){
             res.render("cliente/addOrEditCliente",{
                viewTittle:"Modificar Cliente",
                cliente: doc
             });
         }
     });
});

router.get('/delete/:id',(req,res)=>{
    Cliente.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.redirect('/cliente/list');
        }        
        else{
            console.log("Ocurrio un error: "+err);
        }
    });
});

module.exports=router;