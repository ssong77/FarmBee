// src/pages/Home.tsx
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Paper,
  // Grid, // 더 이상 Grid를 사용하지 않으므로 주석 처리하거나 제거합니다.
} from '@mui/material'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts'

import Header from '../components/Header'
import droneImage from '../assets/images/drone.jpg'
import reportImage from '../assets/images/report.jpg'

const dummyChartData = [
  { name: '옥수수', 분석결과: 80, 기준치: 60 },
  { name: '벼', 분석결과: 55, 기준치: 50 },
  { name: '콩', 분석결과: 70, 기준치: 65 },
  { name: '밀', 분석결과: 45, 기준치: 40 },
]

const dummyTableRows = [
  { 항목: '수분함량', 값: '18%' },
  { 항목: '질소농도', 값: '0.8g/kg' },
  { 항목: '인산농도', 값: '0.5g/kg' },
  { 항목: '병해발생', 값: '0건' },
]

export default function Home() {

  //const handleStart = () => (isLoggedIn ? navigate('/upload') : navigate('/login'))

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#fff',
      }}
    >
      <Header />

      <Box sx={{ flexGrow: 1 }}>
        {/* 히어로 영역 */}
        <Container maxWidth="md" sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            FarmBee와 함께하는 스마트 농업
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={4}>
            드론 기반 실시간 작물·토양 분석과 AI 리포트를 즉시 제공합니다
          </Typography>
          
        </Container>

        {/* 카드형 기능 블록 */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Grid container 대신 Box with Flexbox */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap', // 아이템들이 다음 줄로 넘어가도록 설정
              gap: 4, // 아이템들 사이의 간격 (Grid의 spacing과 유사)
              justifyContent: 'center', // 아이템이 1개일 때 중앙 정렬 (선택 사항)
            }}
          >
            {/* 첫 번째 카드 블록 */}
            {/* Grid item 대신 Box with responsive width */}
            <Box sx={{
              width: { xs: '100%', md: 'calc(50% - 16px)' }, // 50% 너비 - gap의 절반 (4px * 4 = 16px)
              flexGrow: 1, // 남은 공간을 채우도록 성장
              minWidth: { xs: 'auto', md: '400px' } // 최소 너비 설정, 너무 작아지지 않게
            }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  image={droneImage}
                  alt="토양 스캔"
                  sx={{ height: 240, objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6">고해상도 토양 스캔</Typography>
                  <Typography variant="body2" color="text.secondary">
                    드론 장비를 이용해 토양 상태를 고해상도로 스캔합니다.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            {/* 두 번째 카드 블록 */}
            {/* Grid item 대신 Box with responsive width */}
            <Box sx={{
              width: { xs: '100%', md: 'calc(50% - 16px)' }, // 50% 너비 - gap의 절반
              flexGrow: 1,
              minWidth: { xs: 'auto', md: '400px' }
            }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  image={reportImage}
                  alt="AI 리포트"
                  sx={{ height: 240, objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6">즉시 생성되는 AI 리포트</Typography>
                  <Typography variant="body2" color="text.secondary">
                    수집된 데이터를 AI가 정밀 분석해 리포트를 제공합니다.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Container>

        {/* 분석 예시 */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h5" mb={2}>
            토양 분석 리포트 예시
          </Typography>
          {/* Grid container 대신 Box with Flexbox */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap', // 아이템들이 다음 줄로 넘어가도록 설정
              gap: 4, // 아이템들 사이의 간격
              justifyContent: 'center', // 아이템이 1개일 때 중앙 정렬 (선택 사항)
            }}
          >
            {/* 테이블 블록 */}
            {/* Grid item 대신 Box with responsive width */}
            <Box sx={{
              width: { xs: '100%', md: 'calc(50% - 16px)' }, // 50% 너비 - gap의 절반
              flexGrow: 1,
              minWidth: { xs: 'auto', md: '400px' }
            }}>
              <Paper sx={{ p: 2 }}>
                <Box
                  component="table"
                  sx={{ width: '100%', borderCollapse: 'collapse' }}
                >
                  <Box component="thead">
                    <Box component="tr">
                      <Box
                        component="th"
                        sx={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}
                      >
                        항목
                      </Box>
                      <Box
                        component="th"
                        sx={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}
                      >
                        값
                      </Box>
                    </Box>
                  </Box>
                  <Box component="tbody">
                    {dummyTableRows.map((row) => (
                      <Box component="tr" key={row.항목}>
                        <Box component="td" sx={{ py: 1 }}>
                          {row.항목}
                        </Box>
                        <Box component="td" sx={{ py: 1 }}>
                          {row.값}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Paper>
            </Box>
            {/* 차트 블록 */}
            {/* Grid item 대신 Box with responsive width */}
            <Box sx={{
              width: { xs: '100%', md: 'calc(50% - 16px)' }, // 50% 너비 - gap의 절반
              flexGrow: 1,
              minWidth: { xs: 'auto', md: '400px' }
            }}>
              <Paper sx={{ p: 2 }}>
                <BarChart
                  width={500}
                  height={300}
                  data={dummyChartData}
                  margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="분석결과" fill="#1976d2" />
                  <Bar dataKey="기준치" fill="#8884d8" />
                </BarChart>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box component="footer" sx={{ textAlign: 'center', p: 2, bgcolor: '#f0f0f0' }}>
        <Typography variant="body2" color="text.secondary">
          © 2025 FarmBee. All rights reserved.
        </Typography>
      </Box>
    </Box>
  )
}