require('dotenv').config();

const express = require('express'); // express package installed
const mongoose = require('mongoose')
const movieroutes = require('./routes/movie')
const cookieparser = require('cookie-parser')

const app = express() // function which we envoke that starts my app

app.use(express.json());
app.use(cookieparser())

//routes [server responds]
app.use('/', movieroutes)


// listen for requests
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
        console.log('connected to db & listening on port', process.env.PORT)
    })

    })
    .catch((error) => {
        console.log(error)
    })


