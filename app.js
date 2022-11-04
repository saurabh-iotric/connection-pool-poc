const { json } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const {userSchema} = require('./user.js')


const db = require('./db.js')
const useDbOptions = {
    //ensures connections to the same databases are cached
    useCache: true,
    //remove event listeners from the main connection
    noListener: true
}


//starting a server

const app = express()
app.use(express.json())

global.clientConnection = db.initDbConnection()

//middleware
app.use(async(req,res,next) => {
    const dbConnection = await global.clientConnection;
    const db = await dbConnection.useDb(req.body.dbName || req.params.dbName,useDbOptions);
    req.db = db;
    next();
})
function createModel(db,model,schema){
    return db.model(model,schema)
}
app.post('/api/user',async(req,res) => {
   try{
    const userModel = createModel(req.db,'User',userSchema)
    const newUser = await req.userModel.create({name:req.body.name,email:req.body.email})
    //deleting model to prvent memory leak
    userModel.remove()
    
    res.status(200).json({user:newUser})
   }
   catch(err){
    console.log(err)
   }
})

app.get('/api/user/:dbName',async(req,res) => {
    const userModel = createModel(req.db,'User',userSchema)
    const users = await userModel.find()
    //deleting model to prvent memory leak
    userModel.remove()
    return res.status(200).json({users});
})





app.listen(6000,() => console.log("server hase been started"));