import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import Spinner from '../../spinner';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const Standings = ({ dataItem }) => {
    const classes = useStyles();
    if (!dataItem) {
        return (
            <Spinner />
        )
    }

    return (
        <div >
            <h2>{dataItem.title}</h2>
            <TableContainer component={Paper} >
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">POS.</TableCell>
                            <TableCell align="center">NAME</TableCell>
                            <TableCell align="center">GAMES</TableCell>
                            <TableCell align="center">WINS</TableCell>
                            <TableCell align="center">DRAW</TableCell>
                            <TableCell align="center">LOSE</TableCell>
                            <TableCell align="center">GOALS</TableCell>
                            <TableCell align="center">Points</TableCell>
                            <TableCell align="center">% Points</TableCell>
                            <TableCell align="center">FORM</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataItem.dataTable.map((row) => (
                            <StyledTableRow key={row.pos}>
                                <TableCell align="center">{row.pos}</TableCell>
                                <TableCell component="th" scope="row" align="center" style={{ color: "black", fontWeight: "bold", size: '16px' }}>
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.games}</TableCell>
                                <TableCell align="center">{row.wins}</TableCell>
                                <TableCell align="center">{row.draw}</TableCell>
                                <TableCell align="center">{row.lose}</TableCell>
                                <TableCell align="center">{row.goals}</TableCell>
                                <TableCell align="center">{row.points}</TableCell>
                                <TableCell align="center">{row.percent}</TableCell>
                                <TableCell align="center"> <div style={rowPoints}>{row.form.map((el) => {
                                    return <span style={{
                                        width: '15px', height: '15px', borderRadius: '50%', background: `${el}`
                                    }}></span>
                                })}</div></TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    );
}

const mapStateToProps = ({ chart }) => {
    return { dataItem: chart }

}

export default connect(mapStateToProps)(Standings)

const rowPoints = {
    display: 'flex',
    justifyContent: 'space-between'
}