// src/pages/SignupPage.tsx
import { useState } from 'react'
import {
  Box,
  Container,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Stepper,
  Step,
  StepLabel,
  Divider,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import Header from '../components/Header'

const steps = ['약관 동의', '회원 정보 입력']

const agreements = [
  {
    title: '[필수] 이용약관 동의',
    content: `1. 본 서비스는 회원에게 다양한 농업 솔루션을 제공합니다.\n2. 서비스 이용 중 발생한 문제는 본사 정책에 따라 처리됩니다.\n3. 농작물 생육 정보, 토양 분석 정보, 날씨 데이터 등을 통합 제공합니다.\n4. 모바일 및 웹 환경 모두 최적화된 UI/UX로 제공됩니다.\n5. 약관에 동의하지 않으면 일부 기능이 제한될 수 있습니다.`,
  },
  {
    title: '[필수] 개인정보 수집 및 이용 동의',
    content: `1. 회원가입 시 이름, 이메일, 휴대폰 번호를 수집합니다.\n2. 수집된 정보는 서비스 제공을 위해 사용됩니다.\n3. 법적 절차에 따라 보관 기간이 정해집니다.`,
  },
  {
    title: '[선택] 위치 기반 서비스 동의',
    content: `1. 위치 정보를 통해 주변 농장 데이터를 제공합니다.\n2. 동의 거부 시 일부 기능이 제한될 수 있습니다.`,
  },
]

export default function SignupPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [agreeAll, setAgreeAll] = useState(false)
  const [checked, setChecked] = useState<boolean[]>(agreements.map(() => false))

  const [userid, setUserid] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [name, setName] = useState('')
  const [birth, setBirth] = useState('')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [phone, setPhone] = useState('')
  const [phoneAgree, setPhoneAgree] = useState(false)

  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  })

  const navigate = useNavigate()

  const handleAgreeAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.checked
    setAgreeAll(v)
    setChecked(agreements.map(() => v))
  }
  const handleToggle = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = [...checked]
    newChecked[idx] = e.target.checked
    setChecked(newChecked)
    setAgreeAll(newChecked.every(Boolean))
  }
  const handleNext = () => {
    if (!checked[0] || !checked[1]) {
      alert('필수 약관에 모두 동의해 주세요.')
      return
    }
    setActiveStep(1)
  }
  const handleBack = () => setActiveStep(0)

  const handlePhoneRequest = () => {
    if (!phoneAgree) {
      setSnackbar({ open: true, message: '인증 약관에 동의해주세요.', severity: 'error' })
      return
    }
    setSnackbar({ open: true, message: '인증 요청이 전송되었습니다.', severity: 'success' })
  }

  const handleSignup = () => {
    navigate('/login')
  }
  const closeSnackbar = () => setSnackbar(s => ({ ...s, open: false }))

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1200 }}>
        <Header />
        <Divider />
      </Box>
      <Box
        component="main"
        sx={{
          pt: '65px',
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          bgcolor: '#f5f5f5',
          pb: 4,
        }}
      >
        <Container maxWidth="sm">
          <Paper sx={{ mt: 2, p: 3 }}>
            <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === 0 ? (
              <>
                <FormControlLabel
                  control={<Checkbox checked={agreeAll} onChange={handleAgreeAll} />}
                  label="① 전체 동의하기"
                  sx={{ fontWeight: 'bold' }}
                />
                <Divider sx={{ my: 2 }} />

                {agreements.map((agr, idx) => (
                  <Box key={agr.title} sx={{ mb: 2 }}>
                    <FormControlLabel
                      control={<Checkbox checked={checked[idx]} onChange={handleToggle(idx)} />}
                      label={`${idx + 2}. ${agr.title}`}
                      sx={{ alignItems: 'flex-start' }}
                    />
                    <Box
                      sx={{
                        maxHeight: 120,
                        overflowY: 'auto',
                        bgcolor: '#fafafa',
                        border: '1px solid #ddd',
                        borderRadius: 1,
                        p: 1,
                        ml: 6,
                      }}
                    >
                      <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', m: 0 }}>
                        {agr.content}
                      </Typography>
                    </Box>
                  </Box>
                ))}

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                  <Button disabled>뒤로</Button>
                  <Button variant="contained" onClick={handleNext}>
                    다음
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Typography variant="h5" textAlign="center" gutterBottom>
                  회원 정보 입력
                </Typography>
                <TextField fullWidth label="아이디(Email)" margin="normal" value={userid} onChange={e => setUserid(e.target.value)} />
                <TextField fullWidth label="비밀번호" type="password" margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
                <TextField fullWidth label="비밀번호 확인" type="password" margin="normal" value={confirm} onChange={e => setConfirm(e.target.value)} />
                <TextField fullWidth label="이름" margin="normal" value={name} onChange={e => setName(e.target.value)} />
                <TextField
                  fullWidth
                  label="생년월일"
                  type="date"
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  value={birth}
                  onChange={e => setBirth(e.target.value)}
                />
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                  <FormControlLabel control={<Checkbox checked={gender === 'male'} onChange={() => setGender('male')} />} label="남자" />
                  <FormControlLabel control={<Checkbox checked={gender === 'female'} onChange={() => setGender('female')} />} label="여자" />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 2 }}>
                  <FormControlLabel control={<Checkbox checked={phoneAgree} onChange={e => setPhoneAgree(e.target.checked)} />} label="(필수) 인증 약관 전체 동의" />
                  <Button variant="outlined" onClick={handlePhoneRequest}>
                    인증 요청
                  </Button>
                </Box>

                <TextField fullWidth label="휴대폰 번호" placeholder="예: 010-1234-5678" margin="normal" value={phone} onChange={e => setPhone(e.target.value)} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                  <Button onClick={handleBack}>뒤로</Button>
                  <Button variant="contained" onClick={handleSignup}>
                    회원가입
                  </Button>
                </Box>
              </>
            )}

            <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
              이미 계정이 있으신가요? <RouterLink to="/login" style={{ textDecoration: 'underline' }}>로그인</RouterLink>
            </Typography>
          </Paper>
        </Container>
      </Box>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
