const mongoose=require('mongoose');

var rentaSchema=new mongoose.Schema({
    cedula:{type: Number},
    placa:{type: Number},
    dia:{type: Number},
    monto:{type:Number}
});

mongoose.model('Renta',rentaSchema);