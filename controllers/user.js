const { Users } = require ('../models')
const { where } = require('sequelize')
const bcrypt = require ('bcrypt')
const e = require('express')
const passport = require('passport')


exports.register = async (req,res,next) => {
    try {
        const register = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        };
    const cek = await Users.findOne({ where: { email: register.email}})
    if (cek) {
        throw new Error("email sudah ada");
    }
    if (!register.email || !register.password || !register.firstName || !register.lastName ) {
        throw new Error("masukan data dengan benar");
    }
    const enc = bcrypt.hashSync(register.password,10)
    
    Users.create({
        firstName: register.firstName,
        lastName: register.lastName,
        email: register.email,
        password: enc
    })
       .then(r => {
        console.log(r)
        return res.render('login')
       })
    } catch (error) {
        console.error(error)
        return res.json({succes: false , error: error.message, 
        message:'terjadi kesalahan saat register'})
    }
}

exports.login = passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true,
})




