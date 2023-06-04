const express = require('express');
const router = express.Router();

router.post('/ContactDetials', (req, res) => {
  try {
    res.send([global.CotactDetails]);
  } catch (error) {
    console.log(error.message);
    res.send("Server Error");
  }
});

module.exports = router;
