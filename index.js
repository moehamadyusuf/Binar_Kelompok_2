const express = require('express')
const app = express()
const { sequelize } = require('./models')
const passport = require ('./lib/passport')
const session = require ('express-session')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set ('view engine', 'ejs')
app.use(session({
    secret:'rahasia',
    resave:false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

//middleware USER
app.use(require("./router/user"))

const connectDb = async ()=>{
    console.log('Checking database connection...')
    try {
        await sequelize.authenticate()
        console.log('Database connection established.')
    } catch (e) {
        console.log('Database connection failed', e)
        process.exit(1)
    }
}

(async ()=> {
    await connectDb()
    app.listen(4000, () => {
        console.log("Server running at http://localhost:4000");
      });

})()



