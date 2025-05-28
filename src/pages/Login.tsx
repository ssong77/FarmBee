import { useState } from 'react'
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Button,
  Snackbar,
  Alert,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Header from '../components/Header'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [userid, setUserid] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertInfo, setAlertInfo] = useState<{ severity: 'success' | 'error'; message: string }>({
    severity: 'success',
    message: '',
  })

  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = () => {
    if (userid === '1234' && password === '1234') {
      login(userid)
      setAlertInfo({ severity: 'success', message: '로그인 성공!' })
      setAlertOpen(true)
      setTimeout(() => navigate('/'), 1000)
    } else {
      setAlertInfo({ severity: 'error', message: '아이디 또는 비밀번호가 올바르지 않습니다.' })
      setAlertOpen(true)
    }
  }

  return (
    <>
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1200 }}>
        <Header />
      </Box>
      <Box
        sx={{
          pt: '64px',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#f9f9f9',
        }}
      >
        <Container maxWidth="xs">
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" mb={3}>
              어서오세요!
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="User ID"
              value={userid}
              onChange={(e) => setUserid(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((s) => !s)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
              <FormControlLabel
                control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                label="로그인 정보 기억"
              />
              <RouterLink to="#" style={{ textDecoration: 'none' }}>
                비밀번호 찾기
              </RouterLink>
            </Box>
            <Button variant="contained" fullWidth size="large" onClick={handleLogin}>
              Sign in
            </Button>
            <Typography variant="body2" color="text.secondary" mt={2}>
              계정이 없으신가요?{' '}
              <RouterLink to="/signup" style={{ textDecoration: 'underline' }}>
                회원가입
              </RouterLink>
            </Typography>
          </Paper>
        </Container>
      </Box>
      <Snackbar
        open={alertOpen}
        autoHideDuration={2000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={alertInfo.severity} onClose={() => setAlertOpen(false)} sx={{ width: '100%' }}>
          {alertInfo.message}
        </Alert>
      </Snackbar>
    </>
  )
}
