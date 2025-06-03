// src/components/Header.tsx

import { Box, AppBar, Toolbar, IconButton, Button, Menu, MenuItem, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { useAuth } from '../contexts/AuthContext'
import LogoImage from '../assets/images/FarmBee.png'
import { useState } from 'react'

export default function Header() {
  const navigate = useNavigate()
  const { isLoggedIn, logout } = useAuth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)
  const handleLogout = () => {
    logout()
    handleMenuClose()
    navigate('/')
  }
  const handleMypage = () => {
    handleMenuClose()
    navigate('/mypage')
  }

  // 네비게이션 메뉴 항목 정의 (레이블과 경로)
  const navItems = [
    { label: '분석관리', path: '/analysis' },
    { label: '예약관리', path: '/reservation' },
    { label: '통계현황', path: '/statistics' },
  ] as const

  // 각 메뉴 클릭 시 호출되는 함수
  const handleNavClick = (path: string) => {
    if (!isLoggedIn) {
      alert('로그인을 해주세요!')
      navigate('/login')
    } else {
      navigate(path)
    }
  }

  return (
    <AppBar position="static" color="transparent" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* 로고 클릭 시 홈으로 이동 */}
        <Box
          onClick={() => navigate('/')}
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          <img src={LogoImage} alt="FarmBee" style={{ height: 40 }} />
        </Box>

        {/* 네비게이션 메뉴 */}
        <Box sx={{ display: 'flex', gap: 4 }}>
          {navItems.map(({ label, path }) => (
            <Typography
              key={path}
              onClick={() => handleNavClick(path)}
              sx={{
                cursor: 'pointer',
                fontWeight: 500,
                color: 'text.primary',
                '&:hover': { color: 'primary.main' },
              }}
            >
              {label}
            </Typography>
          ))}
        </Box>

        {/* 로그인/회원 아이콘 및 메뉴 */}
        <Box>
          {isLoggedIn ? (
            <>
              <IconButton onClick={handleMenuOpen}>
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMypage}>마이페이지</MenuItem>
                <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="outlined"
              size="small"
              onClick={() => navigate('/login')}
            >
              로그인
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
