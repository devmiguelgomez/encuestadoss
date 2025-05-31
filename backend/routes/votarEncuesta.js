const express = require("express");
const router = express.Router();
const Encuesta = require("../models/Encuesta");

router.post("/:codigo/votar", async (req, res) => {
const { codigo } = req.params;
const { opcion } = req.body;
const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

try {
const encuesta = await Encuesta.findOne({ codigo });

if (!encuesta) return res.status(404).json({ msg: "Encuesta no encontrada" });

// Verifica si la IP ya votó
if (encuesta.ipsVotantes && encuesta.ipsVotantes.includes(ip)) {
  return res.status(403).json({ msg: "Ya has votado en esta encuesta" });
}

const opcionEncontrada = encuesta.opciones.id(opcion);
if (!opcionEncontrada) return res.status(404).json({ msg: "Opción no encontrada" });

opcionEncontrada.votos += 1;
if (!encuesta.ipsVotantes) encuesta.ipsVotantes = [];
encuesta.ipsVotantes.push(ip);
await encuesta.save();

res.json({ msg: "Voto registrado" });

} catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error al votar" });
    }
    });
    
    module.exports = router;