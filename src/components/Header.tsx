import { Box, AppBar, Toolbar, IconButton, Button, Menu, MenuItem, Link, Typography } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
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

  const navItems = ['분석결과', '예약관리', '통계현황'] as const

  return (
    <AppBar position="static" color="transparent" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box onClick={() => navigate('/')} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <img src={LogoImage} alt="FarmBee" style={{ height: 40 }} />
        </Box>

        <Box sx={{ display: 'flex', gap: 4 }}>
          {navItems.map((label) => (
            <Typography
              key={label}
              onClick={() => navigate(`/${label}`)}
              sx={{ cursor: 'pointer', fontWeight: 500, color: 'text.primary', '&:hover': { color: 'primary.main' } }}
            >
              {label}
            </Typography>
          ))}
        </Box>

        <Box>
          <Link component={RouterLink} to="/about" underline="none" sx={{ mr: 2 }}>
            About Us
          </Link>
          {isLoggedIn ? (
            <>
              <IconButton onClick={handleMenuOpen}>
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
