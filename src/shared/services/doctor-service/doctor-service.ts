import { DoctorType } from './doctor-service.types'
import { v4 as uuidv4 } from 'uuid'
import { doctorData } from '../../mocks/doctors-data.ts'

export const getDoctors = (): Promise<DoctorType[]> => {
  return new Promise(resolve => {
    resolve(doctorData)
  })
}

export const addDoctor = (doctor: Omit<DoctorType, 'id'>): Promise<DoctorType> => {
  return new Promise(resolve => {
    const newDoctor: DoctorType = {
      ...doctor,
      id: uuidv4(),
    }
    doctorData.push(newDoctor)
    resolve(newDoctor)
  })
}

export const updateDoctor = (id: string, updatedData: Partial<DoctorType>): Promise<DoctorType> => {
  return new Promise((resolve, reject) => {
    const index = doctorData.findIndex(d => d.id === id)
    if (index === -1) {
      reject(new Error('Doctor not found'))
      return
    }
    doctorData[index] = { ...doctorData[index], ...updatedData }
    resolve(doctorData[index])
  })
}

export const deleteDoctor = (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const index = doctorData.findIndex(d => d.id === id)
    if (index === -1) {
      reject(new Error('Doctor not found'))
      return
    }
    doctorData.splice(index, 1)
    resolve()
  })
}
