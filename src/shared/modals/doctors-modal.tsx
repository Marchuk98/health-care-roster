import React, { useState, useEffect } from 'react'
import {
  Button,
  Modal,
  TextField,
  FormControl,
  Select,
  SelectChangeEvent,
  MenuItem,
  Box,
  InputLabel,
} from '@mui/material'
import { DoctorType } from '../services'

type Props = {
  isOpen: boolean
  onClose: () => void
  doctor?: DoctorType | null
  isEditing: boolean
  onSave: (doctor: Omit<DoctorType, 'id'>) => Promise<void>
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}

export const DoctorsModal = ({ isOpen, onClose, doctor, isEditing, onSave }: Props) => {
  const [formData, setFormData] = useState<Omit<DoctorType, 'id'>>({
    fullname: doctor?.fullname || '',
    department: doctor?.department || '',
    isChief: doctor?.isChief || false,
  })

  useEffect(() => {
    if (isOpen && doctor) {
      setFormData({
        fullname: doctor.fullname || '',
        department: doctor.department || '',
        isChief: doctor.isChief || false,
      })
    } else {
      setFormData({
        fullname: '',
        department: '',
        isChief: false,
      })
    }
  }, [isOpen, doctor])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target
    if (name) {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleIsChiefChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target
    setFormData(prev => ({ ...prev, isChief: value === 'Да' }))
  }

  const handleSubmit = () => {
    if (!formData.fullname.trim() || !formData.department.trim()) {
      return
    }

    onSave(formData)
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        <h2>{isEditing ? 'Редактировать врача' : 'Добавить врача'}</h2>
        <TextField
          name="fullname"
          label="ФИО"
          value={formData.fullname}
          onChange={handleInputChange}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Выберите отделение</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData.department}
            label="Выберите отделение"
            name={'department'}
            onChange={handleSelectChange}
          >
            <MenuItem value="Кардиологическое">Кардиологическое</MenuItem>
            <MenuItem value="Хирургическое">Хирургическое</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Заведующий</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="isChief"
            label="Заведующий"
            value={formData.isChief ? 'Да' : 'Нет'}
            onChange={handleIsChiefChange}
          >
            <MenuItem value="Да">Да</MenuItem>
            <MenuItem value="Нет">Нет</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {isEditing ? 'Сохранить изменения' : 'Добавить'}
        </Button>
      </Box>
    </Modal>
  )
}
