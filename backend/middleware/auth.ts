import { Request, Response, NextFunction} from "express";
import User from "../models/UserModel";

export interface IUser {
    _id?: string,
    username: string;
    password: string;
    token?: string;
}

export interface RequestWithUser extends Request {
    user?: IUser;
}

const auth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const getToken = req.get('Authorization');

    if (!getToken) {
        return res.status(400).send({error: 'Неавторизован.'})
    }

    const [_Bearer, token] = getToken.split(' ')

    try {
        const user = await User.findOne({token: token}).lean<IUser>();

        if (!user) {
            return res.status(400).send({error: 'Пользователь не найден.'});
        }

        (req as RequestWithUser).user = user;
        next();
    } catch (e) {
        return res.status(400).send({error: 'Проблема с авторизацией , попробуйте позже.'});
    }
}

export default auth;
