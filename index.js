const express = require("express");
const bodyParser = require("body-parser");
const PORT = 3000;
const personaRouter = require("./routes/personaRoutes");

const app = express();

app.use(bodyParser.json());
app.use("/api/personas", personaRouter);

app.listen(PORT, () => {
    console.log(`Aplicacion corriendo en puerto ${PORT}`);
})