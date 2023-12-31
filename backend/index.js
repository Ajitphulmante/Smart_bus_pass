const express  = require('express');
const bodyParser  = require('body-parser');
const mongoose  = require('mongoose');
const path = require("path");
const { promises } = require('dns');
const { rejects } = require('assert');
const { log } = require('console');
const multer = require('multer');
const fs =require('fs-extra');
const render = require('react-node-render')


const sendMail = require('./public/emailVerification.js')


const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, './public')))

const storage = multer.diskStorage({
      destination : function (req,file,cb){
            const path = "./userFiles/"+req.body.name;
            fs.mkdirSync(path,{recursive : true});
            cb(null,path);
      },
      filename :function(req,file,cb){
            cb( null,Date.now() + "-" +file.originalname )
      }
})

const upload = multer({storage:storage});





// app.use(express.static("public"));


mongoose.connect("mongodb://127.0.0.1/bus_user_data")

const userSchema ={
    username :String,
    passward  : String,
    email : String,
    phone : Number,
    isValide : Boolean
};

const validateSchema = {
    name : String,
    age : String,
    source : String,
    destination : String,
    adhar : String,
    lightbill : String,
    passform : String

};

const profileSchema = {
    username : String,
    picture  : String
};

const validation = new mongoose.model("validation",validateSchema);

const User = new mongoose.model("users",userSchema);

const profile1 = new mongoose.model("profiles",profileSchema)

app.post("/signin",async(req,res)=>{
    const username = req.body.username;
    const passward = req.body.passward;
    const email = req.body.email;
    const phone = req.body.phone;

    console.log(username," ",passward," ",email," ",phone);

    newUser = new User ({
        username : req.body.username,
        passward : req.body.passward,
        email : req.body.email,
        phone : req.body.phone,
        isValide : false
    })


    const alreadyExits = await User.findOne({username:username});

    if (alreadyExits){
        return res.json({Status:"exits"})
    }


    newUser.save()
    .then(()=>{return res.json({Status : 'success'})})
    .catch(()=>{return res.json({Status : 'failure'})})

    
    
})

app.get('/:data/verify',async(req,res)=>{

    const {data} = req.params
    console.log("username:",data);

    const user = await User.findOne({username:data});

    if (user){
        user.isValide=true;
        await user.save();   
        res.json('user found');
    }
    else {
        res.json("user not  found ok");
    }

})





app.post("/login",async(req,res)=>{
        
       
       const userName = req.body.username;
       const userPassward= req.body.passward;

       try{
          console.log(userName," ",userPassward);
          const check = await User.findOne({$and : [{"username":userName},{"passward":userPassward}]});
          console.log("check:",check);

          if (check.isValide===false){
            sendMail(check.email,userName);
            return res.json({Status: "not verified"})
          }
          
          else if (check)
            {    
                  
                const profilePic = await profile1.findOne({"username":userName})
                // console.log("profilePic:",profilePic);

                if (profilePic){
                    return res.json({Status: "success",username:userName,profile:profilePic.picture});  
                }
                else return res.json({Status: "success",username:userName,profile:""});  
               
            }
          else return res.json({Status:"failure"});
       }catch(err){
            console.log(err);
            return res.json({Status:"failure"});
       }

})



app.post("/validate",upload.fields([{name:"adhar"},{name:"lightbill"},{name:"passform"}]),(req,res)=>{
        
        console.log(req.files," ",req.body);

        validate = new validation({
         name : req.body.name,
         age : req.body.age,
         source : req.body.source,
         destination : req.body.destination,
         adhar :  req.files['adhar'][0].path,
         lightbill : req.files['lightbill'][0].path,
         passform :  req.files['passform'][0].path
      })

      console.log("valide:",validate);

      validate.save()
      .then(()=>{
           return res.json({Status:"success"}) 
      })
      .catch(()=>{ return res.json({Status:"failure"}); })

    })

app.post("/profile",async(req,res)=>{
        console.log("body:",req.body);
        const pictureurl = req.body.profile;
        const username1 = req.body.username;

        console.log("picuture :",pictureurl," ",username1);
        

        ProfileData = new profile1({username:username1,picture:pictureurl})

        ProfileData.save().then(()=>{
            console.log("profile updated successfull");
            return res.json({Status:"success"});
            
        })
        .catch(()=>{
            console.log("profile updation failed");
            return res.json({Status:"failure"})
        })
})

// app.get("/fetchProfile",async(req,res)=>{
       
//     const result = await profile1.findOne({username:})
// })


app.listen(5000,()=>{
    console.log("Server is running on port number 5000");
})