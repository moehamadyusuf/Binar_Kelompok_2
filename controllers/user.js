const { Users } = require ('../models')
const { where } = require('sequelize')

exports.register = async (req,res,next) => {
    try {
       Users.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email,
       })
       .then(r => {
        console.log(r)
        return res.json({succes: true , message: "registrasi berhasil"})
       })
    } catch (error) {
        console.error(error)
        return res.json({succes: false , error: error.message, 
            message:'terjadi kesalahan saat register'})
    }
}
exports.login = async (req,res) => {
    try {
       const login = await Users.findOne({where:{email: req.body.email}})
       if (login && login.password === req.body.password) {
        return res.json({succes: true , message: "login berhasil"})
       } else {
        return res.json({succes: false , message: "email atau password salah"})
       }
    } catch (error) {
        return res.json({succes: false , error: error.message, 
            message:'terjadi kesalahan saat login'})
    }
}

