import { Button, Container, Typography } from '@mui/material'
import { Page404 } from '../../assets'
import { useNavigate } from 'react-router-dom'

export const PageNotFound = () => {
  const navigate = useNavigate()

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 14 }}>
      <Page404 />
      <div>
        <Typography variant="body1" sx={{ mt: 4, textAlign: 'center' }}>
          Sorry! Page not found!
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')} sx={{ mt: 3 }}>
          Back to home page
        </Button>
      </div>
    </Container>
  )
}
