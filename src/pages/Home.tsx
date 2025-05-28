// src/pages/Home.tsx
import React from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Header from '../components/Header'

// 이미지: src/assets/images 에 배치
import droneImage from '../assets/images/drone.jpg'
import reportImage from '../assets/images/report.jpg'

// 더미 차트 데이터
const dummyChartData = [
  { name: '옥수수', 분석결과: 80, 기준치: 60 },
  { name: '벼',     분석결과: 55, 기준치: 50 },
  { name: '콩',     분석결과: 70, 기준치: 65 },
  { name: '밀',     분석결과: 45, 기준치: 40 },
]

// 더미 테이블 데이터
const dummyTableRows = [
  { 항목: '수분함량', 값: '18%' },
  { 항목: '질소농도', 값: '0.8g/kg' },
  { 항목: '인산농도', 값: '0.5g/kg' },
  { 항목: '병해발생', 값: '0건' },
]

export default function Home() {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()

  const handleStart = () => (isLoggedIn ? navigate('/upload') : navigate('/login'))

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#fff',
      }}
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>
        {/* 히어로 영역 */}
        <Container maxWidth="md" sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            FarmBee와 함께하는 스마트 농업
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={4}>
            드론 기반 실시간 작물·토양 분석과 AI 리포트를 즉시 제공합니다
          </Typography>
          <Button variant="contained" size="large" onClick={handleStart}>
            시작하기!
          </Button>
        </Container>

        {/* 카드형 기능 블록 */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  image={droneImage}
                  alt="고해상도 토양 스캔"
                  sx={{ height: 240, objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    고해상도 토양 스캔
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    드론 장비를 이용해 농경지 전역의 토양 수분·영양·병해 상태를 고해상도로 스캔합니다.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  image={reportImage}
                  alt="즉시 생성되는 AI 리포트"
                  sx={{ height: 240, objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    즉시 생성되는 AI 리포트
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    수집된 데이터를 AI가 정밀 분석해 작물별 맞춤 리포트를 즉시 생성·제공합니다.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* 분석 리포트 예시 섹션 */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h5" gutterBottom>
            토양 분석 리포트 예시
          </Typography>
          <Grid container spacing={4}>
            {/* 테이블 */}
            <Grid item xs={12} md={6}>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>항목</TableCell>
                      <TableCell>값</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dummyTableRows.map((row) => (
                      <TableRow key={row.항목}>
                        <TableCell>{row.항목}</TableCell>
                        <TableCell>{row.값}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            {/* 차트 */}
            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                {/* BarChart에 직접 width/height 지정 */}
                <BarChart
                    data={dummyChartData}
                    width={500}
                    height={300}
                    margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <Bar dataKey="분석결과" fill="#1976d2" />
                    <Bar dataKey="기준치" fill="#8884d8" />
                </BarChart>
                </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f0f0f0' }}>
        <Typography variant="body2" color="text.secondary">
          © 2025 FarmBee. All rights reserved.
        </Typography>
      </Box>
    </Box>
  )
}
