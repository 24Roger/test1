// importing module
const mongoose  = require("mongoose");
const url = require("./config/database");
const app = require("./router/index.routes");
const { red } =  require("chalk");

// requiring .env
require("dotenv").config();

// Database connection
mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(red("Connected database")))
    .catch((e) => console.log("Error database:", e));

// start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})