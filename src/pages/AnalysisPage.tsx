// src/pages/AnalysisPage.tsx
import React, { useState } from 'react'
import jsPDF from 'jspdf'
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Menu,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  Pagination,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Header from '../components/Header'

// ▶▶▶ (Recharts 컴포넌트 import) ◀◀◀
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

// --- 더미 데이터 ---
const todaySchedule = {
  date: '2025-05-07 (오늘)',
  area: '충북 옥천군 동이면 23-1번지',
  time: '10:00 ~ 11:30',
  tasks: '토양 수분 측정 + 병해 감지',
  droneStatus: '출발 대기 / 배터리 98%',
}

const recentAnalyses = [
  {
    date: '2025-05-05',
    area: '경기 평택시 신라면 어쩌하리',
    items: '질소(N), 인산(P), 칼륨(K), 수분, 병해 탐지',
    summary: '질소 과다, 수분 부족, 병해 3개 발견',
    aiRecommendation: '질소비료 절반 감량 / 관수량 20% 증가',
  },
  {
    date: '2025-05-06',
    area: '경기 용인시 백암면 어떤리',
    items: '질소(N), 수분, 작물 상태',
    summary: '질소 적정, 수분 과다, 작물 건강 양호',
    aiRecommendation: '관수량 10% 감소',
  },
  {
    date: '2025-05-07',
    area: '충북 청주시 상당구 무언가리',
    items: '수분, 온도, 작물 상태',
    summary: '수분 부족, 온도 적정, 작물 스트레스 경고',
    aiRecommendation: '관수량 15% 증가 / 차광막 설치',
  },
  {
    date: '2025-05-08',
    area: '충북 옥천군 동이면 23-1번지',
    items: '질소(N), 수분, 병해 탐지',
    summary: '질소 약간 부족, 수분 적정, 병해 없음',
    aiRecommendation: '질소비료 5% 보충',
  },
  // …필요 시 추가
]

const summaryData = [
  { label: '총 분석 건수', value: '8건' },
  { label: '최근 7일 내 분석', value: '3건' },
  { label: '수분 부족 감지', value: '2건' },
  { label: '병해 감지', value: '1건' },
  { label: '조치 완료율', value: '75%' },
]

const taskOptions = ['토양 수분 측정', '병해 감지', '작물 상태']
const droneOptions = ['SkyScout X1', 'AgriWing Pro', 'CropEye VTOL']

export default function AnalysisPage() {
  // (1) 예약 수정 모달
  const [openEdit, setOpenEdit] = useState(false)

  // (2) 결과 보기 모달
  const [openResultIndex, setOpenResultIndex] = useState<number | null>(null)

  // (3) 테이블 행 우측 점삼개 메뉴 제어 상태
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)
  const [menuIndex, setMenuIndex] = useState<number | null>(null)

  // (4) 예약 수정용 상태
  const [farmLocation, setFarmLocation] = useState<string>('')
  const [reservationDate, setReservationDate] = useState<string>('')
  const [reservationTime, setReservationTime] = useState<string>('')
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [selectedDrone, setSelectedDrone] = useState<string>('')

  // (5) 페이지네이션 관련 상태
  const [page, setPage] = useState(1)
  const pageSize = 2
  const pageCount = Math.ceil(recentAnalyses.length / pageSize)
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  const displayedAnalyses = recentAnalyses.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  // ▶▶▶ (6) Recharts용 데이터 가공) ◀◀◀
  const chartData = summaryData.map((row) => {
    return {
      name: row.label,
      value: parseInt(row.value.replace(/[^0-9]/g, ''), 10),
    }
  })

  // 예약 수정 모달 열기/닫기
  const handleOpenEdit = () => {
    setFarmLocation(todaySchedule.area)
    setReservationDate('2025-05-07')
    setReservationTime('10:00')
    setSelectedTasks(['토양 수분 측정', '병해 감지'])
    setSelectedDrone('SkyScout X1')
    setOpenEdit(true)
  }
  const handleCloseEdit = () => setOpenEdit(false)
  const handleModify = () => {
    alert('예약이 수정되었습니다.')
    setOpenEdit(false)
  }
  const handleDelete = () => {
    alert('예약이 삭제되었습니다.')
    setOpenEdit(false)
  }

  // 결과 보기 모달 열기/닫기
  const handleViewResult = (idx: number) => {
    setOpenResultIndex(idx)
    handleMenuClose()
  }
  const handleCloseResult = () => {
    setOpenResultIndex(null)
  }

  // PDF 생성 후 다운로드
  const handleDownloadPDF = (idx: number) => {
    handleMenuClose()
    const analysis = recentAnalyses[idx]
    const doc = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'portrait' })

    let cursorY = 60
    const left = 40
    doc.setFontSize(18)
    doc.text('분석 결과 리포트', left, cursorY)
    cursorY += 30

    doc.setFontSize(12)
    doc.text(`분석 일자: ${analysis.date}`, left, cursorY)
    cursorY += 20
    doc.text(`분석 구역: ${analysis.area}`, left, cursorY)
    cursorY += 20
    doc.text(`분석 항목: ${analysis.items}`, left, cursorY)
    cursorY += 20

    const summaryLines = doc.splitTextToSize(
      `결과 요약: ${analysis.summary}`,
      500
    )
    doc.text(summaryLines, left, cursorY)
    cursorY += summaryLines.length * 14

    const aiLines = doc.splitTextToSize(
      `AI 권장 조치: ${analysis.aiRecommendation}`,
      500
    )
    doc.text(aiLines, left, cursorY)
    cursorY += aiLines.length * 14

    doc.setFontSize(10)
    const footerY = doc.internal.pageSize.getHeight() - 40
    doc.text(`생성 일시: ${new Date().toLocaleString()}`, left, footerY)

    const filename = `analysis_${analysis.date.replace(/-/g, '')}.pdf`
    doc.save(filename)
  }

  // 테이블 행 우측 점삼개 메뉴 열기/닫기
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, idx: number) => {
    setMenuAnchorEl(event.currentTarget)
    setMenuIndex(idx)
  }
  const handleMenuClose = () => {
    setMenuAnchorEl(null)
    setMenuIndex(null)
  }

  // 작업 항목 체크박스 토글
  const handleTaskToggle = (task: string) => {
    setSelectedTasks((prev) =>
      prev.includes(task) ? prev.filter((t) => t !== task) : [...prev, task]
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: '#f9f9f9',
      }}
    >
      {/* 1) Header */}
      <Header />

      {/* 2) Main Content */}
      <Box
        component="main"
        sx={{
          mt: '64px', // AppBar 높이만큼 margin-top
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          {/* ── (1) 오늘의 일정 ── */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            <Box sx={{ flex: '1 1 400px' }}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  오늘의 일정
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', width: 120 }}>
                          일자
                        </TableCell>
                        <TableCell>{todaySchedule.date}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          작업 구역
                        </TableCell>
                        <TableCell>{todaySchedule.area}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          작업 시간
                        </TableCell>
                        <TableCell>{todaySchedule.time}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          작업 항목
                        </TableCell>
                        <TableCell>{todaySchedule.tasks}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          드론 상태
                        </TableCell>
                        <TableCell>{todaySchedule.droneStatus}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button variant="contained" size="small" onClick={handleOpenEdit}>
                    일정 수정
                  </Button>
                </Box>
              </Paper>
            </Box>

            {/* ── (2) 최근 분석 결과 ── */}
            <Box sx={{ flex: '1 1 400px' }}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  최근 분석 결과
                </Typography>

                {/* (2-1) 요약 테이블: 분석 일자 / 분석 구역 + 점삼개 버튼 */}
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', width: 100 }}>
                          분석 일자
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          분석 구역
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: 'bold', width: 40, textAlign: 'right' }}
                        >
                          {/* 점삼개 버튼 영역(빈 열) */}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {displayedAnalyses.map((row, idxOffset) => {
                        const realIdx = (page - 1) * pageSize + idxOffset
                        return (
                          <TableRow key={realIdx}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.area}</TableCell>
                            <TableCell sx={{ textAlign: 'right' }}>
                              <IconButton
                                size="small"
                                onClick={(e) => handleMenuOpen(e, realIdx)}
                              >
                                <MoreVertIcon fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* (2-2) 페이지네이션 */}
                {pageCount > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Pagination
                      count={pageCount}
                      page={page}
                      onChange={handlePageChange}
                      size="small"
                      color="primary"
                    />
                  </Box>
                )}

                {/* (2-3) 점삼개 메뉴 */}
                <Menu
                  anchorEl={menuAnchorEl}
                  open={Boolean(menuAnchorEl) && menuIndex !== null}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem
                    onClick={() => menuIndex !== null && handleViewResult(menuIndex)}
                  >
                    결과 보기
                  </MenuItem>
                  <MenuItem
                    onClick={() => menuIndex !== null && handleDownloadPDF(menuIndex)}
                  >
                    PDF 다운로드
                  </MenuItem>
                </Menu>
              </Paper>
            </Box>
          </Box>

          {/* ── (3) 분석 현황 요약 & Recharts 통계 차트 ── */}
          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            {/* (3-1) 요약 박스 */}
            <Paper elevation={3} sx={{ p: 2, flex: '1 1 50%', maxHeight: 200 }}>
              <Typography variant="h6" gutterBottom>분석 현황 요약</Typography>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    {summaryData.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell sx={{ fontWeight: 'bold', width: 150 }}>
                          {row.label}
                        </TableCell>
                        <TableCell>{row.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {/* (3-2) Recharts로 그린 통계 차트 */}
            <Paper elevation={3} sx={{ p: 2, flex: '1 1 50%', maxHeight: 200 }}>
              <Typography variant="h6" gutterBottom>통계 차트</Typography>
              <Box sx={{ width: '100%', height: 140 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-20} textAnchor="end" height={60} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#1976d2" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* ── 수정/삭제 모달 ── */}
      <Dialog open={openEdit} onClose={handleCloseEdit} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={handleCloseEdit} size="small">
            <ArrowBackIcon />
          </IconButton>
          예약 상세 확인 및 수정
        </DialogTitle>
        <DialogContent dividers>
          {/* 농장 위치 */}
          <Box sx={{ mt: 1 }}>
            <Typography variant="body1" sx={{ mb: 0.5 }}>농장 위치</Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={farmLocation}
              onChange={(e) => setFarmLocation(e.target.value)}
            />
          </Box>
          {/* 예약 날짜 */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 0.5 }}>예약 날짜</Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
            />
          </Box>
          {/* 예약 시간 */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 0.5 }}>예약 시간</Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              type="time"
              InputLabelProps={{ shrink: true }}
              value={reservationTime}
              onChange={(e) => setReservationTime(e.target.value)}
            />
          </Box>
          {/* 작업 항목 체크박스 */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 0.5 }}>작업 항목</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {taskOptions.map((task) => (
                <FormControlLabel
                  key={task}
                  control={
                    <Checkbox
                      checked={selectedTasks.includes(task)}
                      onChange={() => handleTaskToggle(task)}
                    />
                  }
                  label={task}
                />
              ))}
            </Box>
          </Box>
          {/* 드론 기체 선택 */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 0.5 }}>드론 기체 선택 (선택)</Typography>
            <FormControl fullWidth size="small">
              <InputLabel>기체 선택</InputLabel>
              <Select
                value={selectedDrone}
                label="기체 선택"
                onChange={(e) => setSelectedDrone(e.target.value)}
              >
                {droneOptions.map((drone) => (
                  <MenuItem key={drone} value={drone}>
                    {drone}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button color="error" variant="contained" onClick={handleDelete}>
            삭제하기
          </Button>
          <Box sx={{ flex: 1 }} />
          <Button variant="contained" onClick={handleModify}>
            수정하기
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── 결과 보기 모달 ── */}
      <Dialog open={openResultIndex !== null} onClose={handleCloseResult} fullWidth maxWidth="sm">
        <DialogTitle>분석 결과 상세</DialogTitle>
        {openResultIndex !== null && (
          <>
            <DialogContent dividers>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>분석 일자:</Typography>
                <Typography variant="body2">{recentAnalyses[openResultIndex].date}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>분석 구역:</Typography>
                <Typography variant="body2">{recentAnalyses[openResultIndex].area}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>분석 항목:</Typography>
                <Typography variant="body2">{recentAnalyses[openResultIndex].items}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>결과 요약:</Typography>
                <Typography variant="body2">{recentAnalyses[openResultIndex].summary}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>AI 권장 조치:</Typography>
                <Typography variant="body2">{recentAnalyses[openResultIndex].aiRecommendation}</Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2, gap: 2 }}>
              <Button onClick={handleCloseResult}>닫기</Button>
              <Button variant="outlined" size="small" onClick={() => handleDownloadPDF(openResultIndex!)}>
                PDF 다운로드
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}
