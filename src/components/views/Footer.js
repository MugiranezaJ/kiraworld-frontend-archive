import { Container, Divider, Grid } from '@mui/material'
import React from 'react'

export const Footer = () => {
    return (
        <Grid
            container 
            spacing={2}
            style={{
                // marginTop: 50,
                backgroundColor: 'whitesmoke',
                padding: '20px 100px',
                height: '100px'
            }}
         >
            <Grid item xs={4}>
                Copyright © 2022 Kira World. All Rights Reserved.
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4} textAlign={'right'}>
                Security Terms Privacy
            </Grid>
        </Grid>
    )
}