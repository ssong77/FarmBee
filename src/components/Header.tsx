import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Box,
  Link,
  Typography,
} from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AccountCircle from '@mui/icons-material/AccountCircle'
import LogoImage from '../assets/images/FarmBee.png'

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

  return (
    <AppBar position="static" color="transparent" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* 로고 */}
        <Box
          onClick={() => navigate('/')}
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          <img src={LogoImage} alt="FarmBee" style={{ height: 40 }} />
        </Box>

        {/* 중앙 네비게이션 */}
        <Box sx={{ display: 'flex', gap: 4 }}>
          {['분석결과', '예약관리', '통계현황'].map((label) => (
            <Typography
              key={label}
              onClick={() => navigate(`/${label}`)}
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

        {/* 우측 로그인/마이페이지 */}
        <Box>
          <Link component={RouterLink} to="/about" underline="none" sx={{ mr: 2 }}>
            About Us
          </Link>
          {isLoggedIn ? (
            <>
              <IconButton aria-label="account" onClick={handleMenuOpen}>
                <AccountCircle />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleMypage}>마이페이지</MenuItem>
                <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
              </Menu>
            </>
          ) : (
            <Button variant="outlined" size="small" onClick={() => navigate('/login')}>
              로그인
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
