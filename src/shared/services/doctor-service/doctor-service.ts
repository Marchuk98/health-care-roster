import doctorMocData from '../../mocks/doctors.json'
import { Doctor } from './doctor-service.types'

let doctorData: Doctor[] = doctorMocData.map(doctor => ({
  id: doctor.id,
  fullname: doctor.name,
  department: doctor.department,
  isChief: doctor.isChief,
}))

export const getDoctors = () => {
  return doctorData
}
