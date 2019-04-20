const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/RentCarDB',{useNewUrlParser:true},(err)=>{
    if(!err){
        console.log('Conexion exitosa a MongoDB')
    }
    else{
        console.log('Error en la conexion: '+err)
    }
});

require('./vehiculo.model');
require('./cliente.model');
require('./renta.model');