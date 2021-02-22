import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SelectMenuContainer from '../pages/select-menu'
import './header.css'
import {Link} from 'react-router-dom'


function Header() {
    return (
        <div >
            <AppBar position="static" className="header">
                <Toolbar>
                    <Typography variant="h6" className="logo">
                        Football RV
                    </Typography>
                    <div className="menu"><SelectMenuContainer /></div>
                    <Button color="inherit" className="btn" component={Link} to='/'>Home</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header


