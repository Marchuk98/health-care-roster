import { Column } from '../../shared'

export const columnsNursesTable: Column[] = [
  {
    key: 'name',
    sortable: true,
    title: 'Имя медсестры',
    type: 'text',
  },
  {
    key: 'department',
    sortable: true,
    title: 'Отделение',
    type: 'text',
  },
  {
    key: 'actions',
    sortable: false,
    title: '',
  },
]
