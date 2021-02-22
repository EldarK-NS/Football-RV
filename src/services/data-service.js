
import allData2019 from './../data/bd18-19';
import allData2020 from './../data/bd19-20';
import dataColor from './../data/dataColor';
import dataReplace from './../data/dataTransform';
import allData2021 from './../data/bd20-21';

let data2019 = dataReplace(allData2019, dataColor)
let data2020 = dataReplace(allData2020, dataColor)
let data2021 = dataReplace(allData2021, dataColor)

export default class DataService {

    data = [data2019, data2020, data2021]
    getData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.data)
                reject(new Error('Somthing wrong'))
            }, 500)
        })
    }
}