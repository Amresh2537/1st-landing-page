const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Email route
app.post("/send-email", async (req, res) => {
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
        res.status(200).json({ message: "Your Enquiry sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error); // Log error for debugging
        res.status(500).json({ error: "Failed to send email" });
    }
});

// Ensure Vercel recognizes this as a serverless function
module.exports = app;
