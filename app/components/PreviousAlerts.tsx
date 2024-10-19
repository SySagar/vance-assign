'use client'

import { useState,  useRef, useCallback } from 'react'
import { Card, CardContent } from "@app/components/ui/card"
import Image from 'next/image'
import React from 'react'
import {Skeleton} from '@app/components/ui/skeleton'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@app/components/ui/pagination"
import useLoading from '@app/store/useLoading'

type Alert = {
  id: string
  title: string
  value: number
  currency: string
  createdAt: Date
  triggeredDate?: string
}

export default function PreviousAlerts({ alerts }: { alerts: Alert[] }) {
  const [currentPage, setCurrentPage] = useState(1)
  const alertsPerPage = 4
  const containerRef = useRef<HTMLDivElement>(null)
  const {loading} = useLoading()


  const indexOfLastAlert = currentPage * alertsPerPage
  const indexOfFirstAlert = indexOfLastAlert - alertsPerPage
  const currentAlerts = alerts.slice(indexOfFirstAlert, indexOfLastAlert)
  const totalPages = Math.ceil(alerts.length / alertsPerPage)

  const changePage = useCallback((newPage: number) => {
    setCurrentPage(newPage)
  }, [])

  const handlePageChange = useCallback((e: React.MouseEvent<HTMLAnchorElement>, newPage: number) => {
    e.preventDefault()
    changePage(newPage)
  }, [changePage])

  return (
    <div ref={containerRef} className="w-full max-w-md flex flex-col justify-between items-center pb-16">
      <div className='flex flex-row w-full mb-4 justify-between items-center'>

      {
           loading ? (
            <div className='w-full flex flex-row justify-between items-center mb-6'>
                    <Skeleton className="w-[100px] h-[30px] rounded-full " />
                    <div className='flex flex-row gap-2 items-center'>
                    <Skeleton className="w-[30px] h-[30px] rounded-xl " />
                    <Skeleton className="w-[70px] h-[40px] rounded-full " />
                    <Skeleton className="w-[30px] h-[30px] rounded-xl " />
                    </div>
            </div>
           ):

        currentAlerts.length === 0 ?  (
          <div className='w-full flex flex-row justify-between items-center mb-6'>
            <h2 className="text-[#c7c7c7] text-lg w-full text-center text-nowrap font-bold">No previous alerts</h2>
          </div>
        ) : (
          <div className='w-full flex flex-row justify-between items-center mb-6'>
          <h2 className="text-[#c7c7c7] text-md text-nowrap font-bold">Previous alerts</h2>
          
          <Pagination className='w-min'>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => handlePageChange(e, Math.max(currentPage - 1, 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink 
                    href="#" 
                    onClick={(e) => handlePageChange(e, i + 1)}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => handlePageChange(e, Math.min(currentPage + 1, totalPages))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        )
      }
    
      </div>
      
      {currentAlerts.filter((alert) => alert.triggeredDate !== undefined).map((alert:any) => (
        <Card key={alert.id} className="mb-6 p-1 bg-[#222222] text-white border-none w-full rounded-3xl">
          <CardContent className="p-4 flex flex-col">
            <div className="flex justify-between items-center ">
              <span className="text-sm text-gray-400 font-semibold">{alert.title}</span>
              {alert.triggeredDate && (
                <div className="flex items-center space-x-1">
                  {alert.triggeredDate.split('/').map((date:string, i:any) => (
                    <React.Fragment key={i}>
                      {i > 0 && <span className="text-gray-500">/</span>}
                      <span className="px-2 py-1 bg-[#333333] rounded-md text-white text-md">
                        {date}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col justify-start items-start">
              <span className="text-2xl font-bold relative bottom-1">₹{alert.value.toFixed(2)}</span>
              <div className="flex mt-4 items-center">
                <Image
                  src={`/flags/${alert.country.toLowerCase()}.png`}
                  alt={alert.country}
                  width={20}
                  height={20}
                  className="rounded-full mr-2"
                />
                <span className='text-sm'>{alert.country} £({alert.currency})</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}