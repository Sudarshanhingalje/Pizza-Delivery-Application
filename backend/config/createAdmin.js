const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Corrected path

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

const createAdmin = async () => {
    try {
        const email = "sudarshanhingalje1@gmail.com";
        const password = "Sudu@1308";
        
        // Check if admin already exists
        let admin = await User.findOne({ email });
        
        if (!admin) {
            const hashedPassword = await bcrypt.hash(password, 10);
            admin = new User({
                name: "Admin User",
                email,
                password: hashedPassword,
                isAdmin: true,
                isVerified: true,
            });
            await admin.save();
            console.log("Admin user created successfully.");
        } else {
            console.log("Admin user already exists.");
        }
    } catch (error) {
        console.error("Error creating admin user:", error.message);
    } finally {
        mongoose.connection.close();
    }
};

// Execute the script
const run = async () => {
    await connectDB();
    await createAdmin();
};

run();