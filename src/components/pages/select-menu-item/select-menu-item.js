import React from 'react'
import MenuItem from '@material-ui/core/MenuItem';

const SelectMenuItem = ({ item, onAddedToChart }) => {
    const { title, id } = item
    return (
        <div>
            <MenuItem value={id} onClick={onAddedToChart} >{title}</MenuItem>
        </div>


    )
}

export default SelectMenuItem
