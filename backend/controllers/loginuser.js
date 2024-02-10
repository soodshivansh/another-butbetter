const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser')

const User = require("../modals/user")


const loginuser = async (req , res) => {
    try{
        const {email,password} = req.body

        // validation
        if(!(email && password)){
            res.status(400).send("fields are missing")
        }
        // find user in db
        const user = await User.findOne({email})
        if(!user){
            res.status(400).send("user not found")
        }

        if(user && (await bcrypt.compare(password, user.password))){
            const token = await jwt.sign(
                {name: user.name, email: user.email},
                `${process.env.BCRYPT_SALT}`, // salt
                {
                    expiresIn: "2h"
                }
            )
            user.token = token
            user.password = undefined
            
            // send token in user cookie
            const options = {
                expires : new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.status(200).cookie("token",token, options).json({
                success: true,
                token
            })
        } else {
            res.status(400).send("incorrect password")
        }
    }
    catch{
        console.log(error)
    }
}

module.exports = loginuser
