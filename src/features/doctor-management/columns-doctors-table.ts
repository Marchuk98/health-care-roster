import { Column } from '../../shared'

export const columnsDoctorsTable: Column[] = [
  {
    key: 'fullname',
    sortable: true,
    title: 'Имя врача',
    type: 'text',
  },
  {
    key: 'department',
    sortable: true,
    title: 'Отделение',
    type: 'text',
  },
  {
    key: 'isChief',
    sortable: true,
    title: 'Заведующий',
    type: 'checkbox',
  },
  {
    key: 'actions',
    sortable: false,
    title: '',
  },
]
