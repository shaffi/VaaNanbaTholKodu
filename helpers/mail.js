var mailer = require("nodemailer");
var path = require('path');

// Use Smtp Protocol to send Email
var smtpTransport = mailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "noreply.vaananba@gmail.com",
        pass: "VaananbaTholkodu@madurai"
    }
});

function sendMail(to, body, name, id, callback){
  var html = '', subject = '';

  switch(body){
    case 0:
      link = "http://127.0.0.1:59792/api/sendfile/"+id
      subject = "VaaNanbaTholKodu - Forgot Password",
      html = "Hello " + name + ", <br> Please click <a href="+ link + ">here</a> to change your password";
      break;
  }

  var mail = {
      from: "VaaNanba TholKodu <noreply.vaananba@gmail.com>",
      to: to,
      subject: subject,
      html: html
  }

  smtpTransport.sendMail(mail, function(error, response){
      if(error){
          console.log(error);
          callback(1);
      } else{
          console.log("Mail sent: " + response.message);
          smtpTransport.close();
          callback(0);
      }
  });
}

exports.sendMail = sendMail;
