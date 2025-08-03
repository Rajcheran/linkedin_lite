const express = require('express')
const path = require('path');

const bodyparser =require('body-parser'); 

const app = express();


app.set('view engine','ejs');
app.set('views','views');

const driverroutes = require('./routes/driver_routes')
const adminroutes = require('./routes/admin_routes')
const login = require('./controller/admin')

const mongoconnect = require('./util/database').mongoconnect

app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./','style')));
app.use(express.static(path.join(__dirname,'./','images')));

 app.use('/login',(req,res)=>{
     res.render('login',{editing:false})
 })

app.use('/driver',driverroutes)

app.use('/admin',adminroutes)

const errorcont = require('./controller/error')
app.use(errorcont.get404)
mongoconnect(()=>{
    app.listen(6000);
})