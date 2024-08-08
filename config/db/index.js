const mongoose = require('mongoose');

async function connect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/KotlineDB');
        console.log("ket noi thanh cong ")
    } catch (error) {
        console.log("ket noi thất bại ")
    }
   
}
module.exports = {connect}


