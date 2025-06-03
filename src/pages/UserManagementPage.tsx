// src/pages/UserManagementPage.tsx

import React, { useState, useMemo } from 'react'
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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem as SelectMenuItem,

} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'


// ─── 더미 사용자 데이터 ───
interface User {
  id: number
  joinDate: string   // 가입일 (예: '2025-01-11')
  username: string   // 사용자 이름 (예: '홍길동')
  email: string      // 이메일 (예: 'o1@naver.com')
  role: '사용자' | '관리자'
  status: '정상' | '차단'
}

const initialUsers: User[] = [
  { id: 1, joinDate: '2025-01-11', username: '홍길동', email: 'o1@naver.com', role: '사용자', status: '정상' },
  { id: 2, joinDate: '2025-01-26', username: '아무개', email: 'a1@gmail.com', role: '관리자', status: '정상' },
  { id: 3, joinDate: '2025-02-05', username: '김철수', email: 'chulsu@example.com', role: '사용자', status: '차단' },
  { id: 4, joinDate: '2025-03-18', username: '박영희', email: 'younghee@example.com', role: '사용자', status: '정상' },
  { id: 5, joinDate: '2025-04-02', username: '이민호', email: 'minho@example.com', role: '관리자', status: '정상' },
  { id: 6, joinDate: '2025-04-20', username: '최수지', email: 'suji@example.com', role: '사용자', status: '정상' },
  { id: 7, joinDate: '2025-05-01', username: '정다은', email: 'daeun@example.com', role: '사용자', status: '차단' },
  { id: 8, joinDate: '2025-05-03', username: '류지훈', email: 'jihun@example.com', role: '관리자', status: '정상' },
  { id: 9, joinDate: '2025-05-07', username: '송하린', email: 'harin@example.com', role: '사용자', status: '정상' },
  { id: 10, joinDate: '2025-05-09', username: '오세준', email: 'sejun@example.com', role: '사용자', status: '정상' },
  { id: 11, joinDate: '2025-05-12', username: '이수민', email: 'sumin@example.com', role: '사용자', status: '정상' },
  { id: 12, joinDate: '2025-05-14', username: '강민호', email: 'minho2@example.com', role: '관리자', status: '정상' },
]

export default function UserManagementPage() {
  // (1) 사용자 목록 상태
  const [users, setUsers] = useState<User[]>(initialUsers)

  // (2) 검색어 및 권한 필터 상태
  const [searchText, setSearchText] = useState<string>('')
  const [roleFilter, setRoleFilter] = useState<'전체' | '사용자' | '관리자'>('전체')

  // (3) 페이지네이션 상태
  const [page, setPage] = useState<number>(1)
  const pageSize = 5
  const filteredUsers = useMemo(() => {
    // 검색어(이름 or 이메일) 필터
    let tmp = users.filter((u) => {
      const txt = searchText.trim().toLowerCase()
      return (
        u.username.toLowerCase().includes(txt) ||
        u.email.toLowerCase().includes(txt)
      )
    })
    // 권한(role) 필터
    if (roleFilter !== '전체') {
      tmp = tmp.filter((u) => u.role === roleFilter)
    }
    return tmp
  }, [users, searchText, roleFilter])

  const pageCount = Math.ceil(filteredUsers.length / pageSize)
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  const displayedUsers = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredUsers.slice(start, start + pageSize)
  }, [filteredUsers, page])

  // (4) 점삼개 메뉴 상태
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)
  const [menuUserId, setMenuUserId] = useState<number | null>(null)

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>, id: number) => {
    setMenuAnchorEl(e.currentTarget)
    setMenuUserId(id)
  }
  const handleMenuClose = () => {
    setMenuAnchorEl(null)
    setMenuUserId(null)
  }

  // (5) 사용자 삭제 / 차단 / 해제 함수
  const deleteUser = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
    handleMenuClose()
    // 페이지 인덱스 조정
    const newCount = Math.ceil((filteredUsers.length - 1) / pageSize)
    if (page > newCount && newCount > 0) {
      setPage(newCount)
    }
  }
  const blockUser = (id: number) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: '차단' } : u))
    )
    handleMenuClose()
  }
  const unblockUser = (id: number) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: '정상' } : u))
    )
    handleMenuClose()
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
      {/* 공통 Header */}
  

      {/* Main Content */}
      <Box component="main" sx={{ mt: '64px', py: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h5" gutterBottom>
            사용자 관리
          </Typography>

          {/* ─── (6) 상단 툴바: 검색창 + 권한 필터 ─── */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              mb: 2,
            }}
          >
            {/* 검색창 */}
            <TextField
              size="small"
              label="검색 (이름 또는 이메일)"
              variant="outlined"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value)
                setPage(1)
              }}
              sx={{ flex: '1 1 300px' }}
            />

            {/* 권한 필터 */}
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>권한 필터</InputLabel>
              <Select
                value={roleFilter}
                label="권한 필터"
                onChange={(e) => {
                  setRoleFilter(e.target.value as '전체' | '사용자' | '관리자')
                  setPage(1)
                }}
              >
                <SelectMenuItem value="전체">전체</SelectMenuItem>
                <SelectMenuItem value="사용자">사용자</SelectMenuItem>
                <SelectMenuItem value="관리자">관리자</SelectMenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* ─── (7) 사용자 표 ─── */}
          <Paper elevation={3}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', width: 80 }} align="center">
                      번호
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', width: 120 }} align="center">
                      가입일
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="left">
                      사용자
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="left">
                      이메일
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', width: 100 }} align="center">
                      권한
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', width: 100 }} align="center">
                      상태
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', width: 80 }} align="right">
                      관리
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell align="center">{user.id}</TableCell>
                      <TableCell align="center">{user.joinDate}</TableCell>
                      <TableCell align="left">{user.username}</TableCell>
                      <TableCell align="left">{user.email}</TableCell>
                      <TableCell align="center">{user.role}</TableCell>
                      <TableCell align="center">{user.status}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, user.id)}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}

                  {displayedUsers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                        조회된 사용자가 없습니다.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* ─── (8) 페이지네이션 ─── */}
            {pageCount > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={handlePageChange}
                  size="small"
                  color="primary"
                />
              </Box>
            )}

            {/* ─── (9) 점삼개 메뉴 (삭제/차단/해제) ─── */}
            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl) && menuUserId !== null}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem
                onClick={() => {
                  if (menuUserId !== null) deleteUser(menuUserId)
                }}
              >
                삭제
              </MenuItem>
              {menuUserId !== null && (
                users.find((u) => u.id === menuUserId)?.status === '정상' ? (
                  <MenuItem onClick={() => blockUser(menuUserId)}>
                    차단
                  </MenuItem>
                ) : (
                  <MenuItem onClick={() => unblockUser(menuUserId)}>
                    해제
                  </MenuItem>
                )
              )}
            </Menu>
          </Paper>
        </Container>
      </Box>
    </Box>
  )
}
