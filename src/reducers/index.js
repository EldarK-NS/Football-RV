
import allData2019 from './../data/bd18-19';
import dataColor from './../data/dataColor';
import dataReplace from './../data/dataTransform';

let data2019 = dataReplace(allData2019, dataColor)
console.log(data2019)


const initialState = {
    data: [],
    loading: true,
    error: null,
    chart: {
        data:[]
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_DATA_REQUEST':
            return {
                ...state,
                data: [],
                loading: true,
                error: null
            }
        case 'FETCH_DATA_SUCCESS':
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null
            };
        case 'FETCH_DATA_FAILURE':
            return {
                ...state,
                data: [],
                loading: false,
                error: action.payload
            }

        case 'DATA_ITEM_ADDED_TO_CHART':
            const dataItemId = action.payload;
            const dataItem = state.data.find((dataItem) => dataItem.id === dataItemId)
            const newItem = dataItem
            return {
                ...state,
                chart: newItem
            }
        default:
            return state;
    }
}
export default reducer