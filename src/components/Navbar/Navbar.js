import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';


function Navbar() {

    const navigate = useNavigate();

    const onClick = () => {
        localStorage.removeItem("tokenKey");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("refreshKey");
        localStorage.removeItem("userName");
        navigate("/authentication");
        window.location.reload();
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/">Home</Link>
                    </Typography>
                    {localStorage.getItem("currentUser") == null ? <Link to="/authentication">Login/Register</Link> :
                        <div>
                            <span onClick={onClick} style={{ cursor: 'pointer' }}>Çıkış Yap</span>
                            <LogoutIcon onClick={onClick} style={{ cursor: 'pointer', marginRight: '50px', marginLeft:'10px' }}></LogoutIcon>
                            <Link to={{ pathname: '/users/' + localStorage.getItem("currentUser") }}>Profile</Link>
                        </div>}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar;