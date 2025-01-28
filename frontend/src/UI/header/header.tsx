import {Link} from "react-router-dom";
import {useState} from "react";
import {Drawer, IconButton, List, ListItemButton, ListItemText} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useAppSelector} from "../../app/store.ts";
import {selectUser} from "../../features/auth/userSlice.ts";

const Header = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const user = useAppSelector(selectUser);
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
                {!user ? (
                    <div className={'header__login'}>
                        <Link to="/login" className={'header__login-login'}>
                            Авторизоваться
                        </Link>
                        <Link to="/signup" className={'header__login-signup'}>
                            Регистрация
                        </Link>
                    </div>
                ) : (
                    <div className={'header__hello'}>
                        Добрый день! {user.username}
                    </div>
                )}

                <IconButton
                    edge="start"
                    className={'header__burger'}
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer}
                    sx={{display: {xs: 'block', sm: 'none'}}}
                >
                <MenuIcon sx={{ color: 'white' }} fontSize="large"/>
                </IconButton>

                <Drawer
                    anchor="left"
                    open={openDrawer}
                    onClose={toggleDrawer}
                >
                    <List sx={{width: '200px'}}>
                        <div>
                            {user && (
                                <p style={{padding:'5px 0 0 15px'}} className={'header__burger-hello'}>
                                    <span style={{fontWeight:'bold'}}>Добрый день!</span> {user.username}
                                </p>
                            )}
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
                            {!user? <div>
                                <ListItemButton className={'header__login-login'} component={Link} to="/about">
                                    <ListItemText primary="Авторизоваться" />
                                </ListItemButton>
                                <ListItemButton className={'header__login-signin'} component={Link} to="/about">
                                    <ListItemText primary="Регистрация" />
                                </ListItemButton>
                            </div> : <></>}

                        </div>
                    </List>
                </Drawer>
            </div>
        </div>
    );
};

export default Header;