import { create } from 'zustand'

export type LoadingState = {
  loading: boolean
  setLoading: (loading: boolean) => void
}

const useLoading = create<LoadingState>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}))

export default useLoading;