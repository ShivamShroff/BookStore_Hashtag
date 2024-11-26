const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/router");
const PORT = process.env.PORT || 3000;
require("dotenv").config();

//allowing request only from this port
var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus:200,
};
//using middlewares 
app.use(cors(corsOptions));
app.use(express.json()); //used to parse in incoming json in req.body
//mounting routes

app.get("/", (req, res) => {
    res.status(200).json({ 
        message: "Server is running smoothly" 
    });
});

app.use("/api", router);

app.listen(PORT, () => {
    console.log(`app is running at ${PORT}`);
});