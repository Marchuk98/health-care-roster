import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { PATH } from '../../app/routes/route-path.ts'

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Медучреждение
        </Typography>
        <Button color="inherit" component={Link} to={PATH.DOCTORS}>
          Врачи
        </Button>
        <Button color="inherit" component={Link} to={PATH.NURSES}>
          Медсестры
        </Button>
      </Toolbar>
    </AppBar>
  )
}
