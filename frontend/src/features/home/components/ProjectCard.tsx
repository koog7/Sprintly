import Box from "@mui/material/Box";
import {Button, CardActions, CardContent, Typography} from "@mui/material";

const ProjectCard = () => {
    return (
        <div>
            <Box sx={{border: '1px solid #77B254', width: '300px',borderRadius: '15px','@media (max-width: 650px)': {width: '100%'}}}>
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        Ресурсность
                    </Typography>
                    <Typography variant="h5" component="div">
                        WingsFit
                    </Typography>
                    <Typography variant="body2">
                        "Ее ресурсность в сложных ситуациях восхищала всех вокруг.".
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Перейти в дашборд</Button>
                </CardActions>
            </Box>
        </div>
    );
};

export default ProjectCard;