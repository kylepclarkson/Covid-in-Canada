import { useState, useEffect } from 'react'
import { Container, Typography, Grid } from '@material-ui/core';
import { Line } from 'react-chartjs-2'

import CountryPicker from './components/RegionPicker/RegionPicker'
import Cards from './components/Cards/Cards'
import Footer from './components/Footer/Footer'
import covidImage from './covid-19.svg'
import loadingGif from './loading.gif'

import styles from './App.css'

// the number of previous day (minus 7) to use when comptuing 7 day case averages. 
const day_window = 35

// Add function to date object for generating graph labels
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

// generate date (x axis) labels for graphs. 
const dateArray = []
var currentDate = new Date(new Date() - ((day_window - 8) * 24 * 60 * 60 * 1000))
while (currentDate <= new Date()) {
  dateArray.push(new Date(currentDate).toLocaleDateString());
  currentDate = currentDate.addDays(1);
}

function App() {

  // === state data ===
  // summary data
  const [summaryData, setSummaryData] = useState([])
  // timeseries new cases data
  const [timeSeriesNewCases, setTimeSeriesNewCases] = useState([])
  // timeseries active cases data
  const [timeSeriesActiveCases, setTimeSeriesActiveCases] = useState([])
  // true when data is being retrieved.
  const [loading, setLoading] = useState(false)
  // region of country
  const [region, setRegion] = useState('canada')

  // Plots for Chartjs
  const data = {
    labels: dateArray,
    datasets: [
      {
        label: 'Daily Cases',
        data: timeSeriesNewCases,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 110, 0.9)',
      },
      {
        label: 'Active Case Count',
        data: timeSeriesActiveCases,
        fill: false,
        backgroundColor: 'rgb(10, 110, 255)',
        borderColor: 'rgba(10, 132, 255, 0.9)',
      },
    ],
  };

  const options = {
    // responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 90
        },
        scaleLabel: {
          display: true,
          labelString: 'Days'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: '7-day average'
        }
      }]
    },
  };

  // Population estimates for 2021Q1 from gov. Used for calculating percentages in cards component.
  // https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1710000901
  const populations = {
    'canada': 38048738,
    'AB': 4436258,
    'BC': 5153039,
    'MB': 1380935,
    'NB': 1178832,
    'NL': 520438,
    'NT': 45136,
    'NS': 979449,
    'NU': 39407,
    'ON': 14755211,
    'PE': 159819,
    'QC': 8575944,
    'SK': 1178832,
    'YT': 42192,
  }

  // Function for setting region. Passed as prop to RegionPicker component to alter state. 
  const handleSetRegion = r => {
    setRegion(r)
  }

  useEffect(() => {
    const url = 'https://api.opencovid.ca/'
    // Get 28th day before current
    const start = new Date(new Date() - ((day_window - 1) * 24 * 60 * 60 * 1000))
    // Date form: DD-MM-YYYY
    const after = `${start.getDate()}-${start.getMonth() + 1}-${start.getFullYear()}`
    
    // Call API for data.
    const fetchData = async () => {
      setLoading(true)
      // Get summary data for region.
      var res = await fetch(`${url}summary?loc=${region}`)
      const { summary } = await res.json().then(res => {
        return res
      })
      // console.log("summary", summary[0])
      setSummaryData(summary[0])

      // get time series with daily new cases
      res = await fetch(`${url}timeseries?stat=cases&loc=${region}&after=${after}`)
      const { cases } = await res.json().then(res => {
        return res
      })
      
      // compute 7-day new case averages; set to state. 
      var sum = 0.0
      var i = 0
      var j = 0
      var temp = []
      for (i = 0; i <= cases.length - 7; i++) {
        sum = 0.0
        for (j = i; j < i + 7; j++) {
          sum += (cases[j].cases > 0) ? cases[j].cases : 0
        }
        temp[i] = sum / 7.0
      }
      setTimeSeriesNewCases(temp)

      // get time series with active cases
      res = await fetch(`${url}timeseries?stat=active&loc=${region}&after=${after}`)
      const { active } = await res.json().then(res => {
        return res
      })

      // compute 7-day active case averages; set to state. 
      temp = []
      for (i = 0; i <= active.length - 7; i++) {
        sum = 0.0
        for (j = i; j < i + 7; j++) {
          sum += (active[j].active_cases > 0) ? active[j].active_cases : 0
        }
        temp[i] = sum / 7.0
      }
      setTimeSeriesActiveCases(temp)

      setLoading(false)
    }

    // get API data. 
    fetchData()

  }, [region])

  return (
    <div>
      <div className={styles.pageContainer}>
        <Grid container direction='row' justify='center' alignItems='flex-end'>
          <Grid item style={{ marginRight: '20px', marginTop: '100px', marginBottom: '20px' }}>
            <img alt='covid' src={covidImage} style={{ width: 150, height: 150 }} />
          </Grid>
          <Grid item>
            <Typography color="textPrimary" variant='h2' align='center' gutterBottom>
              Covid In Canada
        </Typography>
          </Grid>
        </Grid>
        {
          // display loading gif while data is being retreived.
          loading ? (
            <Grid container item
              direction='row'
              justify='center'
              alignItems='center'
              style={{ minHeight: '100vh' }}>
              <img alt='loading' src={loadingGif} style={{ width: 200, height: 200 }} />
            </Grid>
          ) : (
            // Display data. 
            <div>
              <CountryPicker
                currentRegion={region}
                handleSetRegion={handleSetRegion}
              />
              <Cards
                summaryData={summaryData}
                population={populations[region]}
              />
              <Typography color="textPrimary" variant="h4" align='center' gutterBottom>
                7-Day Averages over the Last Month**
        </Typography>
              <Container>
                <Line
                  data={data}
                  options={options} />
              </Container>
            </div>
          )
          // end main
        }
      </div>
      <Footer />
    </div>
  )
}

export default App;
