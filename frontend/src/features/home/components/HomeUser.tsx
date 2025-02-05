import {Divider} from "@mui/material";
import Container from "@mui/material/Container";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/store.ts";
import {getProject} from "../homeThunk.ts";
import {Button, CloseButton, Input, Modal} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {selectProjects} from "../homeSlice.ts";
import DashboardCard from "./DashboardCard.tsx";
import NoDataMsg from "./noDataMsg.tsx";

const HomeUser = () => {
    const dispatch = useAppDispatch();
    const [opened, {open, close}] = useDisclosure(false);
    const [value, setValue] = useState('');
    useEffect(() => {
        dispatch(getProject())
    }, [dispatch]);

    const project = useAppSelector(selectProjects);
    useEffect(() => {
        console.log(project)
    }, [project]);
    // @ts-ignore
    return (
        <div className="home-user">
            <Container maxWidth="lg">
                <Modal opened={opened} onClose={close} title="Вступление по коду">
                    <Input
                        placeholder="Код приглашения"
                        value={value}
                        onChange={(event) => setValue(event.currentTarget.value)}
                        rightSectionPointerEvents="all"
                        mt="md"
                        rightSection={
                            <CloseButton
                                aria-label="Clear input"
                                onClick={() => setValue('')}
                                style={{display: value ? undefined : 'none'}}
                            />
                        }
                    />
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                        <Button variant="filled" color="lime" onClick={open}>Вступить</Button>
                    </div>
                </Modal>
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
                        {project && project.activeGroups && project.activeGroups.length > 0 ?(
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
                                <NoDataMsg />
                            )}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default HomeUser;