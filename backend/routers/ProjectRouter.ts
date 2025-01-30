import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import {randomUUID} from "node:crypto";
import Project from "../models/ProjectModel";
import User from "../models/UserModel";

const ProjectRouter = express.Router();
ProjectRouter.use(express.json());

ProjectRouter.post('/create', auth, async (req: RequestWithUser, res, next) => {
    try {
        const newProject = new Project({
            name: req.body.name,
            description: req.body.description ? req.body.description : 'No description',
            activeUser: [req.user?._id],
            availablePlace: 7,
        });

        await newProject.save()

        const findActiveGroup = await User.find({activeGroups: newProject?._id})

        if (findActiveGroup.length === 0) {
            await User.updateOne(
                {_id: req.user?._id},
                {$push: {activeGroups: newProject._id}}
            );
        }

        res.status(200).send(newProject);
    } catch (err) {
        next(err)
    }
})

ProjectRouter.post('/accept-invite/:id', auth, async (req: RequestWithUser, res, next) => {
    try {
        const findGroup = await Project.findOne({inviteCode: req.params.id});

        if (!findGroup) {
            return res.status(400).send({error: 'Код приглашение не корректный.'})
        }

        const checkAttendance = await User.find({activeGroups: req.user?._id})
        console.log(checkAttendance)
        if (checkAttendance.length !== 0) {
            return res.status(400).send({error: 'Вы уже в этой группе.'});
        }

        await User.updateOne(
            {_id: req.user?._id},
            {$push: {activeGroups: findGroup?._id}}
        );

        await Project.updateOne(
            {_id: findGroup?._id},
            {$push: {activeUser: req.user?._id}}
        );

        res.status(200).send('succsess')


        //return res.status(301).redirect(`http://localhost:8000/project/${findGroup?._id}`)
    } catch (err) {
        next(err)
    }
})

export default ProjectRouter;