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
import { NurseType } from '../services'

type Props = {
  isOpen: boolean
  onClose: () => void
  nurse?: NurseType | null
  isEditing: boolean
  onSave: (nurse: Omit<NurseType, 'id'>) => void
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

export const NurseModal = ({ isOpen, onClose, nurse, isEditing, onSave }: Props) => {
  const [formData, setFormData] = useState<Omit<NurseType, 'id'>>({
    name: nurse?.name || '',
    department: nurse?.department || '',
  })

  useEffect(() => {
    if (isOpen && nurse) {
      setFormData({
        name: nurse.name || '',
        department: nurse.department || '',
      })
    } else if (!isOpen) {
      setFormData({
        name: '',
        department: '',
      })
    }
  }, [isOpen, nurse])

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

  const handleSubmit = () => {
    onSave(formData)
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        <h2>{isEditing ? 'Редактировать медсестру' : 'Добавить медсестру'}</h2>
        <TextField
          name="name"
          label="ФИО"
          value={formData.name}
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
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {isEditing ? 'Сохранить изменения' : 'Добавить'}
        </Button>
      </Box>
    </Modal>
  )
}
