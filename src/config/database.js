// requiring .env
require("dotenv").config();

// statement Database
const url = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@test-crud.yeogy.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

module.exports = url;
