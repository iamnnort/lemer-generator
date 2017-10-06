import Chart from 'chart.js';
import Generator from './Generator';


const generator = new Generator({a: 10002, r0: 103, m: 9999999}, 1000000);
const graphic = document.getElementById("chart").getContext('2d');

generator.generateList();
generator.spliceList();

new Chart(graphic, {
    type: 'bar',
    data: {
        labels: generator.labels,
        datasets: [{
            label: 'Lemer list',
            data: generator.entries,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

console.log('Expectation: ', generator.getExpectation());
console.log('Dispersion: ', generator.getDispersion());
console.log('SKO: ', generator.getSKO());
console.log('Uniformity: ', generator.getUniformity(), '->', generator.getStandartUniformity());
console.log('Period: ', generator.getPeriod());
console.log('Aperiod: ', generator.getAperiod());
