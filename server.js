require('./models/db');

const express=require('express');
const path=require('path');
const exphbs=require('express-handlebars');
const bodyparser=require('body-parser');

const indexController=require('./controllers/indexController');
const vehiculoController=require('./controllers/vehiculoController');
const clienteController=require('./controllers/clienteController');
const rentaController=require('./controllers/rentaController');


var app=express();

app.use(bodyparser.urlencoded({
    extended: true
}));


app.set("views",path.join(__dirname,'/views/'));
app.engine('hbs',exphbs({extname:'hbs',defaultLayout:'mainLayout',layoutsDir: __dirname+'/views/layouts/'}));
app.set('view engine','hbs');



app.listen(3000,()=>{
    console.log('Express server started at port: 3000');
});


app.use('/',indexController);
app.use('/vehiculo',vehiculoController);
app.use('/cliente',clienteController);
app.use('/renta',rentaController);



