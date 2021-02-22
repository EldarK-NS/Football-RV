const dataLoaded = (newData) => {
    return {
        type: 'FETCH_DATA_SUCCESS',
        payload: newData
    }
}
const dataRequested = () => {
    return {
        type: 'FETCH_DATA_REQUEST'
    }
}

const dataError = (error) => {
    return {
        type: 'FETCH_DATA_FAILURE',
        payload: error
    }
}

export const dataItemAddedToChart = (dataItemId) => {
    return {
        type: 'DATA_ITEM_ADDED_TO_CHART',
        payload: dataItemId
    }
}

const fetchData = (dataService, dispatch) => () => {
    dispatch(dataRequested())
    dataService.getData()
        .then((data) => dispatch(dataLoaded(data)))
        .catch((err) => dispatch(dataError(err)))
}

export {
    fetchData
}