// src/pages/AdminStatisticsPage.tsx

import  { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

interface BarData {
  item: string;
  count: number;
}

interface LineData {
  date: string;
  value: number;
}

export default function AdminStatisticsPage() {
  // 기간 필터: 시작일, 종료일
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  // 구역 선택 필터
  const [region, setRegion] = useState<string>('');

  // 예시용 더미 데이터 (실제로는 API 호출 후 상태에 저장)
  const rawBarData: BarData[] = [
    { item: '수분', count: 40 },
    { item: '질소', count: 25 },
    { item: '병해', count: 15 },
    { item: '기타', count: 10 },
  ];
  const rawLineData: LineData[] = [
    { date: '05/01', value: 3 },
    { date: '05/02', value: 5 },
    { date: '05/03', value: 4 },
    { date: '05/04', value: 6 },
    { date: '05/05', value: 2 },
  ];
  const totalReports = 128;
  const diseaseRatio = '17%';
  const moistureRatio = '32%';

  // 필터가 적용된 데이터 (예시에서는 필터 로직만 구현)
  const filteredBarData = useMemo(() => {
    // 실제로는 startDate, endDate, region에 따라 API 호출하거나 필터링
    return rawBarData;
  }, [startDate, endDate, region]);

  const filteredLineData = useMemo(() => {
    return rawLineData;
  }, [startDate, endDate, region]);

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ pt: 4, pb: 6 }}>
        {/* 페이지 제목 */}
        <Typography variant="h5" gutterBottom>
          통계 관리
        </Typography>

        {/* 필터 바: 기간 선택 / 구역 선택 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 3,
            flexWrap: 'wrap',
          }}
        >
          {/* 시작일 */}
          <TextField
            size="small"
            type="date"
            variant="outlined"
            label="시작일"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          {/* 종료일 */}
          <TextField
            size="small"
            type="date"
            variant="outlined"
            label="종료일"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          {/* 구역 선택 */}
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>구역 선택</InputLabel>
            <Select
              value={region}
              label="구역 선택"
              onChange={(e) => setRegion(e.target.value)}
            >
              <MenuItem value="">전체</MenuItem>
              <MenuItem value="충북 옥천군">충북 옥천군</MenuItem>
              <MenuItem value="충북 청주시">충북 청주시</MenuItem>
              <MenuItem value="경남 창원시">경남 창원시</MenuItem>
              <MenuItem value="경북 구미시">경북 구미시</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* 항목별 분석 건수 (막대 그래프) */}
        <Paper elevation={2} sx={{ mb: 4, p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            항목별 분석 건수
          </Typography>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={filteredBarData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="item" />
              <YAxis />
              <ReTooltip />
              <Legend />
              <Bar dataKey="count" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        {/* 구역별 분석 추이 (라인 그래프) */}
        <Paper elevation={2} sx={{ mb: 4, p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            구역별 분석 추이
          </Typography>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={filteredLineData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ReTooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#388e3c" dot />
            </LineChart>
          </ResponsiveContainer>
        </Paper>

        {/* 요약 통계표 */}
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            요약 통계표
          </Typography>
          <Typography variant="body2" gutterBottom>
            • 총 분석 리포트 수: {totalReports}건
          </Typography>
          <Typography variant="body2" gutterBottom>
            • 병해 감지 비율: {diseaseRatio}
          </Typography>
          <Typography variant="body2" gutterBottom>
            • 수분 부족 비율: {moistureRatio}
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
