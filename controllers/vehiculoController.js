const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Vehiculo=mongoose.model('Vehiculo');


router.get('/',(req,res)=>{
    res.render("vehiculo/addOrEditVehiculo",{
        viewTittle:"Insertar Vehiculo"
    })
})

router.post('/',(req,res)=>{
    if(req.body._id=='')
        insertVehiculo(req,res);
    else
        updateVehiculo(req,res);
    
});

function insertVehiculo(req,res){
    var vehiculo=new Vehiculo();
    vehiculo.placa=req.body.placa;
    vehiculo.capacidad=req.body.capacidad;
    vehiculo.marca=req.body.marca;
    vehiculo.estilo=req.body.estilo;
    vehiculo.modelo=req.body.modelo;
    vehiculo.color=req.body.color;
    vehiculo.cilindrada=req.body.cilindrada;
    vehiculo.combustible=req.body.combustible;
    vehiculo.transmision=req.body.transmision;
    vehiculo.anno=req.body.anno;
    vehiculo.extras=req.body.extras;
    vehiculo.precio=req.body.precio;
    vehiculo.estado=req.body.estado;
    vehiculo.save((err,doc)=>{
        if(!err)
            res.redirect('vehiculo/list');
        else{
            console.log("Ocurrio un error: "+err);
        }
    })
}

function updateVehiculo(req,res){
    Vehiculo.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
        if(!err){
            res.redirect('vehiculo/list');
        }
    });
}

router.get('/list',(req,res)=>{
    Vehiculo.find((err,docs)=>{
        if(!err){
            res.render("vehiculo/list",{
                list: docs
            })
        }
        else{
            console.log("Error en la busqueda de vehiculos: "+err);
        }
    });
 });

 router.get('/:id',(req,res)=>{
     Vehiculo.findById(req.params.id,(err,doc)=>{
         if(!err){
             res.render("vehiculo/addOrEditVehiculo",{
                viewTittle:"Modificar Vehiculo",
                vehiculo: doc
             });
         }
     });
});

router.get('/delete/:id',(req,res)=>{
    Vehiculo.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.redirect('/vehiculo/list');
        }        
        else{
            console.log("Ocurrio un error: "+err);
        }
    });
});

module.exports=router;