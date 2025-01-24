const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/userModel');


exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        console.log('Email received:', email);


        const user = await User.findOne({ email });
        if (!user) {
            console.log('No user found with this email:', email);
            return res.status(404).json({ error: 'User with this email does not exist' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        console.log('Generated reset token:', resetToken);

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();

        console.log('User updated with reset token:', user);

        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
        console.log('Reset URL:', resetUrl);

        // Email configuration
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            html: `
                <p>You requested a password reset. Please use the link below to reset your password:</p>
                <a href="${resetUrl}">${resetUrl}</a>
                <p>If you did not request this, please ignore this email.</p>
            `,
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: 'Error sending email' });
            }
            console.log('Password reset email sent');
            res.status(200).json({ message: 'Password reset email sent successfully' });
        });
    } catch (err) {
        console.error('Error in forgotPassword:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.resetPassword = async (req, res) => {
    const { token, password } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ error: 'Password reset token is invalid or expired' });
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: 'Password successfully updated' });
    } catch (error) {
        console.error('Error in resetPassword:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
