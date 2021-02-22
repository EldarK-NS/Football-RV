import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import SelectMenuItem from './../select-menu-item';
import { connect } from 'react-redux'
import { withDataService } from '../../hoc'
import { fetchData, dataItemAddedToChart } from '../../../actions'
import { compose } from '../../../utils'
import Spinner from '../../spinner'
import ErrorIndicator from './../../error-indicator/index';
import { makeStyles } from '@material-ui/core/styles';
import './select-menu.css'


const SelectMenu = ({ data, onAddedToChart }) => {
    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 150,
        },
        label: {
            color: 'red', 
            size: '14px',
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));
    const classes = useStyles();
    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel className={classes.label}>Select season</InputLabel>
                <Select>
                    {
                        data.map((item) => {
                            return (
                                <span key={item.id}>  <SelectMenuItem item={item} onAddedToChart={() => onAddedToChart(item.id)} /></span>
                            )
                        })
                    }
                </Select>
                <FormHelperText>Select season</FormHelperText>
            </FormControl >
        </div>
    )
}


class SelectMenuContainer extends Component {

    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        const { data, loading, error, onAddedToChart } = this.props
        if (loading) {
            return <Spinner />
        }
        if (error) {
            return <ErrorIndicator />
        }
        return <SelectMenu data={data} onAddedToChart={onAddedToChart} />
    }
}

const mapStateToProps = ({ data, loading, error }) => {
    return { data, loading, error }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    const { dataService } = ownProps
    return {
        fetchData: fetchData(dataService, dispatch),
        onAddedToChart: (id) => dispatch(dataItemAddedToChart(id))
    }
}

export default compose(
    withDataService(),
    connect(mapStateToProps,
        mapDispatchToProps))(SelectMenuContainer);


