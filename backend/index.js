import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import path from 'path';

import { connectDb } from './db/connectDb.js';

import authRoutes from './routes/auth.route.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();

app.use(cors({origin: 'https://authenticator-app-frontend-d37u.onrender.com', credentials: true}));

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join(__dirname, '/frontend/dist')));

//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
//     })
// }

app.listen(PORT, () => {
    connectDb();
    console.log(`Server is running on port ${PORT}`);
})
