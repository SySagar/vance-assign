'use client';
import React from 'react'
import RateAlertDashboard from '@app/components/RateAlert'
import { getRateAlerts } from '@app/lib/alertService';
import { useState, useEffect } from 'react'
import PreviousAlerts from '@app/components/PreviousAlerts'
import useLoading from '@app/store/useLoading'
import { checkAlertTrigger } from '@app/lib/alertService';

type typeRateAlert = {
  id: string
  title: string
  value: number
  currency: string
  createdAt: Date
}


export default function page() {
  
  const [alerts, setAlerts] = useState<typeRateAlert[]>([]);
  const {setLoading} = useLoading()

  const fetchAlerts = async () => {
    try {
    setLoading(true)
    const alertsFromFirestore = await getRateAlerts()
    const checkedAlerts = await Promise.all(alertsFromFirestore.map(async (alert) => {
      const triggeredDate = await checkAlertTrigger(alert)
      return { ...alert, triggeredDate }
    }))


      setAlerts(checkedAlerts);
    
  } catch (error) {
   console.error(error)   
  }
  finally{
    setLoading(false)}
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  console.log("hehes", alerts)


  return (
    <div className='bg-[#111111] min-h-screen flex flex-col justify-start pt-16 items-center'>
        <div className='flex flex-col gap-12 justify-center items-center'>
        <p className="text-3xl text-white font-bold">Rate alert dashboard</p>
        <RateAlertDashboard onAlertSubmit={fetchAlerts}  />

    
        <div className='w-full flex flex-col justify-center items-center mt-16 '>
        <PreviousAlerts alerts={alerts} />
      </div>
        </div>

    
      {/* <div>
      <h2 className="text-white text-xl mt-6 mb-2">Previous Alerts</h2>
      <ul className="space-y-2">
        {alerts.map((alert) => (
          <li key={alert.id} className="text-white">
            {alert.title}: £{alert.value} ({alert.currency})
          </li>
        ))}
      </ul>
      </div> */}
    </div>
  )
}
