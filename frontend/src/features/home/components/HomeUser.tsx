import {Divider} from "@mui/material";
import ProjectCard from "./ProjectCard.tsx";
import Container from "@mui/material/Container";

const HomeUser = () => {
    return (
        <div className="home-user">
            <Container maxWidth="lg">
                <div className={'home-user__title'}>
                    <h2>Ваша работа</h2>
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