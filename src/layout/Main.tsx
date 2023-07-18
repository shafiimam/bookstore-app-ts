import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

export default function Main() {
  return (
    <div>
      <Navbar/>
      <Box paddingTop={'100px'}>
        <Outlet />
      </Box>
    </div>
  )
}
