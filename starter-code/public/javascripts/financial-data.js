let indexChart = document.getElementById("myChart");
let fromDate = document.getElementById("from");
let toDate = document.getElementById("to");

window.onload = function() {
  let date = new Date();
  let today = date.toISOString().substr(0, 10);
  fromDate.value = today;
  toDate.value = today;
};

axios
  .get("http://api.coindesk.com/v1/bpi/historical/close.json")
  .then(dataResponse => {
    renderChart(dataResponse.data.bpi);
  })
  .catch(err => console.log(err));

function renderChart(dataResult) {
  let lables = [];
  let values = [];

  for (data in dataResult) {
    lables.push(data);
    values.push(dataResult[data]);
  }
  let myChart = new Chart(indexChart, {
    type: "line",
    data: {
      labels: lables,
      datasets: [
        {
          label: "BPI Index",
          data: values
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false
            }
          }
        ]
      }
    }
  });
}

fromDate.onchange = getGraphData;
toDate.onchange = getGraphData;

function getGraphData(event) {
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate.value}&end=${toDate.value}`
    )
    .then(response => {
      renderChart(response.data.bpi);
    })
    .catch(err => console.log(err));
}
