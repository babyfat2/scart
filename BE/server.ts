import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from 'dotenv';
import cookieParser from "cookie-parser";


import serviceRouter from "./components/routes/service";
import authRouter from "./components/routes/auth";
import actionRouter from "./components/routes/action";
import userRouter from "./components/routes/user";
import { decryptCookie, decryptRefreshToken } from "./middleware/auth";
import { refreshToken } from "./components/controller/action/refreshToken";

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(80, () => {
    console.log('Server is running on port 80');
});

app.use('/api/service', serviceRouter);
app.use('/api/auth', authRouter);
app.use('/api/action',decryptCookie , actionRouter);
app.use('/api/user', decryptCookie , userRouter);

app.get('/api/refreshToken',decryptRefreshToken, refreshToken);