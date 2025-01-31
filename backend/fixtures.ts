import mongoose from "mongoose";
import User from "./models/UserModel";
import Project from "./models/ProjectModel";
import {randomUUID} from "node:crypto";

const run = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/sprintly');

    const db = mongoose.connection;

    try {
        await db.dropCollection("users");
        await db.dropCollection("projects");
    }catch (err) {
        console.error('Ошибка при удалении коллекций:', err);
    }

    const user1 = new User({
        username: "koog7",
        password: "test",
        activeGroups: [],
        token: randomUUID(),
    });

    const user2 = new User({
        username: "koog77",
        password: "test",
        activeGroups: [],
        token: randomUUID(),
    });

    await user1.save();
    await user2.save();

    const project1 = new Project({
        owner: user1?._id,
        name: "WingFit1",
        activeUser: [],
        availablePlace: 7,
    });
    await project1.save();
    const project2 = new Project({
        owner: user2?._id,
        name: "WingFit2",
        activeUser: [],
        availablePlace: 7,
    });
    await project2.save();
}

run().then(() => console.log('Данные обновлены.'))