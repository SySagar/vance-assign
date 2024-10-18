"use client"

import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@app/components/ui/select"
import { Button } from "@app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@app/components/ui/card"
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer,CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@app/components/ui/chart"
import { Flag,SquarePlus } from 'lucide-react'

type ForexData = {
  date: string
  rate: number
}

type Country = {
  name: string
  code: string
  currency: string
}

type APIResponse = {
  adjClose: string
  close: string
  code: string
  duration: string
  high: string
  id: number
  lastUpdatedOn: string
  low: string
  open: string
  resDate: string
}

const countries: Country[] = [
  { name: "UK", code: "GB", currency: "GBP" },
  { name: "UAE", code: "AE", currency: "AED" },
]

export default function RateAlertDashboard() {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0])
  const [forexData, setForexData] = useState<ForexData[]>([])
  const [currentRate, setCurrentRate] = useState<number | null>(null)

  useEffect(() => {
    fetchForexData(selectedCountry.currency)
  }, [selectedCountry])

  const fetchForexData = async (currency: string) => {
    try {
      const response = await fetch(`https://web-api.vance.club/public/api/currency-converter/forex?code=${currency}INR%3DX&timeline=1M`)
      const data: APIResponse[] = await response.json()
      console.log("data", data)
      
      const processedData = data.map((item: APIResponse) => ({
        date: new Date(item.resDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        rate: parseFloat(item.close)
      }))
      
      setForexData(processedData)
      setCurrentRate(parseFloat(data[data.length - 1].close))
    } catch (error) {
      console.error("Error fetching forex data:", error)
    }
  }

  const formatYAxis = (value: number) => `${value}L`

  return (
    <Card className="w-min px-4 p-7 pb-4 pl-5 max-w-3xl bg-[#222222] text-white border-none">
    
      <CardContent className=' w-min'>
        <div className="mb-8">
          <Select
            value={selectedCountry.code}
            onValueChange={(value) => setSelectedCountry(countries.find(c => c.code === value) || countries[0])}
          >
            <SelectTrigger className="w-[150px] bg-[#393939] border-gray-700">
              <SelectValue>
                <div className="flex items-center">
                  <Flag className="mr-2 h-4 w-4" />
                  {selectedCountry.name} £({selectedCountry.currency})
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  <div className="flex items-center">
                    <Flag className="mr-2 h-4 w-4" />
                    {country.name} £({country.currency})
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ChartContainer
          config={{
            rate: {
              label: "Exchange Rate",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forexData}>
                <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={formatYAxis} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="mt-4  flex justify-between items-center">
          <div className="text-4xl font-bold">₹{currentRate?.toFixed(2)}</div>
            <Button className=" hover:bg-emerald-600 rounded-3xl p-4 text-black font-semibold">
            Set alert
            <SquarePlus className="h-5 w-5 " />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}