import React from 'react'
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import CountUp from 'react-countup'
import cx from 'classnames'

import styles from './Cards.module.css'

/**
 *  Display the API data in material-ui cards. 
 *  @params The summary data from the API and the population of the selected region.
 */

// Generate the date when the API data was last updated.
function Cards({ summaryData, population }) {
  const parts = String(summaryData.date).split('-')
  const date = new Date(
    parseInt(parts[2], 10),
    parseInt(parts[1], 10) - 1,
    parseInt(parts[0], 10)
  )
  return (
    <div>
      <Typography align='center' color='textSecondary' variant='body1'>
        Last updated: {date.toLocaleDateString()}
      </Typography>
      <div className={styles.container}>
        <Typography color="textPrimary" variant="h4" align='center' gutterBottom>
          COVID-19 So Far
        </Typography>
        <Grid container justify='center'>
          {/* Total Cases */}
          <Grid item component={Card} xs={12} sm={3} className={cx(styles.card, styles.cases)}>
            <CardContent>
              <Typography color="textSecondary" variant="h5" gutterBottom>
                Cases
            </Typography>
              <Typography variant='h5' gutterBottom>
                <CountUp
                  start={0}
                  end={summaryData.cumulative_cases}
                  duration={2}
                  separator=','
                />
              </Typography>
              <Typography variant='body2'>
                Number of diagnosed cases of COVID-19.
            </Typography>
            </CardContent>
          </Grid>
          {/* Total Recovered */}
          <Grid item component={Card} xs={12} sm={3} className={cx(styles.card, styles.recovered)}>
            <CardContent>
              <Typography color="textSecondary" variant="h5" gutterBottom>
                Recovered
            </Typography>
              <Typography variant='h5' gutterBottom>
                <CountUp
                  start={0}
                  end={summaryData.cumulative_recovered}
                  duration={2}
                  separator=','
                />
              </Typography>
              <Typography variant='body2'>
                Number of people who recovered from COVID-19.
            </Typography>
            </CardContent>
          </Grid>
          {/* Total Deaths */}
          <Grid item component={Card} xs={12} sm={3} className={cx(styles.card, styles.deaths)}>
            <CardContent>
              <Typography color="textSecondary" variant="h5" gutterBottom>
                Deaths
            </Typography>
              <Typography variant='h5' gutterBottom>
                <CountUp
                  start={0}
                  end={summaryData.cumulative_deaths}
                  duration={2}
                  separator=','
                />
              </Typography>
              <Typography variant='body2'>
                Number of deaths caused by COVID-19.
            </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </div>
      <div className={styles.container}>
        <Typography color="textPrimary" variant="h4" align='center' gutterBottom>
          Within the last 24 hours
        </Typography>
        <Grid container justify='center'>
          {/* Total Cases */}
          <Grid item component={Card} xs={12} sm={3} className={cx(styles.card, styles.active)}>
            <CardContent>
              <Typography color="textSecondary" variant="h5" gutterBottom>
                Active
            </Typography>
              <Typography variant='h5' gutterBottom>
                <CountUp
                  start={0}
                  end={summaryData.active_cases}
                  duration={2}
                  separator=','
                />
              </Typography>
              <Typography color="textSecondary" variant="body1" gutterBottom>
                Per Capita*
              </Typography>
              <Typography variant='body1' gutterBottom>
                <CountUp
                  start={0}
                  end={(summaryData.active_cases / population) * 100}
                  duration={1}
                  decimals={3}
                  separator=','
                />%
              </Typography>
              <Typography variant='body2'>
                Number currently active cases of COVID-19 and per capita percentage.
              </Typography>
            </CardContent>
          </Grid>
          {/* Total Recovered */}
          <Grid item component={Card} xs={12} sm={3} className={cx(styles.card, styles.new_cases)}>
            <CardContent>
              <Typography color="textSecondary" variant="h5" gutterBottom>
                New Cases
            </Typography>
              <Typography variant='h5' gutterBottom>
                <CountUp
                  start={0}
                  end={summaryData.cases}
                  duration={2}
                  separator=','
                />
              </Typography>
              <Typography color="textSecondary" variant="body1" gutterBottom>
                Change
              </Typography>
              <Typography variant='body1'
                className={summaryData.active_cases_change < 0 ? styles.red : styles.green}
                gutterBottom>
                <CountUp
                  start={0}
                  end={summaryData.active_cases_change}
                  duration={2}
                  separator=','
                />
              </Typography>
              <Typography variant='body2'>
                The number new cases of COVID-19 and change since previous update.
            </Typography>
            </CardContent>
          </Grid>
          {/* Total Deaths */}
          <Grid item component={Card} xs={12} sm={3} className={cx(styles.card, styles.new_deaths)}>
            <CardContent>
              <Typography color="textSecondary" variant="h5" gutterBottom>
                New Deaths
            </Typography>
              <Typography variant='h5' gutterBottom>
                <CountUp
                  start={0}
                  end={summaryData.deaths}
                  duration={2}
                  separator=','
                />
              </Typography>
              <Typography variant='body2'>
                Number of new deaths caused by COVID-19.
            </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </div>


      <div className={styles.container}>
        <Typography color="textPrimary" variant="h4" align='center' gutterBottom>
          Vaccine Distribution
        </Typography>
        <Grid container justify='center'>
          {/* Deliverd */}
          <Grid item component={Card} xs={12} sm={3} className={cx(styles.card, styles.delivered)}>
            <CardContent>
              <Typography color="textSecondary" variant="h5" gutterBottom>
                Delivered
              </Typography>
              <Typography variant='h5' gutterBottom>
                <CountUp
                  start={0}
                  end={summaryData.cumulative_dvaccine}
                  duration={2}
                  separator=','
                />
              </Typography>
              <Typography color="textSecondary" variant="body1" gutterBottom>
                Percent administered***
              </Typography>
              <Typography variant='body1' gutterBottom>
                <CountUp
                  start={0}
                  end={(summaryData.cumulative_avaccine) / summaryData.cumulative_dvaccine * 100}
                  duration={2}
                  decimals={3}
                  separator=','
                />%
              </Typography>
              <Typography variant='body2'>
                The number of vaccines delivered and lower bound on percent administered.
            </Typography>
            </CardContent>
          </Grid>
          {/* Oneshot */}
          <Grid item component={Card} xs={12} sm={3} className={cx(styles.card, styles.partially_administered)}>
            <CardContent>
              <Typography color="textSecondary" variant="h5" gutterBottom>
                Partially Administered
              </Typography>
              <Typography variant='h5' gutterBottom>
                <CountUp
                  start={0}
                  end={summaryData.cumulative_avaccine}
                  duration={2}
                  separator=','
                />
              </Typography>
              <Typography color="textSecondary" variant="body1" gutterBottom>
                Per Capita*
              </Typography>
              <Typography variant='body1' gutterBottom>
                <CountUp
                  start={0}
                  end={(summaryData.cumulative_avaccine / population * 100)}
                  duration={2}
                  decimals={3}
                  separator=','
                />%
              </Typography>
              <Typography variant='body2'>
                The number of individuals given at least one vaccine shot.
            </Typography>
            </CardContent>
          </Grid>
          {/* Fully vaccinated */}
          <Grid item component={Card} xs={12} sm={3} className={cx(styles.card, styles.fully_administered)}>
            <CardContent>
              <Typography color="textSecondary" variant="h5" gutterBottom>
                Fully Administered
            </Typography>
              <Typography variant='h5' gutterBottom>
                <CountUp
                  start={0}
                  end={summaryData.cumulative_cvaccine}
                  duration={2}
                  separator=','
                />
              </Typography>
              <Typography color="textSecondary" variant="body1" gutterBottom>
                Per Capita*
              </Typography>
              <Typography variant='body1' gutterBottom>
                <CountUp
                  start={0}
                  end={(summaryData.cumulative_cvaccine / population * 100)}
                  duration={2}
                  decimals={3}
                  separator=','
                />%
              </Typography>
              <Typography variant='body2'>
                The number of individuals fully vaccinated and per captia percentage.
            </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Cards
