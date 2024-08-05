import { Nurse } from './nurse-service.types'
import nurseMockData from '../../mocks/nurses.json'

let nurseData: Nurse[] = nurseMockData.map(nurse => ({
  id: nurse.id,
  name: nurse.name,
  department: nurse.department,
}))

export const getNurses = () => {
  return nurseData
}
