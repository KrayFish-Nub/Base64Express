const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const rateLimit = require("express-rate-limit");

app.use(express.json() )


// Rate limiter
const limiter = rateLimit({
    windowMs: 100 * 60 * 100, // 10 minutes
    max: 100, // 100 requests max every 10 minutes
    message:"You are sending too many requests. Please try again later."
})


// encoding through URI
app.post('/encode/:input', limiter, (req, res) => {
    

    const { input } = req.params;

    // encoding lets
  let data =  `${input}`;
  let buff = new Buffer.from(data);
  let base64data = buff.toString('base64');

    if (!input) {
        res.status(418).send({ message: 'No text to encode'})
    }

    res.status(200).send({
        output: `${base64data}`,
    });
});


// decoding through URI
app.post('/decode/:input', limiter, (req, res) => {

    const { input } = req.params;

    // decoding lets

  let decodeData = `${input}`;
  let decodeBuff = new Buffer.from(decodeData, 'base64');
  let decodeText = decodeBuff.toString('ascii');


    if (!input) {
        res.status(418).send({ message: 'No text to decode'})
    }

    res.status(200).send({
        output: `${decodeText}`,
    });
});


// Listen on port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))


app.get('/', limiter, (req, res) => {
  res.sendFile('/home/runner/api/index.html'),  (req, res)
});
