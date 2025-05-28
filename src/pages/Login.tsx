import React, { useState } from 'react'
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Paper,
  Box,
  Typography
} from '@mui/material'
import { Visibility, VisibilityOff, Home, Google } from '@mui/icons-material'
import { useNavigate, Link as RouterLink } from 'react-router-dom'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [userid, setUserid] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  // TODO: 백엔드 연동 시 API 호출 로직 추가
  const handleLogin = () => {
    navigate('/')
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
            어서오세요!
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
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              placeholder="At least 12 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1} mb={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                }
                label="로그인 정보 기억"
              />
              <RouterLink to="#" style={{ textDecoration: 'none' }}>
                비밀번호 찾기
              </RouterLink>
            </Box>

            <Button
              type="button"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mb: 2 }}
              onClick={handleLogin}
            >
              Sign in
            </Button>

            <Box display="flex" justifyContent="center" gap={2} mt={1}>
              <IconButton>
                <Google />
              </IconButton>
              <IconButton component={RouterLink} to="/">
                <Home />
              </IconButton>
            </Box>

            <Typography variant="body2" color="text.secondary" mt={3}>
              계정이 없으신가요?{' '}
              <RouterLink
                to="/signup"
                style={{ fontWeight: 'bold', textDecoration: 'underline' }}
              >
                회원가입
              </RouterLink>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
