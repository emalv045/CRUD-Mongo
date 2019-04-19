const mongoose=require('mongoose');

var clienteSchema=new mongoose.Schema({
    cedula:{type: Number},
    nombre:{type: String},
    correo:{type: String},
    telefono:{type:String}
});

mongoose.model('Cliente',clienteSchema);