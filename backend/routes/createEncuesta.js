const express = require("express");
const router = express.Router();
const Encuesta = require("../models/Encuesta");

const generarCodigo = () => Math.random().toString(36).substring(2, 8).toUpperCase();

router.post("/", async (req, res) => {
const { pregunta, opciones } = req.body;

if (!pregunta || !opciones || opciones.length < 2) {
return res.status(400).json({ msg: "Pregunta y mínimo 2 opciones requeridas" });
}

try {
const nuevaEncuesta = new Encuesta({
pregunta,
opciones: opciones.map(texto => ({ texto })),
codigo: generarCodigo()
});

const guardada = await nuevaEncuesta.save();
res.json(guardada);

} catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error al crear encuesta" });
    }
    });
    
    module.exports = router;