const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async (options) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: options.to,
            subject: options.subject,
            text: options.text,
        });
    } catch (error) {
        console.error('Email sending error:', error);
    }
};

module.exports = sendEmail;
