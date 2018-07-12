const express = require('express');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
//load routes
const ideas = require('./routes/ideas');



const users = require('./routes/users');

//load passport



require('./config/passport')(passport);

//DB config
const db = require('./config/database');

mongoose.Promise = global.Promise;
mongoose.connect(db.mongoURI)
  .then(()=>console.log('mongodb connected'))
  .catch(err => console.log(err));
  //load idea model
 // require('./models/Idea');
  //const Idea = mongoose.model('ideas');
  app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use( bodyParser.json());

//static folder
app.use(express.static(path.join(__dirname,'public')));

app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());



app.use(flash());
//Global variables
  app.use(function(req,res,next){
      res.locals.success_msg = req.flash('success_msg');
      res.locals.error_msg = req.flash('success_msg');
      res.locals.error = req.flash('error');
      res.locals.user = req.user || null;
      next();
  });

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.get('/',(req,res)=>{
  const title = 'WELCOME'
  res.render('index',{title:title});
});
app.get('/about',(req,res)=>{
  res.render('about');
});
app.use('/ideas',ideas);
     app.use('/users',users);



const port = process.env.PORT || 5500;


app.listen(port,()=>{
console.log('server started on port '+ port);
});






/*app.get('/ideas',(req,res)=>{
  Idea.find({})
  .sort({date:'desc'})
  .then(ideas =>{
    res.render('ideas/index',{
      ideas:ideas
    });
  });
});
app.get('/ideas/add',(req,res)=>{
  res.render('ideas/add');
});
app.get('/ideas/edit/:id',(req,res)=>{
 Idea.findOne({
  _id:req.params.id
 })
 .then(idea=>{
  res.render('ideas/edit',{
    idea : idea
  });
 });
});
app.post('/ideas',(req,res)=>{
  let errors = [];
  if(!req.body.title){
    errors.push({text:"please add a title"});
                     }
  if(!req.body.details){
    errors.push({text:"please add some details"});
                       }
  if(errors.length > 0){
    res.render('ideas/add',{
      errors:errors,  
      title:req.body.title,
      details:req.body.details
  });
    }
    else{
      const newUser = {
        title:req.body.title,
        details:req.body.details,
      }
        new Idea(newUser)
        .save()
        .then(idea =>{
          req.flash('success_msg','Video Idea Added');
          res.redirect('/ideas');
        })
        }
   });
   app.put('/ideas/:id',(req,res)=>{
  Idea.findOne({
    _id:req.params.id
  })
  .then(idea =>{ 
    idea.title = req.body.title,
    idea.details = req.body.details;
    
    idea.save()
    .then(idea => {
      req.flash('success_msg','Video Idea Updated');
      res.redirect('/ideas');
    }) 
              });
     });

   app.delete('/ideas/:id',(req,res)=>{
   Idea.remove({_id: req.params.id})
    .then(idea=>{
      req.flash('success_msg','Video Idea Removed');
      res.redirect('/ideas');
    });
   });*/
   /*app.get('/users/login',(req,res)=>{
      res.send('login');
     }); 

     app.get('/users/register',(req,res)=>{
     res.send('register');
     });*/
    /* app.use('/ideas',ideas);
     app.use('/ideas',users);
const port = 5500;
app.listen(port,()=>{
console.log('server started on port '+ port);
});*/