const express = require('express')
const bcrypt = require('bcrypt')
const db = require('./config')

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/Login', (req,res)=>{
    res.render('Login')
})

app.post('/Login', async(req,res)=>{
    try{
        const {username, password} = req.body
        if(!username || !password){
            res.status(501).send('username and password required')
        }
        const user = await db.findOne({username:username})
        if(!user){
            res.status(501).send('username does not exists')
        }

        const isCorrectPass = await bcrypt.compare(password, user.password)
        if(!isCorrectPass){
            res.status(501).send('username and password mismatch')
        }

        res.render('Home', {user})
    }catch(err){
        console.error(err)
    }
})

app.get('/Signup', (req,res)=>{
    res.render('Signup')
})

app.post('/Signup', async(req,res)=>{
    try{
        const {username, password} = req.body
        if(!username || !password){
            res.status(501).send('username and password required')
        }
        const user = await db.findOne({username:username})
        if(user){
            res.status(501).send('username already exists')
        }

        const hashPass = await bcrypt.hash(password, 10)
        const newUser = new db({username:username, password:hashPass})
        const saveUser = await newUser.save()

        res.redirect('/Login')
    }catch(err){
        console.error(err)
    }
})

app.get('/EditUser/:id', async(req,res)=>{
    try{
        const userID = req.params.id
        const user = await db.findById(userID)
        res.render('EditUser', {user})
    }catch(err){
        console.error(err)
    }
})

app.post('/UpdateUser/:id', async(req,res)=>{
    try{
        const userID = req.params.id
        const {username, password} = req.body
        if(!username || !password){
            res.status(501).send('username and password required')
        }
        const updateUser = await db.findByIdAndUpdate(userID)
        res.redirect('/UserList')
    }catch(err){
        console.error(err)
    }
})

app.get('/DeleteUser/:id', async(req,res)=>{
    try{
        const userID = req.params.id
        const deleteUser = await db.findByIdAndDelete(userID)
        res.redirect('/UserList')
    }catch(err){
        console.error(err)
    }
})

app.get('/UserList', async(req,res)=>{
    try{
        const userID = req.params.id
        const users = await db.find()
        res.render('UserList',{users})
    }catch(err){
        console.error(err)
    }
})
/*try{

    }catch(err){
        console.error(err)
    } */
const port = 5014
app.listen(port, ()=>{
    console.log(`listening to port${port}`)
})