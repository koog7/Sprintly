import Container from "@mui/material/Container";

const HomeGuest = () => {
    return (
        <div className={'home-guest'}>
            <Container maxWidth="lg" className={'home-guest-container'}>
                <div className={'home-guest__title'}>
                    <h1><span className={'home-guest__title-green'}>Sprintly</span> — Легко. Удобно. Эффективно.</h1>
                    <p>Управляйте своими проектами с максимальным удобством и эффективностью вместе с Sprintly.</p>
                </div>
                <div className={'home-guest__image'}>
                   <img className={'home-guest__image-ticket'} src={'/ticket.jpg'} alt={'tickets'}/>
                </div>
            </Container>
        </div>
    );
};

export default HomeGuest;