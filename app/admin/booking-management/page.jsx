'use client'
import StackedLineChart from '@/graphs/StackLineChart'
import React from 'react'

export default function page() {
  return (
    <div className='bg-black m-5 rounded-lg p-5'>
    <h1 className='text-4xl text-white mb-5 font-semibold'>Bookings</h1>
      <StackedLineChart />
    </div>
  )
}
