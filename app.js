const express = require('express');
const { config } = require('process');
const connect = require("./utils/connection");
const routes = require("./routes")
const app = express();
const port = 8000 || config.get("port");
connect();
app.use(express.json());
app.use("/api", routes);
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))