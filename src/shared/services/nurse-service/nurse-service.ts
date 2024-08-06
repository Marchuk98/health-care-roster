import { NurseType } from './nurse-service.types'
import { nursesData } from '../../mocks/nurses-data'
import { v4 as uuidv4 } from 'uuid'

export const getNurses = (): Promise<NurseType[]> => {
  return new Promise(resolve => {
    resolve(nursesData)
  })
}

export const addNurses = (nurses: Omit<NurseType, 'id'>): Promise<NurseType> => {
  return new Promise(resolve => {
    const newNurses: NurseType = {
      ...nurses,
      id: uuidv4(),
    }
    nursesData.push(newNurses)
    resolve(newNurses)
  })
}

export const updateNurses = (id: string, updatedData: Partial<NurseType>): Promise<NurseType> => {
  return new Promise((resolve, reject) => {
    const index = nursesData.findIndex(d => d.id === id)
    if (index === -1) {
      reject(new Error('Nurses not found'))
      return
    }
    nursesData[index] = { ...nursesData[index], ...updatedData }
    resolve(nursesData[index])
  })
}

export const deleteNurses = (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const index = nursesData.findIndex(d => d.id === id)
    if (index === -1) {
      reject(new Error('Nurses not found'))
      return
    }
    nursesData.splice(index, 1)
    resolve()
  })
}
