const mongoose = require('mongoose')

const connect_DB = ()=>{
     mongoose.connect(process.env.DB_URL).then(() =>{
            console.log("DB_CONNECTED")
    }).catch((err) =>{
        console.log(err)
    })
}

module.exports = connect_DB