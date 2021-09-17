//

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json() )

//

// encoding lets
let data =  `${input}`;
let buff = new Buffer.from(data);
let base64data = buff.toString('base64');

// encoding
app.post('/encode', (req, res) => {
    

    const { input } = req.body;

    if (!input) {
        res.status(418).send({ message: 'No text to encode'})
    }

    res.status(200).send({
        output: `${base64data}`,
    });
});

//

// decoding lets

let decodeData = `${input}`;
let decodeBuff = new Buffer.from(decodeData, 'base64');
let decodeText = decodeBuff.toString('ascii');

// decoding
app.post('/decode', (req, res) => {

    const { input } = req.body;


    if (!input) {
        res.status(418).send({ message: 'No text to decode'})
    }

    res.status(200).send({
        output: `${decodeText}`,
    });
});


// Listen on port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))