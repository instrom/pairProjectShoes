const express = require('express')
const app = express()
const port = 3004
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
    maxAge: 10000000000000000000
  }
}))
const shoesRouter = require('./routers/shoesRouter')
const userRouter = require('./routers/userRouter')
app.get("/", (req, res) => { // halaman home
    res.render("index.ejs")
})
app.use('/shoes',shoesRouter)
app.use('/user',userRouter)