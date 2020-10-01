import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory, useLocation } from 'react-router-dom';

export default function Container(){
    const history = useHistory();
    const location = useLocation();

    const currentPathName = () => {
        if(location.pathname === "/login") return "Login";
        if(location.pathname === "/user/create") return "Dashboard - Add User";
        if(location.pathname === "/admin/home") return "Admin Panel - Home";
    }

    const renderLogoutButton = () => {
        if(location.pathname === "/admin/home") {
            return (
                <>
                    <Button onClick={() => { history.push("/user/create"); }} color="inherit">
                        Add User
                    </Button>
                    <Button onClick={() => { localStorage.clear(); history.push("/login"); }} color="inherit">
                        Logout
                    </Button>
                </>
            )
        }

        if(location.pathname === "/user/create") {
            return (
                <>
                    <Button onClick={() => { history.push("/admin/home"); }} color="inherit">
                        Show Users
                    </Button>
                    <Button onClick={() => { history.push("/login"); }} color="inherit">
                        Login
                    </Button>
                </>
            )
        }

        if(location.pathname === "/login"){
            return (
                <>
                    <Button onClick={() => { history.push("/user/create"); }} color="inherit">
                        Add User
                    </Button>
                </>
            )
        }
    }

    return( 
        <AppBar>
            <Toolbar>
                <Typography variant="h6" onClick={() => history.push("/home")}>
                    {currentPathName()}
                </Typography>
                <span style={{flex: 1}}></span>
                {renderLogoutButton()}
            </Toolbar>
        </AppBar>
    )
}