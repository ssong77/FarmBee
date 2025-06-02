// src/pages/Login.tsx
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
  const [alertInfo, setAlertInfo] = useState<{
    severity: 'success' | 'error'
    message: string
  }>({
    severity: 'success',
    message: '',
  })

  const navigate = useNavigate()
  const { login } = useAuth()

  // 비밀번호 찾기 모달 상태
  const [openForgotDialog, setOpenForgotDialog] = useState(false)
  const [forgotInput, setForgotInput] = useState('')

  // 일반 로그인/관리자 로그인 구분
  const handleLogin = () => {
    if (userid === '1' && password === '1') {
      // 관리자 로그인
      login(userid) // 필요 시 token 등 저장
      setAlertInfo({ severity: 'success', message: '관리자 로그인 성공!' })
      setAlertOpen(true)
      setTimeout(() => navigate('/admin'), 1000)
    } else if (userid === '1234' && password === '1234') {
      // 일반 사용자 로그인
      login(userid)
      setAlertInfo({ severity: 'success', message: '로그인 성공!' })
      setAlertOpen(true)
      setTimeout(() => navigate('/'), 1000)
    } else {
      setAlertInfo({
        severity: 'error',
        message: '아이디 또는 비밀번호가 올바르지 않습니다.',
      })
      setAlertOpen(true)
    }
  }

  // 비밀번호 찾기 다이얼로그 열기/닫기
  const handleOpenForgotDialog = () => {
    setForgotInput('')
    setOpenForgotDialog(true)
  }
  const handleCloseForgotDialog = () => {
    setOpenForgotDialog(false)
  }

  // 비밀번호 찾기 제출 (더미 로직)
  const handleSubmitForgot = () => {
    if (forgotInput.trim() === '') {
      setAlertInfo({ severity: 'error', message: '아이디 또는 이메일을 입력하세요.' })
      setAlertOpen(true)
      return
    }
    // 실제로는 서버 API 호출하여 메일 전송 등
    setAlertInfo({
      severity: 'success',
      message: `'${forgotInput}'(으)로 비밀번호 재설정 메일을 전송했습니다.`,
    })
    setAlertOpen(true)
    setOpenForgotDialog(false)
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
                    <IconButton
                      onClick={() => setShowPassword((s) => !s)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              my={2}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                }
                label="로그인 정보 기억"
              />
              <Typography
                variant="body2"
                sx={{
                  cursor: 'pointer',
                  color: 'primary.main',
                  '&:hover': { textDecoration: 'underline' },
                }}
                onClick={handleOpenForgotDialog}
              >
                비밀번호 찾기
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleLogin}
            >
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

      {/* Snackbar 알림 */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={alertInfo.severity}
          onClose={() => setAlertOpen(false)}
          sx={{ width: '100%' }}
        >
          {alertInfo.message}
        </Alert>
      </Snackbar>

      {/* 비밀번호 찾기 모달 */}
      <Dialog
        open={openForgotDialog}
        onClose={handleCloseForgotDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>비밀번호 찾기</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" color="text.secondary" mb={2}>
            등록하신 아이디 또는 이메일 주소를 입력하시면, 비밀번호 재설정 링크를
            보내드립니다.
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="아이디 또는 이메일"
            value={forgotInput}
            onChange={(e) => setForgotInput(e.target.value)}
            placeholder="예: user@example.com"
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            color="error"
            variant="contained"
            onClick={handleCloseForgotDialog}
          >
            취소
          </Button>
          <Box sx={{ flex: 1 }} />
          <Button variant="contained" onClick={handleSubmitForgot}>
            전송
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
