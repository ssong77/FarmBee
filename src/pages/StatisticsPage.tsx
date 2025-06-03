// src/pages/StatisticsPage.tsx
import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import Header from '../components/Header'

// Recharts 컴포넌트들
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  LineChart,
  Line,
  Legend,
} from 'recharts'

interface BarData {
  name: string
  count: number
}
interface LineData {
  date: string
  value: number
}

export default function StatisticsPage() {
  // ─── (1) 필터 상태 ───
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [region, setRegion] = useState<string>('')
  const [analysisItem, setAnalysisItem] = useState<string>('')

  // ─── (2) 차트용 더미 데이터 ───
  // (2-1) 항목별 분석 비율 (BarChart)
  const barData: BarData[] = [
    { name: '병해 감지', count: 4 },
    { name: '수분 부족', count: 7 },
    { name: '적정 상태', count: 10 },
    { name: '질소 과다', count: 3 },
  ]

  // (2-2) 주간 분석 추이 (LineChart)
  const lineData: LineData[] = [
    { date: '05/01', value: 3 },
    { date: '05/02', value: 5 },
    { date: '05/03', value: 4 },
    { date: '05/04', value: 6 },
    { date: '05/05', value: 2 },
  ]

  // ─── (3) 분석 결과 요약용 더미 데이터 ───
  const totalCount = 21
  const diseaseCount = 4        // 병해 감지 건수
  const waterShortCount = 7     // 수분 부족 건수
  const properCount = 10        // 적정 상태 건수

  // 비율 계산 함수
  const percentage = (part: number, total: number) =>
    total > 0 ? Math.round((part / total) * 100) : 0

  // ─── (4) “필터 적용” 버튼 클릭 핸들러 (더미) ───
  const handleApplyFilter = () => {
    // 실제 API 호출 등을 여기에 구현
    console.log({
      startDate,
      endDate,
      region,
      analysisItem,
    })
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f9f9f9' }}>
      {/* 1) Header */}
      <Header />

      {/* 2) Main Content */}
      <Box component="main" sx={{ mt: '64px', flexGrow: 1, py: 4 }}>
        <Container maxWidth="lg">
          {/* ── (1) 상단 필터 영역 ── */}
          <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
              {/* 기간 선택: 시작일 */}
              <TextField
                label="시작일"
                type="date"
                size="small"
                InputLabelProps={{ shrink: true }}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />

              {/* 기간 선택: 종료일 */}
              <TextField
                label="종료일"
                type="date"
                size="small"
                InputLabelProps={{ shrink: true }}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />

              {/* 구역 선택 */}
              <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel>구역 선택</InputLabel>
                <Select
                  value={region}
                  label="구역 선택"
                  onChange={(e) => setRegion(e.target.value)}
                >
                  <MenuItem value="">전체</MenuItem>
                  <MenuItem value="충북 옥천군">충북 옥천군</MenuItem>
                  <MenuItem value="경기 평택시">경기 평택시</MenuItem>
                  <MenuItem value="충북 청주시">충북 청주시</MenuItem>
                  <MenuItem value="대전 유성구">대전 유성구</MenuItem>
                  {/* 필요시 항목 추가 */}
                </Select>
              </FormControl>

              {/* 분석 항목 선택 */}
              <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel>분석 항목</InputLabel>
                <Select
                  value={analysisItem}
                  label="분석 항목"
                  onChange={(e) => setAnalysisItem(e.target.value)}
                >
                  <MenuItem value="">전체</MenuItem>
                  <MenuItem value="병해 감지">병해 감지</MenuItem>
                  <MenuItem value="수분 측정">수분 측정</MenuItem>
                  <MenuItem value="작물 상태">작물 상태</MenuItem>
                  <MenuItem value="질소/인산/칼륨">질소/인산/칼륨</MenuItem>
                  {/* 필요시 항목 추가 */}
                </Select>
              </FormControl>

              {/* 필터 적용 버튼 */}
              <Button variant="contained" onClick={handleApplyFilter}>
                적용
              </Button>
            </Box>
          </Paper>

          {/* ── (2) 차트 영역 ── */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 4 }}>
            {/* (2-1) 항목별 분석 비율 (BarChart) */}
            <Paper elevation={3} sx={{ p: 2, flex: '1 1 500px', height: 300 }}>
              <Typography variant="subtitle1" gutterBottom>
                항목별 분석 비율 (막대 그래프)
              </Typography>
              <Box sx={{ width: '100%', height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} />
                    <ReTooltip />
                    <Bar dataKey="count" fill="#1976d2" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Paper>

            {/* (2-2) 주간 분석 추이 (LineChart) */}
            <Paper elevation={3} sx={{ p: 2, flex: '1 1 500px', height: 300 }}>
              <Typography variant="subtitle1" gutterBottom>
                주간 분석 추이 (라인 그래프)
              </Typography>
              <Box sx={{ width: '100%', height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} />
                    <ReTooltip />
                    <Legend verticalAlign="top" height={36} />
                    <Line type="monotone" dataKey="value" stroke="#388e3c" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Box>

          {/* ── (3) 분석 결과 요약 ── */}
          <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
            <Typography variant="subtitle1" gutterBottom>
              분석 결과 요약
            </Typography>
            <Divider />

            <List dense>
              <ListItem>
                <ListItemText
                  primary={`전체 분석 건수: ${totalCount}건`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`병해 감지: ${diseaseCount}건 (${percentage(diseaseCount, totalCount)}%)`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`수분 부족: ${waterShortCount}건 (${percentage(waterShortCount, totalCount)}%)`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`적정 상태: ${properCount}건 (${percentage(properCount, totalCount)}%)`}
                />
              </ListItem>
            </List>
          </Paper>
        </Container>
      </Box>
    </Box>
  )
}
