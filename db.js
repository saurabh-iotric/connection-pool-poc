const mongoose = require('mongoose');

const clientOption = {
        socketTimeoutMS: 30000,
        keepAlive: true,
        maxPoolSize: 50,
        useNewUrlParser: true,
        autoIndex: false,
        wtimeoutMS:30000
      };

function initDbConnection(){
   const db =  mongoose.createConnection('mongodb://localhost:27017/basedb',clientOption);
   db.on("error",() => {console.log("something went wrong")})
   db.once("open", function() {
    console.log("client MongoDB Connection ok!");
  });
  require('./user')
  return db;

}
module.exports ={initDbConnection};