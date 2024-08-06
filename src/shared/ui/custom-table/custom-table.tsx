import {
  Paper,
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Checkbox,
  IconButton,
} from '@mui/material'
import { DeleteIcon, EditIcon } from '../../assets'

type ColumnType = 'text' | 'checkbox'

export type Column = {
  key: string
  sortable: boolean
  title: string
  align?: 'right' | 'left' | 'center'
  type?: ColumnType
}

type TableProps<T extends { id: number }> = {
  data: T[]
  columns: Column[]
  onEdit: (row: T) => void
  onDelete: (id: number) => void
}

export const TableCustom = <T extends { id: number }>({
  columns,
  data,
  onEdit,
  onDelete,
}: TableProps<T>) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <TableContainer component={Paper} sx={{ maxWidth: 800, width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.key} align={column.align || 'left'}>
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow key={row.id}>
                {columns.map(column => (
                  <TableCell key={column.key} align={column.align || 'left'}>
                    {column.key === 'actions' ? (
                      <>
                        <IconButton onClick={() => onEdit(row)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => onDelete(row.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                    ) : column.type === 'checkbox' ? (
                      <Checkbox checked={(row as any)[column.key]} disabled />
                    ) : (
                      String((row as any)[column.key])
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
