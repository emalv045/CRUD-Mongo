const mongoose=require('mongoose');

var vehiculoSchema=new mongoose.Schema({
    placa:{type: Number},
    capacidad:{type: Number},
    marca:{type: Number},
    estilo:{type: String},
    modelo:{type:String},
    color:{type:String},
    cilindrada:{type: Number},
    combustible:{type:String},
    transmision:{type:String},
    anno:{type: Number},
    extras:{type:String},
    precio:{type: Number},
    estado:{type:String}
});

mongoose.model('Vehiculo',vehiculoSchema);