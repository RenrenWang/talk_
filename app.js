var express=require('express'),
    bodyParser = require('body-parser'),
    path=require('path'),
    router=require('./routers/router.js'),
    session=require('express-session'),
    app=express();



app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'/public')));
app.use('/avatar',express.static(path.join(__dirname,'/avatar')));
app.set('trust proxy', 1) // trust first proxy 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
 // cookie: { secure: true }
}));

 // secret: 'keyboard cat',
 //    resave: false,
 //    saveUninitialized: true
// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/',router);
app.use(function(req,res,next){
     var err = new Error('404,Not Found!!!');
         err.status = 404;
         next(err);
});
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('err', {
    message: err.message,
    error: {},
  
  });
});

app.listen(80,'192.168.0.5');
     

