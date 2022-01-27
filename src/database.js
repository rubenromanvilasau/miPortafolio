require('dotenv').config();
const mongoose=require('mongoose');

mongoose.connect(process.env.DB_URI,{
    useNewUrlParser: true
})
    .then(db=>console.log('Connected to MongoDB'))
    .catch(err=>console.log(process.env.DB_URI))