const ctrl = require('../controllers/user')
const router = require('express').Router()


router

    .get('/register',(req,res)=>{res.render('register')})
    .post('/register', ctrl.register)

    .post('/login',ctrl.login)
    .get('/login',(req,res)=>{res.render('login')})

    .get('/',(req,res)=>{
        return res.render('home')    
    })
    
module.exports = router    