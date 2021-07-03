// JUJU & MRNKT VERSION JUJU & MRNKT VERSION JUJU & MRNKT VERSION JUJU & MRNKT VERSION
// JUJU & MRNKT VERSION JUJU & MRNKT VERSION JUJU & MRNKT VERSION JUJU & MRNKT VERSION
// JUJU & MRNKT VERSION JUJU & MRNKT VERSION JUJU & MRNKT VERSION JUJU & MRNKT VERSION

  const tapez = document.querySelector('#input_text');
  const ville = document.querySelector('#ville');
  const temperature = document.querySelector('#temp');
  const ciel = document.querySelector('#desc');
  const button= document.querySelector('#submit');
  const background = document.querySelector("body");

  button.addEventListener('click', function() {

    fetch('https://api.openweathermap.org/data/2.5/weather?q='+tapez.value+'&units=metric&appid=44cceb207739b0a0c77ee4bc3caeafd8')
    // ++ incremente
    .then(response => response.json())
    .then(data => {
      const tempValue = (Math.round(data['main']['temp']));
      const nameValue = data['name'];
      const descValue = data['weather'][0]['description'];

      let toto = tempValue;
      if (toto < 10) {
        background.classList.add("backgroundfroid");
        background.classList.remove("backgroundchaud");
      } else if (toto > 20) {
        background.classList.add("backgroundchaud");
        background.classList.remove("backgroundfroid");
      } else {
        alert("tempéré");
      }

      ville.innerHTML = nameValue;
      temperature.innerHTML = "Temp - "+tempValue;
      ciel.innerHTML = "How's the sky? "+descValue;

    })

    .catch(err => alert("Ville non reconnue!"));

  })

// AVEC ABDIEL AVEC ABDIEL AVEC ABDIEL AVEC ABDIEL AVEC ABDIEL
// AVEC ABDIEL AVEC ABDIEL AVEC ABDIEL AVEC ABDIEL AVEC ABDIEL
// AVEC ABDIEL AVEC ABDIEL AVEC ABDIEL AVEC ABDIEL AVEC ABDIEL

  var monGraph;

  button.addEventListener('click', function() {

    if(monGraph) monGraph.destroy();

    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+tapez.value+'&units=metric&appid=44cceb207739b0a0c77ee4bc3caeafd8')
    .then(response => response.json())
    .then(data => {

      const temptableau = [];
      const datetableau = [];

      for (i = 0; i < data['list'].length; i ++) {
        temptableau.push(data['list'][i]['main']['temp']);
        datetableau.push(data['list'][i].dt_txt);
      }

      monGraph = new Chart("myChart", {
        type: "line",
        data: {
          labels: datetableau,
          datasets: [{
            label: 'Prévisions sur 5 jours',
            data: temptableau,
            fill: true,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            // borderDash: [5],
          }]
        },
        options: {
          plugins: {  // 'legend' now within object 'plugins {}'
            legend: {
              labels: {
                color: "whitesmoke",  // not 'fontColor:' anymore
                // fontSize: 18  // not 'fontSize:' anymore
                // font: {
                  // size:  30, // 'size' now within object 'font {}'
                // }
              }
            }
          },
          scales: {
            y: {  // not 'yAxes: [{' anymore (not an array anymore)
              ticks: {
                color: "black", // not 'fontColor:' anymore
                // fontSize: 18,
                font: {
                  size: 20, // 'size' now within object 'font {}'
                },
                stepSize: 1,
                beginAtZero: true
              }
            },
            x: {  // not 'xAxes: [{' anymore (not an array anymore)
              ticks: {
                color: "black",  // not 'fontColor:' anymore
                //fontSize: 14,
                font: {
                  size: 20, // 'size' now within object 'font {}'
                },
                stepSize: 1,
                beginAtZero: true
              }
            }
          }
        }
      });

    })

    .catch(err => alert("Ville non reconnue!"));

  })