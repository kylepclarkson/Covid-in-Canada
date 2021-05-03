import React from 'react'

import { Typography } from '@material-ui/core'

import styles from './Footer.css'
/** A footer containing some extra details about the data. */
const Footer = () => {
  return (
    <div className='main-footer'>
      <div className="container">
        <div>
          <Typography color='white' variant='h4' className={styles.row}>
            Created by <a href={'https://kyleclarkson.ca'} target='_blank' className='text-white'>Kyle Clarkson</a>.
          </Typography>
          <Typography color='white' variant='body2'>
            *Using 2021 <a href="https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1710000901" target='_blank' className={'text-white'} >population estimates</a>.
          </Typography>
          <Typography color='white' variant='body2'>
            **An average is used due to some regions combining weekend numbers with Monday's numbers.
          </Typography>
          <Typography color='white' variant='body2'>
            ***An estimation using partially administered / delivered. 
          </Typography>
          <Typography color='white' variant='body1' className={'row'}>
            Thanks to the team at <a href={'https://opencovid.ca/api/'} target='_blank' className={'text-white'}>open covid</a> which supplied the data!
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default Footer
