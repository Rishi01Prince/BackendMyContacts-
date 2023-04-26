const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');


const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "MynameisRishiRajandInstant";

router.post("/createuser",
    [
        body('email', 'Not a valid mail').isEmail(),
        body('password', 'Password should be minimum of length 5').isLength({ min: 2 }),
        body('name', 'Name should be in length greaater than 3').isLength({ min: 3 })
    ], async (req, res) => {
        try {

            //Json me error ki array
            console.log("Ok entered try");
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success, errors: errors.array() })
            }
            console.log("No Error Found");
            console.log(req.body.location)
            

            //Encypting the password
            const salt = await bcrypt.genSalt(10);
            let secPassword = await bcrypt.hash(req.body.password , salt);

            //Creating the user and adding in Database
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });

        }
        catch (error) {
            // console.log("Error hmmmmm...");
            console.log(error);
            console.log()
            res.json({ success: false });
        }
    })


router.post("/loginuser",
    [body('email', 'Not a valid mail').isEmail(),
    body('password', 'Password should be minimum of length 5').isLength({ min: 2 })], async (req, res) => {
        
        console.log("In Login");
        console.log(req.body.email);
       
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });

            if (!userData) {
                console.log("In first");
                return res.status(400).json({ errors: "Try logging with correct credentials" })
            }

            //Entered password ko encrypt karo fr compare karo
            const pwdCompare = await bcrypt.compare(req.body.password , userData.password);
            
            if (!pwdCompare) {

                console.log(userData.password);
                console.log(pwdCompare+ "No");
                return res.status(400).json({ errors: "Try logging with correct credentials" })
            }

            //Authorization Token hum bana rahe hai taaki hum jab agli baar sign in karegne
            
            //To verification hogi or sign in hogi
            //Jab jab login krte hai tab tab nayi auth token genrate hoti hai
            const data = {
                user:{
                    id:userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret); 
            
            
            return res.json({ success: true, authToken })

        }
        catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

module.exports = router;