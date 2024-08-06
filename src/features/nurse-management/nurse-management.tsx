import { useCallback, useEffect, useState } from 'react'
import { columnsNursesTable } from './columns-nurses-table.ts'

import { AddIcon } from '../../shared/assets'
import { Button } from '@mui/material'
import { getNurses, Nurse, NurseModal, TableCustom, useDisclose } from '../../shared'

export const NurseManagement = () => {
  const [nurseData, setNurseData] = useState<Nurse[]>([])
  const { isOpen, onOpen, onClose } = useDisclose()
  const [selectedNurse, setSelectedNurse] = useState<Nurse | null>(null)

  useEffect(() => {
    const fetchNurses = () => {
      const response = getNurses()
      setNurseData(response)
    }
    fetchNurses()
  }, [])

  const handleAddNurse = useCallback(() => {
    setSelectedNurse(null)
    onOpen()
  }, [onOpen])

  const handleEditNurse = useCallback(
    (nurse: Nurse) => {
      setSelectedNurse(nurse)
      onOpen()
    },
    [onOpen]
  )

  const handleDeleteNurse = useCallback((id: number) => {
    setNurseData(prevData => prevData.filter(n => n.id !== id))
  }, [])

  const handleSaveNurse = useCallback(
    (nurse: Omit<Nurse, 'id'>) => {
      try {
        if (selectedNurse) {
          const updatedNurse = {
            ...selectedNurse,
            ...nurse,
          }
          setNurseData(prevData =>
            prevData.map(n => (n.id === selectedNurse.id ? updatedNurse : n))
          )
        } else {
          const newNurse = {
            ...nurse,
            id: nurseData.length ? Math.max(...nurseData.map(n => n.id)) + 1 : 1,
          }
          setNurseData(prevData => [...prevData, newNurse])
        }
      } catch (error) {
        console.error('Ошибка при сохранении медсестры:', error)
      } finally {
        onClose()
      }
    },
    [selectedNurse, onClose, nurseData]
  )

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={handleAddNurse}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Добавить медсестру
        </Button>
      </div>
      <TableCustom
        data={nurseData}
        columns={columnsNursesTable}
        onEdit={handleEditNurse}
        onDelete={handleDeleteNurse}
      />
      <NurseModal
        isOpen={isOpen}
        onClose={onClose}
        nurse={selectedNurse}
        isEditing={!!selectedNurse}
        onSave={handleSaveNurse}
      />
    </div>
  )
}
