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

app.post('/api/user',async(req,res) => {
   try{
    const dbConnection = await global.clientConnection;
    const db = await dbConnection.useDb(req.body.dbName,useDbOptions);
   const userModel = await db.model("User",userSchema);

    const newUser = await userModel.create({name:req.body.name,email:req.body.email})
    res.status(200).json({user:newUser})
   }
   catch(err){
    console.log(err)
   }
})

app.get('/api/user/:dbName',async(req,res) => {
    const dbConnection = await global.clientConnection;
    const db = await dbConnection.useDb(req.params.dbName,useDbOptions);
   const userModel = await db.model("User",userSchema);
    const users = await userModel.find()
    return res.status(200).json({users});
})





app.listen(6000,() => console.log("server hase been started"));