import {Divider} from "@mui/material";
import ProjectCard from "./ProjectCard.tsx";
import Container from "@mui/material/Container";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/store.ts";
import {getProject} from "../homeThunk.ts";
import {selectProjects} from "../homeSlice.ts";
import { Input,Modal,Button,CloseButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconAt } from '@tabler/icons-react';

const HomeUser = () => {
    const dispatch = useAppDispatch();
    const [opened, { open, close }] = useDisclosure(false);
    const [value, setValue] = useState('');
    useEffect(() => {
        dispatch(getProject())
    }, [dispatch]);

    //const project = useAppSelector(selectProjects);

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
                        <ProjectCard/>
                        <ProjectCard/>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default HomeUser;