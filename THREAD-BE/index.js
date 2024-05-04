
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import ConnectionDB from './db/Connection.js';
import userRoute from './routes/userRoute.js';
import postRoutes from './routes/postRoutes.js'
import messageRoutes from "./routes/messageRoutes.js"
import { v2 as cloudinary} from "cloudinary";
import { app , server } from "./socket/socket.js"
dotenv.config();
ConnectionDB();

// const app = express();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/users', userRoute);
app.use('/api/posts', postRoutes);
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
