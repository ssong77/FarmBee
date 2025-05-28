// src/components/Header.tsx
import React from 'react'
import {
  AppBar,
  Toolbar,
  Button,
  Box
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import LogoImage from '../assets/images/FarmBee.png'

export default function Header() {
  const navigate = useNavigate()

  return (
    <AppBar position="static" color="transparent" elevation={3}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* 로고 클릭하면 홈으로 */}
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <img
            src={LogoImage}
            alt="FarmBee 로고"
            style={{ height: 40, marginRight: 8 }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Home 버튼 */}
          <Button
            variant="text"
            onClick={() => navigate('/')}
            sx={{ textTransform: 'none', mr: 2 }}
          >
            Home
          </Button>

          {/* 실습하기 버튼 (나중에 /upload 추가) */}
          <Button
            variant="text"
            onClick={() => navigate('/upload')}
            sx={{ textTransform: 'none', mr: 2 }}
          >
            실습하기
          </Button>

          {/* 로그인 버튼 (항상 보임) */}
          <Button
            variant="outlined"
            size="small"
            onClick={() => navigate('/login')}
            sx={{ textTransform: 'none' }}
          >
            로그인
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
