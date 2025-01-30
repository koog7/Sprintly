import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import UserAuth from "./routers/UserAuth";
import ProjectRouter from "./routers/ProjectRouter";
const app = express();
const port = 8000;

app.use(cors())
app.use(express.json());
app.use(express.static("public"));
app.use("/auth", UserAuth);
app.use("/project", ProjectRouter)


const run = async () => {

    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/sprintly');
        console.log('Соединение с БД установлено');
    }catch (e) {
        console.error('Не удалось подключиться, ошибка:', e);
    }

    app.listen(port, () => {
        console.log('Сервер запущен на - http://localhost:' + port);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(console.error);