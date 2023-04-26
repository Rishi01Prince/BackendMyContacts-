const express = require('express');
const router = express.Router();

router.post('/VechicleData' , (req,res)=>{


    try{
        // console.log(global.VechicleData);
        // console.log(global.VechicleCategory);
        res.send([global.VechicleData , global.VechicleCategory])

    }
    catch(error){
        console.log(error.messsage);
        res.send("Server Error");
    }
})
module.exports = router;