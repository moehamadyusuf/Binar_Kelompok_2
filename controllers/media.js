const multer = require('multer')
const cloudinary = require('cloudinary')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function(req,file,callback){
        callback(null, './uploads')
    },
    filename: function(req, file, callback){
        callback(null, file.originalname)
    }   
})

const upload = multer ({storage: storage})
const uploads = upload.single('photos')

//cloudinary
cloudinary.config({
    cloud_name: 'dpij7jkkd',
    api_key: '887179886757483',
    api_secret: 'bvb5QnXDrsKCDhEx6DVCc5jZNMI'
})

async function uploadCloudinary(filePath){
    let result;
    try {
        result = await cloudinary.uploader.upload(filePath, {
            use_filename: true})
        fs.unlinkSync(filePath)
        return result.url
    } catch(err){
        fs.unlinkSync(filePath)
        return null
    }
}
const uploadFile = async (req,res)=>{
    
    const url = await uploadCloudinary(req.file.path)
    if (url){
        return res.json({
            message: 'upload berhasil',
            url:url,
        })
    } else {
        return res.json({
            message: 'upload gagal',
        })
    }
}
module.exports= {
    upload,
    uploadFile,
    uploads
}