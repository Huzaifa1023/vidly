const mongoose = require("mongoose");
const config = require('config');
const db = config.get('db');
module.exports = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(db)
        .then((res) => console.log(`connected to ${db}`))
}
