import { useCallback, useEffect, useState } from 'react'

import { columnsDoctorsTable } from './columns-doctors-table.ts'

import { AddIcon } from '../../shared/assets'
import { Button } from '@mui/material'
import {
  deleteDoctor,
  addDoctor,
  updateDoctor,
  DoctorsModal,
  getDoctors,
  DoctorType,
  TableCustom,
  useDisclose,
} from '../../shared'

export const DoctorManagement = () => {
  const [doctorData, setDoctorData] = useState<DoctorType[]>([])
  const { isOpen, onOpen, onClose } = useDisclose()
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorType | null>(null)

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getDoctors()
        setDoctorData(response)
      } catch (error) {
        console.error('Ошибка при получении данных врачей:', error)
      }
    }
    fetchDoctors()
  }, [])

  const handleAddDoctor = useCallback(() => {
    setSelectedDoctor(null)
    onOpen()
  }, [onOpen])

  const handleEditDoctor = useCallback(
    (doctor: DoctorType) => {
      setSelectedDoctor(doctor)
      onOpen()
    },
    [onOpen]
  )

  const handleDeleteDoctor = useCallback(async (id: string) => {
    try {
      await deleteDoctor(id)
      setDoctorData(prevData => prevData.filter(d => d.id !== id))
    } catch (error) {
      console.error('Ошибка при удалении врача:', error)
    }
  }, [])

  const handleSaveDoctor = useCallback(
    async (doctor: Omit<DoctorType, 'id'>) => {
      try {
        if (selectedDoctor) {
          const updatedDoctor = await updateDoctor(selectedDoctor.id, doctor)
          setDoctorData(prevData =>
            prevData.map(d => (d.id === selectedDoctor.id ? updatedDoctor : d))
          )
        } else {
          const newDoctor = await addDoctor(doctor)
          setDoctorData(prevData => {
            if (!prevData.some(d => d.id === newDoctor.id)) {
              return [...prevData, newDoctor]
            }
            return prevData
          })
        }
      } catch (error) {
        console.error('Ошибка при сохранении врача:', error)
      } finally {
        onClose()
      }
    },
    [selectedDoctor, onClose]
  )

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={handleAddDoctor}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Добавить врача
        </Button>
      </div>
      <TableCustom
        data={doctorData}
        columns={columnsDoctorsTable}
        onEdit={handleEditDoctor}
        onDelete={handleDeleteDoctor}
      />
      <DoctorsModal
        isOpen={isOpen}
        onClose={onClose}
        doctor={selectedDoctor}
        isEditing={!!selectedDoctor}
        onSave={handleSaveDoctor}
      />
    </div>
  )
}
