import {Link} from "react-router-dom";
import {useState} from "react";
import {Drawer, IconButton, List, ListItemButton, ListItemText} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
    const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    };

    return (
        <div className={'header'}>
            <div className={'container'}>
                <div className={'header__logo'}>
                    <Link to={'/'} className={'header__logo-title'}>Sprintly</Link>
                </div>
                <div className={'header__nav'}>
                    <p className={'header__nav-item'}>Последние новости</p>
                    <p className={'header__nav-item'}>О нас</p>
                    <p className={'header__nav-item'}>FAQ</p>
                </div>
                <div className={'header__login'}>
                    <button className={'header__login-login'}>Авторизоваться</button>
                    <button className={'header__login-signup'}>Регистрация</button>
                </div>

                <IconButton
                    edge="start"
                    className={'header__burger'}
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer}
                    sx={{display: {xs: 'block', md: 'none'}}}
                >
                    <MenuIcon sx={{ color: 'white' }} fontSize="large"/>
                </IconButton>

                <Drawer
                    anchor="right"
                    open={openDrawer}
                    onClose={toggleDrawer}
                >
                    <List sx={{width: '200px'}}>
                        <h3 style={{padding:'10px'}}>Меню навигации</h3>
                        <div>
                            <ListItemButton component={Link} to="/about">
                                <ListItemText primary="Последние новости" />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/about">
                                <ListItemText primary="О нас" />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/about">
                                <ListItemText primary="FAQ" />
                            </ListItemButton>
                        </div>
                        <div>
                            <ListItemButton className={'header__login-login'} component={Link} to="/about">
                                <ListItemText primary="Авторизоваться" />
                            </ListItemButton>
                            <ListItemButton className={'header__login-signin'} component={Link} to="/about">
                                <ListItemText primary="Регистрация" />
                            </ListItemButton>
                        </div>
                    </List>
                </Drawer>
            </div>
        </div>
    );
};

export default Header;