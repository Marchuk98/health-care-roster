import { useCallback, useEffect, useState } from 'react'

import { columnsDoctorsTable } from './columns-doctors-table.ts'

import { AddIcon } from '../../shared/assets'
import { Button } from '@mui/material'
import { Doctor, DoctorsModal, getDoctors, TableCustom, useDisclose } from '../../shared'

export const DoctorManagement = () => {
  const [doctorData, setDoctorData] = useState<Doctor[]>([])
  const { isOpen, onOpen, onClose } = useDisclose()
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)

  useEffect(() => {
    const fetchDoctors = () => {
      const response = getDoctors()
      setDoctorData(response)
    }
    fetchDoctors()
  }, [])

  const handleAddDoctor = useCallback(() => {
    setSelectedDoctor(null)
    onOpen()
  }, [onOpen])

  const handleEditDoctor = useCallback((doctor: Doctor) => {
    setSelectedDoctor(doctor)
    onOpen()
  }, [])

  const handleDeleteDoctor = useCallback((id: number) => {
    setDoctorData(prevData => prevData.filter(d => d.id !== id))
  }, [])

  const handleSaveDoctor = useCallback(
    async (doctor: Omit<Doctor, 'id'>) => {
      try {
        if (selectedDoctor) {
          const updatedDoctor = {
            ...selectedDoctor,
            ...doctor,
          }
          setDoctorData(prevData =>
            prevData.map(d => (d.id === selectedDoctor.id ? updatedDoctor : d))
          )
        } else {
          const newDoctor = {
            ...doctor,
            id: doctorData.length ? Math.max(...doctorData.map(d => d.id)) + 1 : 1,
          }
          setDoctorData(prevData => [...prevData, newDoctor])
        }
      } catch (error) {
        console.error('Ошибка при сохранении врача:', error)
      } finally {
        onClose()
      }
    },
    [selectedDoctor, onClose, doctorData]
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
