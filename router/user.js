const ctrl = require('../controllers/user')
const router = require('express').Router()
const restrict = require('../middleware/restrict')



router

    .get('/register',(req,res)=>{res.render('register')})
    .post('/register', ctrl.register)

    .post('/login',ctrl.login)
    .get('/login',(req,res)=>{ return res.render('login')})

    .get('/',(req,res)=>{
        return res.render('home')    
    })
    
    .get('/whoami',restrict, ctrl.whoami)

module.exports = router    