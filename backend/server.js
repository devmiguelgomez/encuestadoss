const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Aquí montarás tus rutas
app.use("/api/crear", require("./routes/createEncuesta"));
app.use("/api/votar", require("./routes/votarEncuesta"));
app.use("/api/resultados", require("./routes/resultados"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));