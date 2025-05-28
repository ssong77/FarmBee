import React from 'react';
import { Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';



function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #dbeafe, #93c5fd, #bfdbfe)',
      }}
    >
      <Header />

      <Container maxWidth="md" sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          여러분들의 문서 도우미!
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={4}>
          다양한 문서들을 쉽게 작성할 수 있도록 도와드립니다
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            if (isLoggedIn) {
              navigate('/upload');
            } else {
              navigate('/login'); // ✅ 로그인 안한 경우 Login 페이지로 이동
            }
          }}
        >
          시작하기!
        </Button>
      </Container>

      

      
      

      
    </Box>
  );
}

export default Home;
