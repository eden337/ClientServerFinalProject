// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var countlow=0;
var countMedium=0;
var countHigh=0;
var countSever=0;


$.get('/piechart',function(data,status){
  countLow=data.low;
  countMedium= data.medium;
  countHigh = data.high;
  countSever = data.sever;
  console.log(countHigh);
  var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ["Low", "Medium", "High", "Severe"],
      datasets: [{
        data: [countLow, countMedium, countHigh,countSever],
        backgroundColor: ['#2ecc71', '#95a5a6', '#f1c40f','#e74c3c'],
        hoverBackgroundColor: ['#27ae60', '#7f8c8d', '#f39c12','#c0392b'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false
      },
      cutoutPercentage: 45,
    },
  });
});


