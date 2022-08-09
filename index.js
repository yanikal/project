
const express = require('express');
const bcrypt=require("bcrypt");
const mongoose = require('mongoose');
const Registeruser = require("./models/user.model");
const jwt = require('jsonwebtoken');
const urlencodedParser = express.urlencoded({ extended: true });
const middleware = require('./middleware');
const cors = require('cors');
const app = express();


mongoose.connect("mongodb+srv://root:admin@cluster0.y8nfd.mongodb.net/usersDb?retryWrites=true&w=majority",{
    useUnifiedTopology: true,
    useNewUrlParser: true
    
}).then(
    () => console.log('DB Connection established')
)

app.use(express.json());
app.use(cors());
app.use(urlencodedParser);
app.use(express.static("public"));

//app.use(cors({origin:"*"}))

//routes
const userrouter = require('./routes/user.routes');
app.use('/users',userrouter)
////Routes for home page
app.get('/', (req,res)=>{
  res.sendFile(__dirname +'/public/index.html');//Route handler
});

//Routes for signup page

app.get('/signup', (req,res)=>{
  res.sendFile(__dirname +'/public/signup.html');//Route handler
 
});

//Routes for signin Page
app.get('/signin', (req,res)=>{
  res.sendFile(__dirname +'/public/sign.html')//Route handler
 
});


//Routes for menu page
app.get('/menu', (req,res)=>{
  res.sendFile(__dirname +'/public/menu.html');//Route handler
 
});

//Routes for nutrients page
app.get('/calories', (req,res)=>{
  res.sendFile(__dirname +'/public/calories.html');//Route handler
 
});
//Routes for About page
app.get('/home', (req,res)=>{
  res.sendFile(__dirname +'/public/home.html');//Route handler
});
 //Routes for contact page
app.get('/contact', (req,res)=>{
  res.sendFile(__dirname +'/public/contact.html');//Route handler
});

app.post('/signup',async (req, res) =>{
    try{
        const {fullname,email,password,confirmpassword} = req.body;
        let exist = await Registeruser.findOne({email})
        if(exist){
            return res.status(400).send('User Already Exist')
        }
        if(password !== confirmpassword){
            return res.status(400).send('Passwords are not matching');
        }
        let newUser = new Registeruser({
            fullname,
            email,
            password,
            confirmpassword
        })
        await newUser.save();
        res.status(200).send('Registered Successfully')

    }
    catch(err){
        console.log(err)
        return res.status(500).send('Internel Server Error')
    }
})

app.post('/signin',async (req, res) => {
    try{
        const {email,password} = req.body;
        let exist = await Registeruser.findOne({email});
        if(!exist) {
            return res.status(400).send('User Not Found');
        }
        if(exist.password !== password) {
            return res.status(400).send('Invalid credentials');
        }
        let payload = {
            user:{
                id : exist.id
            }
        }
        jwt.sign(payload,'jwtSecret',{expiresIn:3600000},
          (err,token) =>{
              if (err) throw err;
              return res.json({token})
          }  
            )

    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

app.get('/myprofile',middleware,async(req, res)=>{
    try{
        let exist = await Registeruser.findById(req.user.id);
        if(!exist){
            return res.status(400).send('User not found');
        }
        res.json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

app.listen(5000,()=>{
    console.log('Server running...')
})