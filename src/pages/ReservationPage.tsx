// src/pages/ReservationPage.tsx
import React, { useState } from 'react'

// 
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,      // ← 누락되었다면 반드시 추가
  InputLabel,       // ← 누락되었다면 반드시 추가
  Select,           // ← 누락되었다면 반드시 추가
  Button,
} from '@mui/material'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Header from '../components/Header'

// ─── 더미 예약 데이터 (총 10개) ───
interface Reservation {
  id: number
  date: string      // 예약 일자 (예: '2025-05-10')
  area: string      // 작업 구역 (예: '충북 옥천군 동이면 23-1번지')
  time: string      // 예약 시간 (예: '10:00 ~ 11:30')
  tasks: string[]   // 작업 항목 (예: ['토양 수분 측정','병해 감지'])
  drone: string     // 드론 기체 (예: 'SkyScout X1')
  status: '대기' | '진행중' | '완료' | '취소' // 예약 상태
}

const dummyReservations: Reservation[] = [
  {
    id: 1,
    date: '2025-05-10',
    area: '충북 옥천군 동이면 23-1번지',
    time: '10:00 ~ 11:30',
    tasks: ['토양 수분 측정', '병해 감지'],
    drone: 'SkyScout X1',
    status: '대기',
  },
  {
    id: 2,
    date: '2025-05-11',
    area: '경기 평택시 신라면 어쩌하리',
    time: '11:00 ~ 12:30',
    tasks: ['작물 상태'],
    drone: 'AgriWing Pro',
    status: '진행중',
  },
  {
    id: 3,
    date: '2025-05-12',
    area: '충북 청주시 상당구 무언가리',
    time: '09:00 ~ 10:00',
    tasks: ['수분 측정'],
    drone: 'CropEye VTOL',
    status: '완료',
  },
  {
    id: 4,
    date: '2025-05-13',
    area: '대전 유성구 어딘가리',
    time: '14:00 ~ 15:00',
    tasks: ['병해 감지'],
    drone: 'SkyScout X1',
    status: '취소',
  },
  {
    id: 5,
    date: '2025-05-14',
    area: '경남 창원시 합포구 무언가로',
    time: '13:00 ~ 14:30',
    tasks: ['토양 수분 측정', '작물 상태'],
    drone: 'AgriWing Pro',
    status: '대기',
  },
  {
    id: 6,
    date: '2025-05-15',
    area: '경북 구미시 금오산로',
    time: '10:30 ~ 11:30',
    tasks: ['병해 감지'],
    drone: 'CropEye VTOL',
    status: '진행중',
  },
  {
    id: 7,
    date: '2025-05-16',
    area: '충북 제천시 한수면 어디로',
    time: '15:00 ~ 16:00',
    tasks: ['작물 상태'],
    drone: 'SkyScout X1',
    status: '대기',
  },
  {
    id: 8,
    date: '2025-05-17',
    area: '경남 밀양시 삼문동 일부로',
    time: '09:30 ~ 10:30',
    tasks: ['수분 측정'],
    drone: 'AgriWing Pro',
    status: '완료',
  },
  {
    id: 9,
    date: '2025-05-18',
    area: '전북 전주시 완산구 어디',
    time: '11:00 ~ 12:00',
    tasks: ['병해 감지', '작물 상태'],
    drone: 'CropEye VTOL',
    status: '대기',
  },
  {
    id: 10,
    date: '2025-05-19',
    area: '광주 북구 운암동 길',
    time: '14:30 ~ 15:30',
    tasks: ['토양 수분 측정'],
    drone: 'SkyScout X1',
    status: '완료',
  },
]

// ─── ReservationPage 컴포넌트 ───
export default function ReservationPage() {
  // 실제로는 API 호출로 받아온 데이터를 상태로 관리
  const [reservations, setReservations] =
    useState<Reservation[]>(dummyReservations)

  // (A) 페이지네이션 상태
  const [page, setPage] = useState(1)
  const pageSize = 5 // 한 페이지에 5개씩 노출
  const pageCount = Math.ceil(reservations.length / pageSize)
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  // 현재 페이지에 보여줄 예약 리스트
  const displayedReservations = reservations.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  // (B) “수정/삭제” 메뉴 상태
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)
  const [menuIndex, setMenuIndex] = useState<number | null>(null)

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>, id: number) => {
    setMenuAnchorEl(e.currentTarget)
    setMenuIndex(id)
  }
  const handleMenuClose = () => {
    setMenuAnchorEl(null)
    setMenuIndex(null)
  }

  // (C) “수정” 다이얼로그 상태
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false)
  const [currentEditId, setCurrentEditId] = useState<number | null>(null)

  // (D) 편집 필드 상태
  const [editDate, setEditDate] = useState<string>('')
  const [editTime, setEditTime] = useState<string>('')
  const [editArea, setEditArea] = useState<string>('')
  const [editTasks, setEditTasks] = useState<string[]>([])
  const [editDrone, setEditDrone] = useState<string>('')
  const [editStatus, setEditStatus] = useState<Reservation['status']>('대기')

  // (E) 작업 항목 옵션 & 드론 옵션
  const taskOptions = ['토양 수분 측정', '병해 감지', '작물 상태']
  const droneOptions = ['SkyScout X1', 'AgriWing Pro', 'CropEye VTOL']

  // (F) “수정” 다이얼로그 열기
  const handleOpenEditDialog = (res: Reservation) => {
    setCurrentEditId(res.id)
    setEditDate(res.date)
    setEditTime(res.time)
    setEditArea(res.area)
    setEditTasks(res.tasks)
    setEditDrone(res.drone)
    setEditStatus(res.status)
    setOpenEditDialog(true)
    handleMenuClose()
  }

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false)
    setCurrentEditId(null)
  }

  // (G) “수정 저장” 로직 (더미: state 업데이트)
  const handleSaveEdit = () => {
    if (currentEditId === null) return
    setReservations((prev) =>
      prev.map((r) =>
        r.id === currentEditId
          ? {
              ...r,
              date: editDate,
              time: editTime,
              area: editArea,
              tasks: editTasks,
              drone: editDrone,
              status: editStatus,
            }
          : r
      )
    )
    handleCloseEditDialog()
  }

  // (H) “삭제” 로직 (더미: state에서 제거)
  const handleDeleteReservation = (id: number) => {
    handleMenuClose()
    setReservations((prev) => prev.filter((r) => r.id !== id))
    // 삭제 후 페이지 인덱스가 초과된다면 마지막 페이지로 조정
    const newCount = Math.ceil((reservations.length - 1) / pageSize)
    if (page > newCount && newCount > 0) {
      setPage(newCount)
    }
  }

  // (I) 작업 항목 체크박스 토글
  const handleTaskToggle = (task: string) => {
    setEditTasks((prev) =>
      prev.includes(task) ? prev.filter((t) => t !== task) : [...prev, task]
    )
  }

  // ─── (J) “드론 비행 요청” 모달 상태 및 필드 ───
  const [openRequestDialog, setOpenRequestDialog] = useState<boolean>(false)

  // 요청 폼 필드
  const [reqArea, setReqArea] = useState<string>('')
  const [reqDate, setReqDate] = useState<string>('')
  const [reqTime, setReqTime] = useState<string>('')
  const [reqTasks, setReqTasks] = useState<string[]>([])
  const [reqNotes, setReqNotes] = useState<string>('')

  const handleOpenRequestDialog = () => {
    // 초기값 비워두기
    setReqArea('')
    setReqDate('')
    setReqTime('')
    setReqTasks([])
    setReqNotes('')
    setOpenRequestDialog(true)
  }
  const handleCloseRequestDialog = () => {
    setOpenRequestDialog(false)
  }

  // 요청 폼 제출 (더미: console.log → 실제 API 호출로 교체)
  const handleSubmitRequest = () => {
    console.log({
      area: reqArea,
      date: reqDate,
      time: reqTime,
      tasks: reqTasks,
      notes: reqNotes,
    })
    // 실제 요청 로직을 여기에 작성 (예: API 호출)
    setOpenRequestDialog(false)
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
      {/* Header */}
      <Header />

      {/* Main Content */}
      <Box component="main" sx={{ mt: '64px', flexGrow: 1, py: 4 }}>
        <Container maxWidth="lg">
          {/* ── 타이틀 + 요청 버튼 (우측) ── */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <Typography variant="h5">예약관리</Typography>
            <Button variant="contained" onClick={handleOpenRequestDialog}>
              드론 비행 요청
            </Button>
          </Box>

          <Paper elevation={3} sx={{ p: 2 }}>
            {/* ── 예약 테이블 ── */}
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>예약 ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>예약 일자</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>작업 구역</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>작업 항목</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>드론 기체</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>상태</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                      
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedReservations.map((res) => (
                    <TableRow key={res.id}>
                      <TableCell>{res.id}</TableCell>
                      <TableCell>{res.date}</TableCell>
                      <TableCell>{res.area}</TableCell>
                      <TableCell>{res.tasks.join(', ')}</TableCell>
                      <TableCell>{res.drone}</TableCell>
                      <TableCell>{res.status}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, res.id)}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {displayedReservations.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} sx={{ textAlign: 'center', py: 3 }}>
                        예약된 내역이 없습니다.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* ── 페이지네이션 ── */}
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

            {/* ── 점삼개 메뉴 (수정 / 삭제) ── */}
            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl) && menuIndex !== null}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem
                onClick={() => {
                  const res = reservations.find((r) => r.id === menuIndex)
                  if (res) handleOpenEditDialog(res)
                }}
              >
                수정
              </MenuItem>
              <MenuItem
                onClick={() => {
                  if (menuIndex !== null) handleDeleteReservation(menuIndex)
                }}
              >
                삭제
              </MenuItem>
            </Menu>
          </Paper>
        </Container>
      </Box>

      {/* ─── “수정” 다이얼로그 ─── */}
      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={handleCloseEditDialog} size="small">
            <ArrowBackIcon />
          </IconButton>
          예약 수정
        </DialogTitle>
        <DialogContent dividers>
          {/* 예약 일자 */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              예약 일자
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
            />
          </Box>

          {/* 예약 시간 */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              예약 시간
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              type="time"
              InputLabelProps={{ shrink: true }}
              value={editTime}
              onChange={(e) => setEditTime(e.target.value)}
            />
          </Box>

          {/* 작업 구역 */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              작업 구역
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={editArea}
              onChange={(e) => setEditArea(e.target.value)}
            />
          </Box>

          {/* 작업 항목 체크박스 */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              작업 항목
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {taskOptions.map((task) => (
                <FormControlLabel
                  key={task}
                  control={
                    <Checkbox
                      checked={editTasks.includes(task)}
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
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              드론 기체 선택
            </Typography>
            <FormControl fullWidth size="small">
              <InputLabel>기체 선택</InputLabel>
              <Select
                value={editDrone}
                label="기체 선택"
                onChange={(e) => setEditDrone(e.target.value)}
              >
                {droneOptions.map((drone) => (
                  <MenuItem key={drone} value={drone}>
                    {drone}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* 상태 변경 */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              상태
            </Typography>
            <FormControl fullWidth size="small">
              <InputLabel>상태 선택</InputLabel>
              <Select
                value={editStatus}
                label="상태 선택"
                onChange={(e) =>
                  setEditStatus(e.target.value as Reservation['status'])
                }
              >
                <MenuItem value="대기">대기</MenuItem>
                <MenuItem value="진행중">진행중</MenuItem>
                <MenuItem value="완료">완료</MenuItem>
                <MenuItem value="취소">취소</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button color="error" variant="contained" onClick={handleCloseEditDialog}>
            취소
          </Button>
          <Box sx={{ flex: 1 }} />
          <Button variant="contained" onClick={handleSaveEdit}>
            저장
          </Button>
        </DialogActions>
      </Dialog>

      {/* ─── “드론 비행 요청” 모달 ─── */}
      <Dialog
        open={openRequestDialog}
        onClose={handleCloseRequestDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>드론 비행 요청</DialogTitle>
        <DialogContent dividers>
          {/* 대상 구역(농장) */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              대상 구역 (농장)
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="농장 위치를 입력하세요"
              value={reqArea}
              onChange={(e) => setReqArea(e.target.value)}
            />
          </Box>

          {/* 날짜 선택 */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              날짜 선택
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={reqDate}
              onChange={(e) => setReqDate(e.target.value)}
            />
          </Box>

          {/* 시간 선택 */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              시간 선택
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              type="time"
              InputLabelProps={{ shrink: true }}
              value={reqTime}
              onChange={(e) => setReqTime(e.target.value)}
            />
          </Box>

          {/* 비행 목적 체크박스 */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              비행 목적
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {taskOptions.map((task) => (
                <FormControlLabel
                  key={task}
                  control={
                    <Checkbox
                      checked={reqTasks.includes(task)}
                      onChange={() => {
                        setReqTasks((prev) =>
                          prev.includes(task)
                            ? prev.filter((t) => t !== task)
                            : [...prev, task]
                        )
                      }}
                    />
                  }
                  label={task}
                />
              ))}
            </Box>
          </Box>

          {/* 비고 입력 */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              비고
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="추가로 남길 메모가 있으면 작성하세요"
              value={reqNotes}
              onChange={(e) => setReqNotes(e.target.value)}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button color="error" variant="contained" onClick={handleCloseRequestDialog}>
            취소
          </Button>
          <Box sx={{ flex: 1 }} />
          <Button variant="contained" onClick={handleSubmitRequest}>
            비행 요청
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
