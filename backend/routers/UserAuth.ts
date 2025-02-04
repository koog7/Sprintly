import express from "express";
import User from "../models/UserModel";
import {randomUUID} from "node:crypto";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserAuth = express.Router();
UserAuth.use(express.json());

UserAuth.post("/", async (req, res, next) => {
    try {
        const existingUser = await User.findOne({ username: req.body.username });

        if (existingUser) {
            return res.status(400).send({ message: "Имя пользователя занято." });
        }

        const user = new User({
            username: req.body.username,
            password: req.body.password,
            token: randomUUID(),
        });

        await user.save();
        return res.send(user);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        return next(e);
    }
});

UserAuth.post('/sessions' , async (req, res, next) => {
    try {

        const user = await User.findOne({username: req.body.username})

        if(!user){
            return res.status(400).send({error:'Имя пользователя или пароль не корректны.'})
        }

        const comparePswrd = await bcrypt.compare(req.body.password , user.password)

        if(!comparePswrd){
            return res.status(400).send({error:'Имя пользователя или пароль не корректны.'})
        }

        user.token = randomUUID();

        await user.save()
        res.send(user)
    }catch (e) {
        next(e)
    }
})

UserAuth.delete('/sessions', async (req, res, next) => {
    try {
        const getToken = req.get('Authorization');
        const success = {message: 'Success'};

        if (!getToken) return res.send(success);

        const [_Bearer , token] = getToken.split(' ');

        const user = await User.findOne({token});

        if (!user) return res.send(success);

        user.token = randomUUID();
        user.save();

        return res.send(success);
    } catch (e) {
        return next(e);
    }
});
export default UserAuth;