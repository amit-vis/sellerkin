const express = require('express');
const app = express()
const port = 8000;
const nodemailer = require('nodemailer');
const db = require('./mongoose');
const User = require('./userSchema');
const cors = require('cors');

app.use(express.json());
app.use(cors())

// create transporter
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth:{
        user: 'amit917480@gmail.com',
        pass: 'xjfdvqzeqiggzvjx'
    }
})

let renderTmplate = async (link)=>{
    const info = await transporter.sendMail({
        from: "amit917480@gmail.com",
        to: link,
        subject: "Thanks for subscription",
        html: "<b>Thanks for Subscribing</b>",
    })
    return info
}

app.post('/data', async (req, res) => {
    try {
            let newUser = await User.create({
                email: req.body.email,
                name: req.body.name,
            });
            let emailmsg = await renderTmplate(newUser.email);
            res.status(200).json({
                success: true,
                message: "Subscribe successfully",
                newUser,
                emailmsg,
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error in subscribing",
            error,
        });
    }
});

app.listen(port, (err)=>{
    if(err){
        console.log("port is not listining", err)
    }
    console.log("successfully connected to port", port)
})