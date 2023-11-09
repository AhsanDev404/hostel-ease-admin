'use client'
import SameDataComposedChart from '@/graphs/SameDataComposedChart'
import StackedAreaChart from '@/graphs/StackedAreaChart'
import React from 'react'

export default function page() {
  return (
    <div>
      <div className='bg-black m-5 rounded-lg p-5'>
        <h1 className='text-4xl text-white mb-5 font-semibold'>Bookings</h1>
      <SameDataComposedChart />
      </div>
      <div className='bg-black m-5 rounded-lg p-5'>
        <h1 className='text-4xl text-white mb-5 font-semibold'>User And Mangers</h1>
      <StackedAreaChart />
      </div>
    </div>
  )
}
