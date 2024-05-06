
import express from 'express';
import path from "path";
// import cors from 'cors';
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

const __dirname = path.resolve();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})
// app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/users', userRoute);
app.use('/api/posts', postRoutes);
app.use('/api/messages', messageRoutes);

// http://localhost:8000  =>  Backend
// http://localhost:3000  =>  Frontend

// http://localhost:5000 => backend,frontend

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/THREAD-FE/dist")));

	// react app
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "THREAD-FE", "dist", "index.html"));
	});
}



const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
