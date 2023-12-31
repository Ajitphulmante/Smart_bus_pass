const nodemailer = require('nodemailer');

const sendMail = (email,data) => {
         
    var Transport = nodemailer.createTransport({
      service : 'Gmail',
      auth :{
        user: "ajitphulmante@gmail.com",
        pass : "arwj wmxv jnif xisk"
      }
    });

    var mailOptions;
    let sender = "Ajit Phulmante";

    mailOptions ={
      from : sender,
      to : email,
      subject : 'Email confirmation',
      html : `press <a href=http://localhost:3000/${data}/verify> here </a> to verify your email. Thanks!`
    };

    Transport.sendMail(mailOptions,function(error,response){
         if (error){
            console.log("email verification error :",error);
         } else{
            alert('Message Sent successfully.');
         }
    })
};

module.exports = sendMail;