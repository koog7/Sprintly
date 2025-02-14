import {Divider} from "@mui/material";
import Container from "@mui/material/Container";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/store.ts";
import {getProject, joinProject} from "../homeThunk.ts";
import {Button} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {selectError, selectProjects} from "../homeSlice.ts";
import DashboardCard from "./DashboardCard.tsx";
import NoDataMsg from "./noDataMsg.tsx";
import JoinProjectModal from "./JoinProjectModal.tsx";
import {notifications} from "@mantine/notifications";

const HomeUser = () => {
    const dispatch = useAppDispatch();
    const [opened, {open, close}] = useDisclosure(false);

    useEffect(() => {
        dispatch(getProject());
    }, [dispatch]);

    const project = useAppSelector(selectProjects);
    const error = useAppSelector(selectError);
    console.log(error)

    const JoinByCode = async (codes: string) => {
        const status = await dispatch(joinProject(codes));

        if (joinProject.fulfilled.match(status)) {
            close();
            return notifications.show({
                title: 'Присоединение по коду',
                message: 'Вы успешно присоеденились к новому проекту!',
                color: 'lime',
                position: 'top-right',
            });
        } else {
            return notifications.show({
                title: 'Ошибка',
                message: 'Не удалось присоедениться , код не активен.',
                color: 'pink',
                position: 'top-right',
            });
        }
    };


    return (
        <div className="home-user">
            <Container maxWidth="lg">

                <JoinProjectModal opened={opened} onClose={close} getCode={JoinByCode}/>

                <div className={'home-user__title'}>
                    <div>
                        <h2>Ваша работа</h2>
                    </div>
                    <div className={'home-user__title_btn'}>
                        <Button variant="filled">Создать</Button>
                        <Button variant="filled" color="lime" onClick={open}>Вступить</Button>
                    </div>
                </div>
                <Divider sx={{width: '100%'}}/>
                <div className={'home-user__cards'}>
                    <p>Недавние проекты</p>
                    <div className={'home-user__cards-content'}>
                        {project && project.activeGroups && project.activeGroups.length > 0 ? (
                            project.activeGroups.map((group) => (
                                <DashboardCard
                                    key={group._id}
                                    name={group.name}
                                    description={group.description}
                                    inviteCode={group.inviteCode}
                                    availablePlace={group.availablePlace}
                                />
                            ))
                        ) : (
                            <NoDataMsg/>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default HomeUser;