import { create } from 'zustand'

type Alert = {
    id: string
    title: string
    value: number
    currency: string
    createdAt: Date
    triggeredDate?: string
  }

export type typeAlert = {
    alerts: Alert[],
    setAlerts: (alerts: Alert[]) => void
}

export const useAlerts = create<typeAlert>((set) => ({
    alerts: [],
    setAlerts: (alerts) => set({ alerts })
}))

export default useAlerts