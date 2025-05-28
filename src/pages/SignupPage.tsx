// src/pages/SignupPage.tsx
import React, { useState } from 'react'
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

// 약관 목록 예시
const agreements = [
  {
    title: '[필수] 이용약관 동의',
    content: `1. 본 서비스는 회원에게 다양한 농업 솔루션을 제공합니다.\n2. 서비스 이용 중 발생한 문제는 본사 정책에 따라 처리됩니다.\n3. 농작물 생육 정보, 토양 분석 정보, 날씨 데이터 등을 통합 제공하여 사용자에게 한눈에 현황을 파악할 수 있도록 지원합니다.\n4. 사용자가 업로드한 드론 영상을 AI가 자동으로 분석하고, 문제 발생 가능성을 사전에 알려드립니다.\n5. 모바일 및 웹 환경 모두 최적화된 UI/UX로 언제 어디서나 접근이 가능합니다.\n6. 실시간 알림 기능을 통해 이상 징후 발견 시 즉시 통보받을 수 있습니다.\n7. 수집된 데이터는 안전하게 암호화되어 저장되며, GDPR을 준수합니다.\n8. 고객 지원 센터를 통해 24시간 기술 지원을 받을 수 있습니다.\n9. 약관에 동의하지 않으면 일부 기능이 제한될 수 있습니다.\n10. 본 약관은 예고 없이 변경될 수 있으며, 변경 시 공지사항을 통해 안내합니다.`,
  },
  {
    title: '[필수] 개인정보 수집 및 이용 동의',
    content: `1. 회원가입 시 이름, 이메일, 휴대폰 번호를 수집합니다.\n2. 수집된 정보는 서비스 제공을 위해 사용됩니다.\n3. 법적 절차에 따라 보관 기간이 정해집니다.`,
  },
  {
    title: '[선택] 위치 기반 서비스 동의',
    content: `1. 위치 정보를 통해 사용자 주변 농장 데이터를 제공합니다.\n2. 동의 거부 시 일부 기능이 제한될 수 있습니다.`,
  },
]

export default function SignupPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [agreeAll, setAgreeAll] = useState(false)
  const [checked, setChecked] = useState<boolean[]>(agreements.map(() => false))

  // 회원정보 입력 상태
  const [userid, setUserid] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [name, setName] = useState('')
  const [birth, setBirth] = useState('')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [phone, setPhone] = useState('')

  // 휴대폰 인증 동의 & 스낵바 알림
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
    // TODO: 실제 인증 요청 로직
    setSnackbar({ open: true, message: '인증 요청이 전송되었습니다.', severity: 'success' })
  }

  const handleSignup = () => {
    // TODO: 회원가입 API 호출
    navigate('/login')
  }

  const closeSnackbar = () => setSnackbar(s => ({ ...s, open: false }))

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* 1) 고정 헤더 */}
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1200 }}>
        <Header />
        <Divider />
      </Box>

      {/* 2) 본문: 헤더+Divider 영역 분리 */}
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
                {/* 약관 동의 Step */}
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
                      <Typography
                        variant="body2"
                        component="pre"
                        sx={{ whiteSpace: 'pre-wrap', m: 0, color: 'text.secondary' }}
                      >
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
                {/* 회원 정보 입력 Step */}
                <Typography variant="h5" textAlign="center" gutterBottom>
                  회원 정보 입력
                </Typography>
                <TextField
                  fullWidth
                  label="아이디(Email)"
                  margin="normal"
                  value={userid}
                  onChange={e => setUserid(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="비밀번호"
                  type="password"
                  margin="normal"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="비밀번호 확인"
                  type="password"
                  margin="normal"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="이름"
                  margin="normal"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
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
                  <FormControlLabel
                    control={<Checkbox checked={gender === 'male'} onChange={() => setGender('male')} />}
                    label="남자"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={gender === 'female'} onChange={() => setGender('female')} />}
                    label="여자"
                  />
                </Box>

                {/* 휴대폰 인증 */}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 2 }}>
                  <FormControlLabel
                    control={<Checkbox checked={phoneAgree} onChange={e => setPhoneAgree(e.target.checked)} />}
                    label="(필수) 인증 약관 전체 동의"
                  />
                  <Button variant="outlined" onClick={handlePhoneRequest}>
                    인증 요청
                  </Button>
                </Box>

                <TextField
                  fullWidth
                  label="휴대폰 번호"
                  placeholder="예: 010-1234-5678"
                  margin="normal"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                  <Button onClick={handleBack}>뒤로</Button>
                  <Button variant="contained" onClick={handleSignup}>
                    회원가입
                  </Button>
                </Box>
              </>
            )}

            <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
              이미 계정이 있으신가요?{' '}
              <RouterLink to="/login" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                로그인
              </RouterLink>
            </Typography>
          </Paper>
        </Container>
      </Box>

      {/* 알림창 */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
