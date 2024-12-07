require('dotenv').config();

const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const port = process.env.PORT || 5000;

app.use(express.static('.'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL_USER,
        subject: `Message From ${req.body.email} Capella.world`,
        text: req.body.message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Erreur lors de l\'envoi de l\'email:', error);
            return res.status(500).send('Erreur lors de l\'envoi de l\'email');
        } else {
            console.log('Email envoyé:', info.response);
            return res.send('success');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});