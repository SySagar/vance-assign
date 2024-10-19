"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@app/components/ui/dialog"
import { Input } from "@app/components/ui/input"
import { Button } from "@app/components/ui/button"
import { Label } from "@app/components/ui/label"
import { addRateAlert } from '@app/lib/alertService';
import useCountry from '@app/store/useCountry'
import useAlerts from '@app/store/useAlerts'

import Image from 'next/image'

type RateAlertModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (title: string, value: number) => void
  onAlertSubmit: () => void
}

export default function RateAlertModal({ isOpen, onClose, onSubmit,onAlertSubmit }: RateAlertModalProps) {
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const { countryInfo } = useCountry(); 
  const {alerts,setAlerts} = useAlerts()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(title, parseFloat(value))

    const addAlert = async ()=>await addRateAlert(title, parseFloat(value), countryInfo.countryCode, countryInfo.name)
    setAlerts([...alerts, {id:Math.random().toString(),title:title,value:parseFloat(value),currency:countryInfo.countryCode,createdAt:new Date()}])
    addAlert().then(() => {

      setTitle('')
      setValue('')
      console.log('Submitted:', { title, value })
      onAlertSubmit()
      onClose()
    })
  }

  const handleCancel = () => {
    setTitle('')
    setValue('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[325px] bg-[#2A2A2A] text-white border-none">
        <DialogHeader>
          <DialogTitle className="text-center text-lg tracking-wide font-semibold">Set Rate alert!</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center mt-4">
          <div className="flex flex-col gap-3 items-center space-x-2 mb-6">
            <Image
              src={countryInfo.flagImage}
              alt={countryInfo.countryCode}
              width={44}
              height={44}
              className="rounded-full"
            />
            <span>{countryInfo.name} £({countryInfo.countryCode})</span>
          </div>
          <form onSubmit={handleSubmit} className="w-full space-y-4 ">
            <div className=' flex flex-col justify-start items-start gap-3'>
                <Label className='pl-1' htmlFor="title">Title</Label>
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-[#3A3A3A] border-none text-white placeholder-gray-400"
              />
            </div>
            <div className='pb-3 flex flex-col justify-start items-start gap-3'>
                <Label className='pl-1' htmlFor="value">Rate alert Value</Label>
              <Input
                placeholder="Rate alert Value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="number"
                className="bg-[#3A3A3A] border-none text-white placeholder-gray-400"
              />
            </div>
            <Button
              type="submit"
              className="w-full  text-black font-semibold py-2 rounded-full"
            >
              Set alert
            </Button>
          </form>
          <button
            onClick={handleCancel}
            className="mt-4 text-sm text-gray-400 hover:text-gray-300"
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}