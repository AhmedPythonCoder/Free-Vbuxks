const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'YourEmailServiceProvider',
    auth: {
        user: 'your_email@gmail.com',
        pass: 'your_password'
    }
});

app.use(express.static('public')); // Serve static files from the 'public' folder
app.use(express.json());

app.post('/send-email', async (req, res) => {
    const { email } = req.body;

    const mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Verification Email',
        text: 'Thank you for using Free Vbucks Nexus!'
    };

    try {
        const emailInfo = await transporter.sendMail(mailOptions);
        console.log('Email sent:', emailInfo.response);
        res.json({ message: 'Email sent successfully.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Email not sent.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
