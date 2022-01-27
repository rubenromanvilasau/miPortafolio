const express=require('express');
const path=require('path');


//Initializations
const app= express();
require('./database');

//Settings
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs');

//Middlewares
app.use(express.urlencoded({extended:false}));

//Routes
app.use(require('./routes/index.js'));

//Statics
app.use(express.static(path.join(__dirname, 'public')));

//Server listening
app.listen(app.get('port'),()=>{
    console.log('Server listening on port: ', app.get('port'));
});