import express from 'express';
import initViewEngine from './config/viewEngine';
import initWebRouter from './routes/root';
import connectDB from './config/connectDB';
import cors from 'cors';
import cookieParser from 'cookie-parser'
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

const corsConfig = {
    origin: 'http://localhost:3000',
    methods: [ 'GET', 'POST', 'PUT', 'DELETE' ],
    credentials: true
};
app.use(cors(corsConfig));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// CONFIG APP
initViewEngine(app);
initWebRouter(app);
connectDB()

app.listen(port, () => {
    console.log(`Connected http://localhost:${ port }`)
});