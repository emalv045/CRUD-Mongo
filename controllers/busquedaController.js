const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Vehiculo=mongoose.model('Vehiculo');


router.get('/placa',(req,res)=>{
    res.render("busqueda/placa",{
    })
 });

router.post('/',(req,res)=>{
    Vehiculo.find({'placa':req.body.placa},(err,docs)=>{
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

 router.get('/marca',(req,res)=>{
    res.render("busqueda/marca",{
    })
});

router.post('/marca',(req,res)=>{
    Vehiculo.find({'marca':req.body.marca},(err,docs)=>{
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


 router.get('/modelo',(req,res)=>{
    res.render("busqueda/modelo",{
    })
 });

 router.post('/modelo',(req,res)=>{
    Vehiculo.find({'modelo':req.body.modelo},(err,docs)=>{
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

 router.get('/precio',(req,res)=>{
    res.render("busqueda/precio",{
    })
 });

 router.post('/precio',(req,res)=>{
    Vehiculo.count();
    Vehiculo.find({'precio':{'$gte':req.body.precio1,'$lte':req.body.precio2}},(err,docs)=>{
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

router.get('/cantidadtotal',(req,res)=>{
    Vehiculo.count({}, function(err, c) {
        if(!err){
            res.render("busqueda/contador",{
               viewTittle:'Cantidad total de vehiculos: '+c,
            });
        }
});
});

router.get('/preciomayor',(req,res)=>{
    Vehiculo.find().sort({"precio":-1}).limit(1).exec(function(err,docs)
    {
        if(!err){
            res.render("vehiculo/list",{
                list: docs
            })
        }
        else{
            console.log("Error en la busqueda de vehiculos: "+err);
        }    
    }
    );
});

router.get('/preciomenor',(req,res)=>{
    Vehiculo.find().sort({"precio":1}).limit(1).exec(function(err,docs)
    {
        if(!err){
            res.render("vehiculo/list",{
                list: docs
            })
        }
        else{
            console.log("Error en la busqueda de vehiculos: "+err);
        }    
    }
    );
});

router.get('/preciopromedio',(req,res)=>{
    Vehiculo.aggregate([{$group : {_id : "$marca", avg_precio : {$avg : "$precio"}}}]).exec(function(err,docs)
    {
        if(!err){
            res.render("busqueda/promedio",{
                list: docs
            })
        }
        else{
            console.log("Error en la busqueda de vehiculos: "+err);
        }    
    }
    );
});


module.exports=router;

