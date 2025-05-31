const mongoose = require("mongoose");

const opcionSchema = new mongoose.Schema({
texto: String,
votos: { type: Number, default: 0 }
});

const encuestaSchema = new mongoose.Schema({
pregunta: { type: String, required: true },
opciones: [opcionSchema],
codigo: { type: String, unique: true, required: true },
creadaEn: { type: Date, default: Date.now },
ipsVotantes: [String]
});

module.exports = mongoose.model("Encuesta", encuestaSchema);