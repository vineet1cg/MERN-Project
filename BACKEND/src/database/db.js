const mongoose = require('mongoose');
const uri = process.env.MONGO_URI
  "";
async function connectDB(){
    try{await mongoose.connect(uri); console.log("DB Connected 👌")}catch(e){console.log(e)};
};

module.exports = connectDB;