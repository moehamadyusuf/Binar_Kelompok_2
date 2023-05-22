const express = require('express')
const app = express()
const { sequelize } = require('./models')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set ('view engine', 'ejs')


app.use('/user', require('./router/user'))


app.get("/",(req,res)=>{
    console.log("Test root api running")
    return res.send("Test root api running")
})



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



