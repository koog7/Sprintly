import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import Project from "../models/ProjectModel";
import User from "../models/UserModel";

const ProjectRouter = express.Router();
ProjectRouter.use(express.json());

ProjectRouter.get('/myProjects', auth , async (req: RequestWithUser, res) => {
    const user = await User.findOne({_id: req.user?._id}).populate('activeGroups' , 'name description inviteCode availablePlace')

    if (!user) return res.status(404).json({ message: "Пользователь не найден" });

    const { token , password, ...userWithoutToken } = user?.toObject();
    res.status(200).send(userWithoutToken)
})

ProjectRouter.post('/create', auth, async (req: RequestWithUser, res, next) => {
    try {
        const newProject = new Project({
            owner: req.user?._id,
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

        if(findGroup.availablePlace < 0){
            return res.status(400).send({error: 'В группе уже максимальное количество участников.'});
        }

        const checkAttendance = await User.find({activeGroups: findGroup?._id})
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
            {
                $push: {activeUser: req.user?._id},
                $inc: {availablePlace: -1}
            }
        );

        res.status(200).send('success')


        //return res.status(301).redirect(`http://localhost:8000/project/${findGroup?._id}`)
    } catch (err) {
        next(err)
    }
})

export default ProjectRouter;