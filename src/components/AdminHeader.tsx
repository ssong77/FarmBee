// src/components/AdminHeader.tsx


import { Box, Container, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function AdminHeader() {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        bgcolor: 'white',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        {/* ── 상단: 관리자 이름 + 로그아웃 버튼 ── */}
        <Box display="flex" alignItems="center" justifyContent="space-between" py={1}>
          <Typography
            variant="body1"
            component="span"
            sx={{ cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => navigate('/admin')}
          >
            관리자 아무개
          </Typography>
          <Button size="small" onClick={() => navigate('/login')}>
            로그아웃
          </Button>
        </Box>

        {/* ── 메뉴바: 사용자 관리 / 예약 관리 / 분석 리포트 / 통계 관리 / 시스템 설정 ── */}
        <Box display="flex" gap={3} pb={1}>
          <Typography
            sx={{
              cursor: 'pointer',
              fontWeight: 'bold',
              '&:hover': { color: 'primary.main' },
            }}
            onClick={() => navigate('/admin/users')}
          >
            사용자 관리
          </Typography>
          <Typography
            sx={{
              cursor: 'pointer',
              fontWeight: 'bold',
              '&:hover': { color: 'primary.main' },
            }}
            onClick={() => navigate('/admin/reservations')}
          >
            예약 관리
          </Typography>
          <Typography
            sx={{
              cursor: 'pointer',
              fontWeight: 'bold',
              '&:hover': { color: 'primary.main' },
            }}
            onClick={() => navigate('/admin/analysis-reports')}
          >
            분석 리포트
          </Typography>
          <Typography
            sx={{
              cursor: 'pointer',
              fontWeight: 'bold',
              '&:hover': { color: 'primary.main' },
            }}
            onClick={() => navigate('/admin/statistics')}
          >
            통계 관리
          </Typography>
          <Typography
            sx={{
              cursor: 'pointer',
              fontWeight: 'bold',
              '&:hover': { color: 'primary.main' },
            }}
            onClick={() => navigate('/admin/settings')}
          >
            시스템 설정
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
