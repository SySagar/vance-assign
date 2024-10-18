import { create } from 'zustand'

type typeFormObject = {
    title: string
    value: string
    isFormSubmitted?: boolean
}

export type typeForm = {
    form: typeFormObject
    setForm: (form:typeFormObject) => void
    resetForm: () => void
}

const useForm = create<typeForm>((set) => ({
  form:{
    title: '',
    value: '',
    isFormSubmitted: false
  },
    setForm: (form:typeFormObject) => set({ form }),
    resetForm: () => set({ form: { title: '', value: '', isFormSubmitted:false } })
}))

export default useForm;