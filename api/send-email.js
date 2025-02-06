module.exports = (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { name, phone, email, address, comment } = req.body;

    const nodemailer = require("nodemailer");
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

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Email error:", error);
            return res.status(500).json({ error: "Failed to send email" });
        } else {
            return res.status(200).json({ message: "Your Enquiry sent successfully!" });
        }
    });
};
