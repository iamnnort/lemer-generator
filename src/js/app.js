import Chart from 'chart.js';
import Generator from './Generator';

document.getElementById('generatorActions').addEventListener('submit', (event) => {
  const a = document.getElementById('aParam').value;
  const r0 = document.getElementById('r0Param').value;
  const m = document.getElementById('mParam').value;
  
  const generator = new Generator({a: +a, r0: +r0, m: +m}, 1000000);
  const graphicContainer = document.createElement("canvas");
  const graphic= graphicContainer.getContext('2d');
  
  generator.generateList();
  generator.spliceList();

  const resultContainer = document.getElementById("generatorResult");
  resultContainer.innerHTML = `
    <h3>Result</h3>
    <ul class="list-group">
      <li class="list-group-item">
        <span class="result-type">Expectation</span>
        <span class="result-value">${generator.getExpectation()}</span>
      </li>
      <li class="list-group-item">
        <span class="result-type">Dispersion</span>
        <span class="result-value">${generator.getDispersion()}</span>
      </li>
      <li class="list-group-item">
        <span class="result-type">SKO</span>
        <span class="result-value">${generator.getSKO()}</span>
      </li>
      <li class="list-group-item">
        <span class="result-type">Uniformity</span>
        <span class="result-value">${generator.getUniformity()} -> ${generator.getStandartUniformity()}</span>
      </li>
      <li class="list-group-item">
        <span class="result-type">Period</span>
        <span class="result-value">${generator.getPeriod()}</span>
      </li>
      <li class="list-group-item">
        <span class="result-type">Aperiod</span>
        <span class="result-value">${generator.getAperiod()}</span>
      </li>
    </ul>
  `;
  resultContainer.appendChild(graphicContainer);

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

  event.preventDefault();
  return false;
}, false);
