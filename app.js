const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const session = require('express-session')
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/Views'));
app.use(express.urlencoded({ extended: false }));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
var flash = require('express-flash')
  app.use(flash());
app.use(session({
  secret:'keyboard cat',
  resave:false,
  saveUninitialized:true,
  cookie: {
    maxAge: 1000000000000000000
  }
}))
const shoesRouter = require('./routers/shoesRouter')
const userRouter = require('./routers/userRouter')
app.get("/", (req, res) => {
    res.render("index.ejs")
})
app.use('/shoes',shoesRouter)
app.use('/user',userRouter)


/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/

// var rand,mailOptions,host,link;
// var nodemailer = require('nodemailer')
// var smtpTransport = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//       user: process.env.USER,
//       pass: process.env.PASSWORD
//   }
// });
// /*------------------SMTP Over-----------------------------*/

// /*------------------Routing Started ------------------------*/

// app.get('/registerEmail',function(req,res){
//     res.sendfile("/Views/email.ejs");
// });
// app.get('/registerEmail/send',function(req,res){
//         rand=Math.floor((Math.random() * 100) + 54);
//     host=req.get('host');
//     link="http://"+req.get('host')+"/verify?id="+rand;
//     mailOptions={
//         to : 'lubisravendra@gmail.com',
//         subject : "Please confirm your Email account",
//         html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
//     }
//     console.log(mailOptions);
//     smtpTransport.sendMail(mailOptions, function(error, response){
//      if(error){
//             console.log(error);
//         res.end("error");
//      }else{
//             console.log("Message sent: " + response.message);
//         res.end("sent");
//          }
// });
// });

// app.get('/verify',function(req,res){
// console.log(req.protocol+":/"+req.get('host'));
// if((req.protocol+"://"+req.get('host'))==("http://"+host))
// {
//     console.log("Domain is matched. Information is from Authentic email");
//     if(req.query.id==rand)
//     {
//         console.log("email is verified");
//         res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
//     }
//     else
//     {
//         console.log("email is not verified");
//         res.end("<h1>Bad Request</h1>");
//     }
// }
// else
// {
//     res.end("<h1>Request is from unknown source");
// }
// });

// /*--------------------Routing Over----------------------------*/