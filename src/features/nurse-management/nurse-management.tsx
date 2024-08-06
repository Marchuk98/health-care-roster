import { useCallback, useEffect, useState } from 'react'
import { columnsNursesTable } from './columns-nurses-table.ts'

import { AddIcon } from '../../shared/assets'
import { Button } from '@mui/material'
import {
  getNurses,
  NurseType,
  NurseModal,
  TableCustom,
  useDisclose,
  deleteNurses,
  updateNurses,
  addNurses,
} from '../../shared'

export const NurseManagement = () => {
  const [nurseData, setNurseData] = useState<NurseType[]>([])
  const { isOpen, onOpen, onClose } = useDisclose()
  const [selectedNurse, setSelectedNurse] = useState<NurseType | null>(null)

  useEffect(() => {
    const fetchNurses = async () => {
      try {
        const response = await getNurses()
        setNurseData(response)
      } catch (error) {
        console.error('Ошибка при получении данных медсестёр:', error)
      }
    }
    fetchNurses()
  }, [])

  const handleAddNurse = useCallback(() => {
    setSelectedNurse(null)
    onOpen()
  }, [onOpen])

  const handleEditNurse = useCallback(
    (nurse: NurseType) => {
      setSelectedNurse(nurse)
      onOpen()
    },
    [onOpen]
  )

  const handleDeleteNurse = useCallback(async (id: string) => {
    try {
      await deleteNurses(id)
      setNurseData(prevData => prevData.filter(n => n.id !== id))
    } catch (error) {
      console.error('Ошибка при удалении медсестры:', error)
    }
  }, [])

  const handleSaveNurse = useCallback(
    async (nurse: Omit<NurseType, 'id'>) => {
      try {
        if (selectedNurse) {
          const updatedNurse = await updateNurses(selectedNurse.id, nurse)
          setNurseData(prevData =>
            prevData.map(n => (n.id === selectedNurse.id ? updatedNurse : n))
          )
        } else {
          const newNurses = await addNurses(nurse)
          setNurseData(prevData => {
            if (!prevData.some(d => d.id === newNurses.id)) {
              return [...prevData, newNurses]
            }
            return prevData
          })
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
