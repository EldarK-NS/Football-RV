import React from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import StandigsButton from '../../buttons/standings-button/standings-button';


const VisualResult = ({ dataItem }) => {

    if (!dataItem) {
        dataItem = [0]
    }
    let gameNum = []
    for (let i = 0; i < 38 + 1; i++) {
        gameNum.push(i)
    }

    let dataLine = dataItem.data.map((line) => {
        const { position, teamColor, pointColor, name } = line
        return {
            fill: false,
            lineTension: 0.1, // скруглении углов
            backgroundColor: pointColor,
            borderColor: `rgb${teamColor}`, //цвет линии
            borderCapStyle: 'butt',
            borderWidth: 1, // толщина линии
            borderDashOffset: 0.0,
            pointBorderColor: pointColor,// цвет поинта
            pointBackgroundColor: pointColor,
            pointBorderWidth: 5, // обод вокруг точки
            pointHoverRadius: 5, //радиус точки при наведении
            pointHoverBackgroundColor: pointColor,
            pointHoverBorderColor: pointColor,
            pointHoverBorderWidth: 4,
            pointRadius: 2,//радиус точки до наведения
            pointHitRadius: 5,
            data: position, // места в таблице
            label: name, // надпись в ховере

        }

    })

    const dataForLine = {
        labels: gameNum,
        datasets: dataLine
    };


    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        stepSize: 1,
                        reverse: true

                    }
                }
            ]
        },
        legend: {
            position: 'right',
            labels: {
                boxWidth: 25
            },
            onClick: function (e, legendItem) {
                var index = legendItem.datasetIndex;
                var ci = this.chart;
                var alreadyHidden = (ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden;

                ci.data.datasets.forEach(function (e, i) {
                    var meta = ci.getDatasetMeta(i);

                    if (i !== index) {
                        if (!alreadyHidden) {
                            meta.hidden = meta.hidden === null ? !meta.hidden : null;
                        } else if (meta.hidden === null) {
                            meta.hidden = true;
                        }
                    } else if (i === index) {
                        meta.hidden = null;
                    }
                });

                ci.update();
            },
        },

        tooltips: {
            titleAlign: 'center',
            displayColors: false,
            bodySpacing: 4,
            titleSpacing: 6,
            titleFontSize: 14,
            titleMarginBottom: 8,
            callbacks: {
                title: function (tooltipItem, data) {
                    let name = ''
                    dataItem.data.map((line) => {
                        if (data.datasets[tooltipItem[0].datasetIndex].label === line.name) {
                            name = line.name
                        }
                    })
                    return name
                },
                label: function (tooltipItem, data) {
                    let text = ''
                    let pos = 'Position: ' + tooltipItem.yLabel
                    let game = 'Game num: ' + tooltipItem.xLabel
                    dataItem.data.map((line) => {
                        if (data.datasets[tooltipItem.datasetIndex].label === line.name && tooltipItem.label > 0) {
                            text = [pos, game, line.gameInfo[+tooltipItem.label - 1]]
                        }
                    })
                    return text
                },
            }
        }

    }
    return (
        <div >
            <StandigsButton />
            <h2>{dataItem.title}</h2>
            <Line data={dataForLine} options={options}  style={{ width: '95%', height: '80%' }}/>
        </div>
    )
}

const mapStateToProps = ({ chart }) => {
    return { dataItem: chart }
}

export default connect(mapStateToProps)(VisualResult)
