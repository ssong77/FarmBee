import React, { useState } from 'react';
import { Button, Container, Paper, TextField, Box, Typography } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

export default function SignupPage() {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigate = useNavigate();

  // TODO: 백엔드 연동 시 API 호출 로직 추가
  const handleSignup = () => {
    navigate('/login');
  };

  return (
    <Box
      sx={{
        // 배경색, 최소 높이, 정렬 스타일 제거
        minHeight: '100vh', // 최소 높이는 유지
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0} // 그림자 제거
          sx={{
            p: 3, // 패딩을 Material-UI 기본값으로 줄임 (원래는 6)
            textAlign: 'center',
            // 배경색은 Paper의 기본 배경색이 흰색이므로 제거
            // border-radius는 Material-UI theme에서 관리되므로 제거
          }}
        >
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
              <RouterLink to="/login" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                로그인
              </RouterLink>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}