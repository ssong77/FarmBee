// src/pages/AdminDashboard.tsx

import {
  Box,
  Container,
  Typography,
  Paper,
 
} from '@mui/material'


// ─── 관리자 전용 메뉴바 ───
// function AdminHeader() {
//   const navigate = useNavigate()
//   return (
//     <Box
//       sx={{
//         bgcolor: 'white',
//         borderBottom: 1,
//         borderColor: 'divider',
//       }}
//     >
//       <Container maxWidth="lg">
//         <Box
//           display="flex"
//           alignItems="center"
//           justifyContent="space-between"
//           py={2}
//         >
//           <Typography
//             variant="h6"
//             sx={{ cursor: 'pointer' }}
//             onClick={() => navigate('/admin')}
//           >
//             Admin Dashboard
//           </Typography>

//           {/* 관리자 이름 + 로그아웃 버튼(예시) */}
//           <Box>
//             <Typography
//               variant="body2"
//               component="span"
//               sx={{ mr: 2, cursor: 'pointer' }}
//             >
//               관리자 아무개
//             </Typography>
//             <Button
//               size="small"
//               onClick={() => {
//                 // 로그아웃 처리 후 로그인 페이지로 이동
//                 navigate('/login')
//               }}
//             >
//               로그아웃
//             </Button>
//           </Box>
//         </Box>

//         {/* 관리자 메뉴 */}
//         <Box display="flex" gap={3} pb={1}>
//           <Typography
//             sx={{
//               cursor: 'pointer',
//               fontWeight: 'bold',
//               '&:hover': { color: 'primary.main' },
//             }}
//             onClick={() => navigate('/admin/users')}
//           >
//             사용자 관리
//           </Typography>
//           <Typography
//             sx={{
//               cursor: 'pointer',
//               fontWeight: 'bold',
//               '&:hover': { color: 'primary.main' },
//             }}
//             onClick={() => navigate('/admin/reservation')}
//           >
//             예약 관리
//           </Typography>
//           <Typography
//             sx={{
//               cursor: 'pointer',
//               fontWeight: 'bold',
//               '&:hover': { color: 'primary.main' },
//             }}
//             onClick={() => navigate('/analysis')}
//           >
//             분석 리포트
//           </Typography>
//           <Typography
//             sx={{
//               cursor: 'pointer',
//               fontWeight: 'bold',
//               '&:hover': { color: 'primary.main' },
//             }}
//             onClick={() => navigate('/statistics')}
//           >
//             통계 관리
//           </Typography>
//           <Typography
//             sx={{
//               cursor: 'pointer',
//               fontWeight: 'bold',
//               '&:hover': { color: 'primary.main' },
//             }}
//             onClick={() => navigate('/admin/settings')}
//           >
//             시스템 설정
//           </Typography>
//         </Box>
//       </Container>
//     </Box>
//   )
// }

export default function AdminDashboard() {
  // 더미 데이터 (목업 이미지 기준)
  const totalUsers = 25
  const todayRequests = { completed: 3, pending: 3 } // 총 6건(완료:3, 대기:3)
  const recentReports = { thisWeek: 15, total: 248 }

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      

      {/* Main Content */}
      <Box component="main" sx={{ mt: 2, pb: 4 }}>
        <Container maxWidth="lg">
          {/* ─── 1) 요약 카드 3개 (Flex Box 사용) ─── */}
          <Box
            display="flex"
            flexWrap="wrap"
            gap={2}
            mb={4}
            sx={{
              '& > .summary-card': {
                flex: '1 1 calc(33.333% - 16px)',
                minWidth: '240px',
              },
            }}
          >
            <Paper
              className="summary-card"
              elevation={3}
              sx={{ p: 2, textAlign: 'center', bgcolor: 'white' }}
            >
              <Typography variant="h6">전체 사용자 수</Typography>
              <Typography variant="h4" color="primary">
                {totalUsers}명
              </Typography>
            </Paper>

            <Paper
              className="summary-card"
              elevation={3}
              sx={{ p: 2, textAlign: 'center', bgcolor: 'white' }}
            >
              <Typography variant="h6">오늘 예약 요청</Typography>
              <Typography variant="h4" color="primary">
                {todayRequests.completed + todayRequests.pending}건
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                mt={1}
              >
                (완료: {todayRequests.completed}건 / 대기:{' '}
                {todayRequests.pending}건)
              </Typography>
            </Paper>

            <Paper
              className="summary-card"
              elevation={3}
              sx={{ p: 2, textAlign: 'center', bgcolor: 'white' }}
            >
              <Typography variant="h6">최근 분석 리포트 수</Typography>
              <Typography variant="h4" color="primary">
                이번주: {recentReports.thisWeek}건
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                mt={1}
              >
                누적: {recentReports.total}건
              </Typography>
            </Paper>
          </Box>

          {/* ─── 2) 미처리 피드백 박스 ─── */}
          <Box>
            <Paper elevation={3} sx={{ p: 2, bgcolor: 'white' }}>
              <Typography variant="h6" gutterBottom>
                미처리 피드백
              </Typography>
              <Typography variant="body1" color="text.secondary">
                • 분석 결과 반영이 느립니다 (처리 예정)
                <br />
                • 예약 취소 기능 미작동 (검토 중)
              </Typography>
            </Paper>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
