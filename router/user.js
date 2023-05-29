const ctrl = require('../controllers/user')
const router = require('express').Router()
const restrict = require('../middleware/restrict')
const media = require('../controllers/media')



router

    .get('/register',(req,res)=>{res.render('register')})
    .post('/register', ctrl.register)

    .post('/login',ctrl.login)
    .get('/login',(req,res)=>{ return res.render('login')})

    .get('/',(req,res)=>{
        return res.render('home')    
    })
    
    .get('/whoami',restrict, ctrl.whoami)

    .post('/uploadProfile', media.upload.single('photos'),(req,res)=>{
        res.send(req.files)
    })

    .post('/uploadMedia', media.uploads, media.uploadFile)

module.exports = router    