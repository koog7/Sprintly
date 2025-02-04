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

    const project1 = new Project({ name: "WingFit1", availablePlace: 7, description: 'Online platform' });
    const project2 = new Project({ name: "WingFit2", availablePlace: 7 });

    const user1 = new User({
        username: "koog7",
        password: "test",
        activeGroups: [project1._id],
        token: randomUUID(),
    });

    const user2 = new User({
        username: "koog77",
        password: "test",
        activeGroups: [project2._id],
        token: randomUUID(),
    });

    await user1.save();
    await user2.save();


    project1.owner = user1._id;
    project1.activeUser = [user1._id];

    project2.owner = user2._id;
    project2.activeUser = [user1._id];

    await project1.save();
    await project2.save();
}

run().then(() => console.log('Данные обновлены.'))