// src/components/Header.tsx (예시)
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth(); // logout 함수가 있다고 가정

  const handleLogout = () => {
    logout(); // 실제 로그아웃 로직 호출
    navigate('/login');
  };

  return (
    <AppBar
      position="static" // 'sticky'나 'fixed' 대신 'static'으로 변경
      elevation={0} // 그림자 제거 (Paper의 elevation과 동일)
      sx={{
        // 배경색, 투명도, blur 효과 등의 시각적 스타일 제거
        // 기본 Material-UI 앱바 색상을 따르거나, theme에서 설정된 배경색 사용
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit', // Typography의 기본 색상 사용
          }}
        >
          My App
        </Typography>
        <Box>
          {isLoggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
              로그아웃
            </Button>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                로그인
              </Button>
              <Button color="inherit" component={RouterLink} to="/signup" sx={{ ml: 1 }}>
                회원가입
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}