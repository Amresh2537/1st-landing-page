const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { name, phone, email, address, comment } = req.body;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECEIVER_EMAIL,
            subject: "New Form Submission",
            text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nAddress: ${address}\nComment: ${comment}`
        };

        try {
            await transporter.sendMail(mailOptions);
            return res.status(200).json({ message: "Your Enquiry sent successfully!" });
        } catch (error) {
            console.error("Email error:", error);
            return res.status(500).json({ error: "Failed to send email" });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
};

module.exports = handler;
