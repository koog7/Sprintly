import React from "react";
import Box from "@mui/material/Box";
import {CardActions, CardContent, Typography} from "@mui/material";
import {Button, CopyButton} from '@mantine/core';
import {IconLink} from '@tabler/icons-react';
import {notifications} from "@mantine/notifications";

interface IDashboardCard {
    name?: string;
    description?: string;
    availablePlace?: number;
    inviteCode?: string;
}

const DashboardCard: React.FC<IDashboardCard> = ({name , description , availablePlace , inviteCode}) => {
    return (
        <div>
            <Box sx={{
                border: '1px solid #77B254',
                width: '300px',
                borderRadius: '15px',
                '@media (max-width: 650px)': {
                    maxWidth: '400px',
                },
            }}>
                <CardContent>
                    <Typography gutterBottom sx={{color: 'text.secondary', fontSize: 14}}>
                        Осталось мест : {availablePlace}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2">
                        "{description}"
                        <br/>
                    </Typography>
                </CardContent>
                <CardActions style={{display:'flex' , justifyContent:'space-between'}}>
                    <Button variant="outline" color="green" >Дашборд</Button>
                    <CopyButton value={inviteCode as string}>
                        {({ copied, copy }) => (
                            <Button
                                color={copied ? 'blue' : 'teal'}
                                onClick={() => {
                                    copy();
                                    notifications.show({
                                        position:'top-right',
                                        title: 'Скопировано!' ,
                                        message:'Код был скопирован в буфер обмена.' ,
                                        color: 'lime',
                                    });
                                }}
                            >
                                <IconLink />
                            </Button>
                        )}
                    </CopyButton>
                </CardActions>
            </Box>
        </div>
    );
};

export default DashboardCard;
