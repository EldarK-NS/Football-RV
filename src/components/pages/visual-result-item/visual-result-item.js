

const VisualResultItem = ({ line }) => {
    const { position, teamColor, pointColor, name } = line
    return {
        fill: false,
        lineTension: 0.1, // скруглении углов
        backgroundColor: pointColor,
        borderColor: teamColor, //цвет линии
        borderCapStyle: 'butt',
        borderWidth: 1, // толщина линии
        borderDashOffset: 0.0,
        pointBorderColor: pointColor,// цвет поинта
        pointBackgroundColor: pointColor,
        pointBorderWidth: 5, // обод вокруг точки
        pointHoverRadius: 5, //радиус точки при наведении
        pointHoverBackgroundColor: pointColor,
        pointHoverBorderColor: pointColor,
        pointHoverBorderWidth: 1,
        pointRadius: 2,//радиус точки до наведения
        pointHitRadius: 5,
        data: position, // места в таблице
        label: name, // надпись в ховере

    }

}

export default VisualResultItem;