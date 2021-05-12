import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ShoppingCart from "./ShoppingCart";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
    },
    cartButton: {
    },
    title: {
        flexGrow: 1,
        textAlign: 'center',
    },
}));

const REDIRECT = {
    HOME: '/',
    ABOUT: '/about',
    SHROOMS: '/shrooms',
    ACID: '/acid',
    CONTACT: '/contact'
};

export default function NavBar() {
    const classes = useStyles();
    const history = useHistory();
    const [menuState, setMenuState] = React.useState(null);

    const handleMenuClick = (event) => {
        setMenuState(event.currentTarget);
    };
    const handleMenuClose = (redirect) => {
        setMenuState(null);
        if (redirect) history.push(redirect)
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color={'transparent'}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenuClick}>
                        <MenuIcon />
                    </IconButton>
                    <Menu id="simple-menu" anchorEl={menuState} keepMounted open={Boolean(menuState)} onClose={handleMenuClose}>
                        <MenuItem onClick={() => handleMenuClose(REDIRECT.HOME)} href={"/"}>Home</MenuItem>
                        <MenuItem onClick={() => handleMenuClose(REDIRECT.SHROOMS)}>Shrooms</MenuItem>
                        <MenuItem onClick={() => handleMenuClose(REDIRECT.ACID)}>Acid</MenuItem>
                        <MenuItem onClick={() => handleMenuClose(REDIRECT.ABOUT)} href={"/about"}>How It Works</MenuItem>
                        <MenuItem onClick={() => handleMenuClose(REDIRECT.CONTACT)}>Contact</MenuItem>
                    </Menu>
                    <Typography variant="h6" className={classes.title}>
                        Nirvana
                    </Typography>
                    <ShoppingCart/>
                </Toolbar>
            </AppBar>
        </div>
    );
}