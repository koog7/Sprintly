import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {Divider, Drawer, IconButton, List, ListItemButton, ListItemText} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useAppDispatch, useAppSelector} from "../../app/store.ts";
import {clearData, selectUser} from "../../features/auth/userSlice.ts";
import NoAvatar from '../../assets/noavatar.jpg'
import { IconNews, IconInfoCircle, IconHelpCircle, IconLogout } from "@tabler/icons-react";
import {logoutUser} from "../../features/auth/userThunk.ts";

const Header = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    };

    const logOut = async () => {
        localStorage.removeItem('persist:sprintly:user');
        await dispatch(logoutUser())
        dispatch(clearData())
        setOpenDrawer(false)
        navigate('/')
    }

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
                    <>
                        <IconButton
                            edge="start"
                            className={'header__burger'}
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer}
                        >
                            <MenuIcon sx={{color: 'white'}} fontSize="large"/>
                        </IconButton>

                        <Drawer
                            anchor="right"
                            open={openDrawer}
                            onClose={toggleDrawer}
                        >
                            <List sx={{width: '250px'}}>
                                <div>
                                    {user && (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
                                            <img
                                                src={NoAvatar}
                                                alt="avatar"
                                                style={{
                                                    width: '100px',
                                                    height: '100px',
                                                    borderRadius: '50%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                            <p className="header__burger-hello" style={{ marginTop: '10px', textAlign: 'center' }}>
                                                {user.username}
                                            </p>
                                        </div>
                                    )}
                                    <Divider sx={{ width: "90%", margin: "0 auto" }} />
                                    <ListItemButton component={Link} to="/about">
                                        <IconNews size={20} style={{ marginRight: 10 }} />
                                        <ListItemText primary="Последние новости" />
                                    </ListItemButton>
                                    <ListItemButton component={Link} to="/about">
                                        <IconInfoCircle size={20} style={{ marginRight: 10 }} />
                                        <ListItemText primary="О нас" />
                                    </ListItemButton>
                                    <ListItemButton component={Link} to="/about">
                                        <IconHelpCircle size={20} style={{ marginRight: 10 }} />
                                        <ListItemText primary="FAQ" />
                                    </ListItemButton>
                                    <Divider sx={{ width: "90%", margin: "0 auto" }} />
                                    <ListItemButton onClick={logOut}>
                                        <IconLogout size={20} style={{ marginRight: 10 }} />
                                        <ListItemText primary="Выйти с аккаунта" />
                                    </ListItemButton>
                                </div>
                            </List>
                        </Drawer>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;