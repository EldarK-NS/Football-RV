
function dataReplace(mainData, colorData) {
    // набор уникальных имен   
    const unicName = teamName(mainData)

    // изменяем данные для обработки
    let transformData = dataTransform(mainData)

    // создаем основной массив данных
    const expData = createItems(transformData, unicName, colorData)

    // расчет позиций команд
    const dataWithPosition = createPositions(expData)

    const lastPosition = lastPositionFunc(dataWithPosition)
    // данные для обработки на сайте
    const dataDisplay = createDataDisplay(mainData, lastPosition)

    const generalData = dataForTable(dataDisplay)

    return generalData

}

function dataTransform(mainData) {
    let newData = mainData.map(el => {
        if (el.home < el.away) {
            el.win = el.AwayTeam
            el.lose = el.HomeTeam
            el.draw = false
        }
        else if (el.home > el.away) {
            el.win = el.HomeTeam
            el.lose = el.AwayTeam
            el.draw = false
        }
        else {
            el.win = undefined
            el.lose = undefined
            el.draw = true
        }
        el.info = [`${el.HomeTeam}(${el.home})-${el.AwayTeam}(${el.away})`]
        return el
    })
    return newData
}

function teamName(mainData) {
    const commandSet = new Set()
    mainData.map((el) => {
        commandSet.add(el.HomeTeam)
        return commandSet
    })
    const unicName = Array.from(commandSet).sort()
    return unicName
}

function createItems(transformData, unicName, colorData) {
    // создаем массив данных для графика
    let expData = []; // общий массив   
    let name = '';
    let scoredGoals = []; // массив всех игр по голам 
    let concededGoals = []; // массив пропущенных голов
    let concededGoalsSum = ''; // сумма пропущенных голов
    let points = []; //! массив по баллам за игры
    let scoredGoalsStore = []; // массив накопитель  по забитым голам
    let pointsStore = []; // массив накопитель по баллам 
    let scoredGoalsSum;  // число, итоговая сумма забитых голов
    let pointsRes; //число, итоговая сумма баллов
    let gameInfo = [];   // команды-игроки каждого матча со счетом
    let goalsDiffer = [] // массив, разница забитых голов к пропущенным
    let goalsDifferStore = []// массив накопитель разниц забитых голов к пропущенным
    let teamColor = ''
    let maxId = 1
    let pointColor = []
    let goalsDifferStoreSum = '' // сумма разниц пропущенных и забитых голов


    for (let i = 0; i < unicName.length; i++) {
        // присвоение баллов за матч 
        //! points = []
        transformData.filter(key => {
            if (key.win === unicName[i] && key.draw === false) {
                points.push(3)
            }
            else if (key.lose === unicName[i] && key.draw === false) {
                points.push(0)
            }
            else if ((key.HomeTeam === unicName[i] || key.AwayTeam === unicName[i]) && key.draw === true) { points.push(1) }
            return key
        })

        // массив всех игр по голам 
        //!scoredGoals:[]
        transformData.filter((key) => {
            if (unicName[i] === key.HomeTeam) {
                scoredGoals.push(key.home)
            }
            else if (unicName[i] === key.AwayTeam) {
                scoredGoals.push(key.away)
            }
            return key
        })

        //!concededGoals
        transformData.filter((key) => {
            if (unicName[i] === key.HomeTeam) {
                concededGoals.push(key.away)
            }
            else if (unicName[i] === key.AwayTeam) {
                concededGoals.push(key.home)
            }
            return key
        })

        // массив накопитель по забитым голам
        //! scoredGoalsStore:[]
        scoredGoals.reduce((previous, current) => {
            let sum = previous + current;
            scoredGoalsStore.push(sum)
            return sum
        }, 0);

        //число, итоговая сумма забитых голов
        //!scoredGoalsSum
        scoredGoals.reduce((accum, item) => {
            accum = accum + item
            scoredGoalsSum = accum
            return accum
        }, 0);

        //число, итоговая сумма пропущенных голов
        //!concededGoalsSum
        concededGoals.reduce((accum, item) => {
            accum = accum + item
            concededGoalsSum = accum
            return accum
        }, 0);

        // массив накопитель по баллам 
        //! pointsStore:[]
        points.reduce((previous, current) => {
            let sum = previous + current;
            pointsStore.push(sum)
            return sum
        }, 0);

        //число, итоговая сумма баллов
        //!pointsRes
        points.reduce((accum, item) => {
            accum = accum + item
            pointsRes = accum
            return accum
        }, 0);

        // команды-игроки каждого матча со счетом
        //!gameInfo
        transformData.filter((key) => {
            if (key.HomeTeam === unicName[i] || key.AwayTeam === unicName[i]) {
                gameInfo.push(key.info)
            }
        })

        // массив, разница забитых голов к пропущенным
        //!goalsDiffer=[] 
        transformData.filter((key) => {
            if (unicName[i] === key.HomeTeam) {
                goalsDiffer.push(key.home - key.away)
            }
            else if (unicName[i] === key.AwayTeam) {
                goalsDiffer.push(key.away - key.home)
            }
        })
        // массив накопитель по  
        //! goalsDifferStore:[]
        goalsDiffer.reduce((previous, current) => {
            let sum = previous + current;
            goalsDifferStore.push(sum)
            return sum
        }, 0);

        //!goalsDifferStoreSum
        goalsDiffer.reduce((accum, item) => {
            accum = accum + item
            goalsDifferStoreSum = accum
            return accum
        }, 0);


        // присвоение цвета каждому элементу
        for (let key in colorData) {
            if (key === unicName[i]) {
                teamColor = colorData[key]
                pointColor.push('rgb' + colorData[key])
            }
        }
        points.forEach(el => {
            if (el === 0) {
                pointColor.push('rgb(255,0,0)')
            }
            else if (el === 1) {
                pointColor.push('rgb(141,145,122)')
            }
            else {
                pointColor.push('rgb(52,201,36)')
            }
        })

        expData.push({
            name: unicName[i],
            points: points,
            pointsStore: pointsStore,
            pointsRes: pointsRes,
            id: maxId++,
            scoredGoals: scoredGoals,
            scoredGoalsStore: scoredGoalsStore,
            scoredGoalsSum: scoredGoalsSum,
            gameInfo: gameInfo,
            goalsDiffer: goalsDiffer,
            teamColor: teamColor,
            goalsDifferStore: goalsDifferStore,
            concededGoals: concededGoals,
            concededGoalsSum: concededGoalsSum,
            position: [],
            pointColor: pointColor,
            goalsDifferStoreSum: goalsDifferStoreSum
        })

        points = [];
        pointsStore = [];
        teamColor = '';
        pointsRes = '';
        scoredGoals = [];
        scoredGoalsStore = [];
        scoredGoalsSum = '';
        gameInfo = [];
        goalsDiffer = [];
        goalsDifferStore = [];
        concededGoals = [];
        concededGoalsSum = '';
        pointColor = [];
        goalsDifferStoreSum = ''
    }
    return expData
}

function createPositions(expData) {
    expData.forEach(el => {
        el.position.push(expData.indexOf(el) + 1)
        return el
    })
    let pointNum = ''
    for (let k of expData) {
        pointNum = k.pointsStore.length
    }
    for (let i = 0; i < pointNum; i++) {
        let l = expData.map((el) => {
            el.pointsStore.shift()
            el.goalsDifferStore.shift()
            return el
        })
        l.sort((a, b) => {
            if (a.pointsStore[0] < b.pointsStore[0] && a.goalsDifferStore[0] < b.goalsDifferStore[0]) {
                return 1
            }
            else if (a.pointsStore[0] > b.pointsStore[0] && a.goalsDifferStore[0] > b.goalsDifferStore[0]) {
                return -1
            }
            return 0
        })
        l.forEach(el => {
            el.position.push(l.indexOf(el) + 1)
        })
    }
    expData.forEach(el => {
        el.position.pop()
    })

    return expData
}

function lastPositionFunc(dataWithPosition) {
    let newData = dataWithPosition.sort((a, b) => {
        if (a.pointsRes < b.pointsRes && a.goalsDifferStoreSum < b.goalsDifferStoreSum) {
            return 1
        }
        else if (a.pointsRes > b.pointsRes && a.goalsDifferStoreSum > b.goalsDifferStoreSum) {
            return -1
        }
        return 0
    })
    dataWithPosition.forEach(el => {
        el.position.push(dataWithPosition.indexOf(el) + 1)
    })
    return newData
}
function createDataDisplay(mainData, lastPosition) {
    let dataLength = mainData.length
    const regexp = /\d\d\d\d/
    let firstYear = mainData[0].Date.match(regexp)[0]
    let secondYear = mainData[dataLength - 1].Date.match(regexp)[0]
    let title = 'Premier League ' + firstYear + '-' + secondYear
    let id = firstYear + secondYear;
    let data = lastPosition
    const dataDisplay = {
        id: id,
        title: title,
        data: data
    }
    return dataDisplay
}

function dataForTable(obj) {
    let info = obj.data;
    const dataTable = [];
    let pos = '';
    let logo = '';
    let games = '';
    let name = '';
    let wins = '';
    let draw = '';
    let lose = '';
    let goals = '';
    let points = '';
    let percent = '';
    let form;
    for (let i = 0; i < info.length; i++) {
        pos = info[i].position[info[i].position.length - 1];
        games = info[i].position.length - 1;
        name = info[i].name;
        wins = info[i].points.filter(x => x === 3).length;
        draw = info[i].points.filter(x => x === 1).length;
        lose = info[i].points.filter(x => x === 0).length;
        goals = info[i].scoredGoalsSum + '-' + info[i].concededGoalsSum;
        points = info[i].pointsRes;
        percent = ((points / (games * 3)) * 100).toFixed(1);
        form = info[i].pointColor.slice(info[i].pointColor.length - 10, info[i].pointColor.length)
        dataTable.push({
            pos: pos,
            games: games,
            name: name,
            wins: wins,
            draw: draw,
            lose: lose,
            goals: goals,
            points: points,
            percent: percent,
            form: form
        })

    }
    obj.dataTable = dataTable

    return obj
}

export default dataReplace