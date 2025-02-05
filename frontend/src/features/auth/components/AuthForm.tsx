import {useLocation, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {authUser, loginUser} from "../userThunk.ts";
import {useAppDispatch} from "../../../app/store.ts";
import {Input, PasswordInput} from "@mantine/core";

interface UserData {
    username: string;
    password: string;
}

const AuthForm = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [userData , setUserData] = useState<UserData>({
        username: "",
        password: "",
    })

    const fillData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prev) => ({...prev , [name]:value}));
    }

    const submitData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(location.pathname === '/login'){
            dispatch(loginUser(userData))
        }
        dispatch(authUser(userData))
        navigate('/')
    }

    return (

        <div className="auth">
            <h1>{location.pathname === '/login' ? 'Войти в систему' : 'Регистрация'}</h1>
            <form className="auth__form" onSubmit={submitData}>
                <Input
                    name="username"
                    placeholder="Никнейм"
                    value={userData.username}
                    onChange={fillData}
                    required
                />
               <PasswordInput
                    name="password"
                    placeholder="Пароль"
                    value={userData.password}
                    onChange={fillData}
                    required
                />
                <button className={'auth__form-btn'} type={'submit'}>{location.pathname === '/login' ? 'Авторизоваться' : 'Зарегистрироваться'}</button>
            </form>
        </div>
    );
};

export default AuthForm;