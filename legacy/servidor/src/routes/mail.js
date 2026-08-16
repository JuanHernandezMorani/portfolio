const { Router } = require("express");
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = Router();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

app.post('/send', async (req, res) => {
    const { nombre, telefono, email, motivo, mensaje } = req.body;

    if (!nombre || (!telefono || !email) || !motivo || !mensaje) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
    }

    const mailToMe = {
        from: email,
        to: process.env.MAIL_USERNAME,
        subject: `Nuevo mensaje de ${nombre}`,
        text: `Hola, me estoy comunicando por ${motivo}.`,
        html: `<p style="text-align:center;">${mensaje}</p>
        </br>
        <div style="text-align:left;">
            <span>Mis datos de contacto:</span>
            <span>Mail: ${email ? email : "[hidden]"}</span>
            <span>Telefono: ${telefono ? telefono : "[hidden]"}</span>
        </div>`
    };

    const mailToClient = {
        from: process.env.MAIL_USERNAME,
        to: email,
        subject: `Gracias por contactarme`,
        text: `Hola, ${nombre}!`,
        html: `<p style="text-align:center;">Este mensaje es para confirmar que me llego tu mensaje, porfavor no respondas a este mail automatico.</p>
        </br>
        <div style="text-align:left;">
            <span>Saludos Cordiales</span>
            <span>ATTE Juan Braian Hernandez Morani</span>
        </div>`
    };

    try {
        await transporter.sendMail(mailToMe);
        await transporter.sendMail(mailToClient);
        res.json({ success: true, message: 'Correos enviados con éxito' });
    } catch (error) {
        console.error('Error al enviar los correos:', error);
        res.status(500).json({ success: false, message: 'Error al enviar los correos' });
    }
});

module.exports = app;