require('dotenv').config();
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const router = require("./routes/user")
const path = require('path');
const cookieParser = require("cookie-parser")
app.use(bodyParser.json())
app.use(cookieParser())

//use the client app
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

//connecting to mongobd using Mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use("/auth", router)
app.listen(3000, () => {
    console.log("server is running on port 3000")
})

