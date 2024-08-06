import { v4 as uuidv4 } from 'uuid'
import { DoctorType } from '../services'

export const doctorData: DoctorType[] = [
  { id: uuidv4(), fullname: 'Иванов Иван Иванович', department: 'Кардиологическое', isChief: true },
  { id: uuidv4(), fullname: 'Петров Петр Петрович', department: 'Хирургическое', isChief: false },
  {
    id: uuidv4(),
    fullname: 'Сидоров Сидор Сидорович',
    department: 'Кардиологическое',
    isChief: false,
  },
  {
    id: uuidv4(),
    fullname: 'Кузнецова Анна Андреевна',
    department: 'Хирургическое',
    isChief: true,
  },
  {
    id: uuidv4(),
    fullname: 'Смирнов Алексей Александрович',
    department: 'Кардиологическое',
    isChief: false,
  },
  {
    id: uuidv4(),
    fullname: 'Васильев Василий Васильевич',
    department: 'Хирургическое',
    isChief: false,
  },
  {
    id: uuidv4(),
    fullname: 'Михайлова Мария Михайловна',
    department: 'Кардиологическое',
    isChief: false,
  },
  {
    id: uuidv4(),
    fullname: 'Федоров Федор Федорович',
    department: 'Хирургическое',
    isChief: false,
  },
  {
    id: uuidv4(),
    fullname: 'Алексеев Алексей Алексеевич',
    department: 'Кардиологическое',
    isChief: false,
  },
  { id: uuidv4(), fullname: 'Ильин Илья Ильич', department: 'Хирургическое', isChief: false },
]
