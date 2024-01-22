import { Box, Grid } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import '../roote/rootLayout.css'
import Sidebar from '../sidebar/Sidebar'

const RootLayout = () => {
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={1.2}>
            <div className="sideBar">
              <Sidebar/>
            </div>
        </Grid>
        <Grid item xs={10.8}>
            <Outlet/>
        </Grid>
      </Grid>
    </Box>
    </>
  )
}

export default RootLayout