import React from 'react'
import RateAlertDashboard from '@app/components/RateAlert'

export default function page() {
  return (
    <div className='bg-[#111111] min-h-screen flex flex-col justify-start pt-16 items-center'>
        <div className='flex flex-col gap-12 justify-center items-center'>
        <p className="text-3xl text-white font-bold">Rate alert dashboard</p>
        <RateAlertDashboard />
        </div>

    </div>
  )
}
