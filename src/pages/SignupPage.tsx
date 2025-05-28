import React, { useState } from 'react'
import {
  Button,
  Container,
  Paper,
  TextField,
  Box,
  Typography
} from '@mui/material'
import { useNavigate, Link as RouterLink } from 'react-router-dom'

export default function SignupPage() {
  const [userid, setUserid] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const navigate = useNavigate()

  // TODO: 백엔드 연동 시 API 호출 로직 추가
  const handleSignup = () => {
    navigate('/login')
  }

  return (
    <Box
      sx={{
        bgcolor: '#f4f2f7',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 6, textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={600} mb={3}>
            회원가입
          </Typography>

          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              variant="outlined"
              value={userid}
              onChange={(e) => setUserid(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />

            <Button
              type="button"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleSignup}
            >
              Sign up
            </Button>

            <Typography variant="body2" color="text.secondary" mt={3}>
              이미 계정이 있으신가요?{' '}
              <RouterLink
                to="/login"
                style={{ fontWeight: 'bold', textDecoration: 'underline' }}
              >
                로그인
              </RouterLink>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
