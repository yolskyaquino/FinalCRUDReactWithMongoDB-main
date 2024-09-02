const mongoose = require('mongoose')
const connect = mongoose.connect('mongodb://127.0.0.1:27017/AdminsTable')

connect.then(()=>{
    console.log('database connected')
}).catch(()=>{
    console.log('database not connected')
})

const loginSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = new mongoose.model('UpperTable', loginSchema, 'UpperTable')
module.exports = collection;