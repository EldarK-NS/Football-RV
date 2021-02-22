import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const StandigsButton = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Button variant="outlined" color="primary"
                component={Link} to="/standings">
                Standings
        </Button>
        </div>
    )
}

export default StandigsButton