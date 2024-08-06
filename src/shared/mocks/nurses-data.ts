import { v4 as uuidv4 } from 'uuid'
import { NurseType } from '../services'

export const nursesData: NurseType[] = [
  { id: uuidv4(), name: 'Антонова Антонина Антоновна', department: 'Кардиологическое' },
  { id: uuidv4(), name: 'Борисова Борислава Борисовна', department: 'Хирургическое' },
  { id: uuidv4(), name: 'Волкова Валентина Валерьевна', department: 'Кардиологическое' },
  { id: uuidv4(), name: 'Григорьева Галина Григорьевна', department: 'Хирургическое' },
  { id: uuidv4(), name: 'Дмитриева Дарья Дмитриевна', department: 'Кардиологическое' },
  { id: uuidv4(), name: 'Евсеева Екатерина Евгеньевна', department: 'Хирургическое' },
  { id: uuidv4(), name: 'Жукова Жанна Жановна', department: 'Кардиологическое' },
  { id: uuidv4(), name: 'Зайцева Зинаида Зиновьевна', department: 'Хирургическое' },
  { id: uuidv4(), name: 'Иванова Ирина Игоревна', department: 'Кардиологическое' },
  { id: uuidv4(), name: 'Крылова Ксения Константиновна', department: 'Хирургическое' },
]
