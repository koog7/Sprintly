import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import {randomUUID} from "node:crypto";
import Project from "../models/ProjectModel";
import User from "../models/UserModel";

const ProjectRouter = express.Router();
ProjectRouter.use(express.json());

ProjectRouter.post('/create', auth , async (req: RequestWithUser, res, next) => {
    try{
        const newProject = new Project({
            name: req.body.name,
            description: req.body.description? req.body.description : 'No description',
            activeUser: [req.user?._id],
            availablePlace: 7,
        });

        await newProject.save()

        const findActiveGroup = await User.find({activeGroups: newProject?._id})

        if(findActiveGroup.length === 0 ) {
            await User.updateOne(
                { _id: req.user?._id },
                { $push: { activeGroups: newProject._id } }
            );
        }

        res.status(200).send(newProject);
    }catch(err){
        next(err)
    }
})

export default ProjectRouter;