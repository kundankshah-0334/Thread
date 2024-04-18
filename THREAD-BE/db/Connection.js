import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const ConnectionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB 55:', error);
    }
};

export default ConnectionDB;
