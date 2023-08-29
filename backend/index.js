const express  = require('express');
const bodyParser  = require('body-parser');
const mongoose  = require('mongoose');
const path = require("path");
const { promises } = require('dns');
const { rejects } = require('assert');
const { log } = require('console');
const app = express();

app.use(express.static(path.join(__dirname , "src")));

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1/bus_user_data")

const userSchema ={
    username :String,
    passward  : String,
    phone : Number
};

const validateSchema = {
    name : String,
    age : String,
    source : String,
    destination : String,
    adhar : String

}

const profileSchema = {
    username : String,
    picture  : String
}

const validation = new mongoose.model('valide_data',validateSchema);

const User = new mongoose.model("users",userSchema);

const profile1 = new mongoose.model("profiles",profileSchema)



app.get("/api",(req,res)=>{
     res.json({"user":["Ajit",'Anil','Akanksha']});
})

app.post("/signin",(req,res)=>{
    const username = req.body.username;
    const passward = req.body.passward;
    const phone = req.body.phone;

    console.log(username," ",passward," ",phone);

    newUser = new User ({
        username : req.body.username,
        passward : req.body.passward,
        phone : req.body.phone
    })

    newUser.save()
    .then(()=>{return res.json({Status : 'success'})})
    .catch(()=>{return res.json({Status : 'failure'})})

    // console.log(__dirname + "../../buspass/src/components/login.jsx");
    
    
})

app.post("/login",async(req,res)=>{
        
       
       const userName = req.body.username;
       const userPassward= req.body.passward;

       try{
          console.log(userName," ",userPassward);
          const check = await User.findOne({$and : [{"username":userName},{"passward":userPassward}]});
          console.log("check:",check);
          
          if (check)
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

app.post("/validate",(req,res)=>{
     
    //   const name = req.body.name;
    //   const age = req.body.age;
    //   const source = req.body.source;
    //   const destination = req.body.destination;
    //   const adhar = req.body.adhar;

      const validate = new validation({
         name : req.body.name,
         age : req.body.age,
         source : req.body.source,
         destination : req.body.destination,
         adhar : req.body.adhar
      })

      validate.save().then(()=>{
           return res.json({Status:"success"})
      })
      .catch(()=>{return res.json({Status:"failure"})})


    })

app.post("/profile",async(req,res)=>{
        
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


app.listen(5000,()=>{
    console.log("Server is running on port number 5000");
})