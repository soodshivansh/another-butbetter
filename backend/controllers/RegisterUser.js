const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require("../modals/user")

const registeruser = async (req , res) => {
    try{
        const {name,email,password} = req.body

        if(!(name && email && password)){
            res.status(400).send('All fields are compulsory')
        }

        // check if user exist - based on email 
        const existinguser = await User.findOne({ email })

        if(existinguser){
            res.status(400).send("user already exist")
        }

        const encryptedpassword = await bcrypt.hash(password,10)

        // save user in db
        const user = await User.create({
            name: name,
            email: email,
            password: encryptedpassword
        })

        // generating a token for user
        const token = await jwt.sign(
            {name: user.name, email: user.email},
            `${process.env.BCRYPT_SALT}`, // salt
            {
                expiresIn: "2h"
            }
        )

        user.token = token
        user.password = undefined

        res.status(200).json({token: user.token})

    }
    catch{
        console.log(error)
    }
}

module.exports = registeruser
