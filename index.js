const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// Here is the middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('summer is running')
});

app.listen(port, () => {
    console.log(`summer server port on ${port}`)
})