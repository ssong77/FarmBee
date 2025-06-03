// src/pages/AdminSystemSettingsPage.tsx

import React, { useState, useMemo } from 'react';
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
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Pagination,

} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Feedback {
  id: number;
  date: string;         // 작성날짜
  username: string;     // 사용자 이름
  email: string;        // 이메일
  content: string;      // 피드백 내용
  status: '미처리' | '완료'; // 처리 상태
}

interface Notice {
  id: number;
  title: string;        // 공지 제목
  date: string;         // 공지 날짜
  body: string;         // 공지 내용
}

const initialFeedbacks: Feedback[] = [
  {
    id: 1,
    date: '2025-05-11',
    username: '홍길동',
    email: 'o1@naver.com',
    content: '분석결과가 늦게 나옵니다.',
    status: '미처리',
  },
  {
    id: 2,
    date: '2025-05-12',
    username: '아무개',
    email: 'a1@gmail.com',
    content: '예약 취소 요청 되지 않아요.',
    status: '완료',
  },
  {
    id: 3,
    date: '2025-05-13',
    username: '김철수',
    email: 'chulsu@example.com',
    content: '페이지가 깜빡거립니다.',
    status: '미처리',
  },
  {
    id: 4,
    date: '2025-05-14',
    username: '박영희',
    email: 'younghee@example.com',
    content: '로그인 오류가 발생합니다.',
    status: '미처리',
  },
  {
    id: 5,
    date: '2025-05-15',
    username: '이민호',
    email: 'minho@example.com',
    content: '통계 결과가 틀립니다.',
    status: '완료',
  },
  {
    id: 6,
    date: '2025-05-16',
    username: '최수지',
    email: 'suji@example.com',
    content: '예약 페이지 로딩이 느립니다.',
    status: '미처리',
  },
  // … 필요에 따라 더미 데이터를 추가 …
];

const initialNotices: Notice[] = [
  {
    id: 1,
    title: '분석 기능 개선 안내',
    date: '2025-05-01',
    body: '새롭게 업데이트된 분석 엔진이 적용되었습니다.',
  },
  {
    id: 2,
    title: '5월 점검 일정 안내',
    date: '2025-05-03',
    body: '2025-05-10 02:00~04:00 사이 서버 점검이 예정되어 있습니다.',
  },
];

export default function AdminSystemSettingsPage() {
  // 사용자 피드백 상태
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedbacks);
  // 공지사항 상태
  const [notices, setNotices] = useState<Notice[]>(initialNotices);

  // ─── 피드백 페이징 로직 ───
  const [feedbackPage, setFeedbackPage] = useState<number>(1);
  const feedbacksPerPage = 3; // 한 페이지에 보여줄 피드백 개수
  const totalFeedbackPages = Math.ceil(feedbacks.length / feedbacksPerPage);
  const displayedFeedbacks = useMemo(() => {
    const start = (feedbackPage - 1) * feedbacksPerPage;
    return feedbacks.slice(start, start + feedbacksPerPage);
  }, [feedbacks, feedbackPage]);

  const handleFeedbackPageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setFeedbackPage(value);
  };

  // ─── 피드백 답변 모달 상태 ───
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState<boolean>(false);
  const [currentFeedbackId, setCurrentFeedbackId] = useState<number | null>(null);
  const [feedbackReply, setFeedbackReply] = useState<string>('');

  // 피드백 “답변” 버튼 클릭
  const handleOpenFeedbackDialog = (id: number) => {
    setCurrentFeedbackId(id);
    setFeedbackReply('');
    setOpenFeedbackDialog(true);
  };
  const handleCloseFeedbackDialog = () => {
    setOpenFeedbackDialog(false);
    setCurrentFeedbackId(null);
    setFeedbackReply('');
  };
  const handleSubmitFeedbackReply = () => {
    if (currentFeedbackId == null) return;
    setFeedbacks((prev) =>
      prev.map((f) =>
        f.id === currentFeedbackId ? { ...f, status: '완료' } : f
      )
    );
    handleCloseFeedbackDialog();
  };

  // ─── 공지사항 등록/수정 모달 상태 ───
  const [openNoticeDialog, setOpenNoticeDialog] = useState<boolean>(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [noticeTitle, setNoticeTitle] = useState<string>('');
  const [noticeDate, setNoticeDate] = useState<string>('');
  const [noticeBody, setNoticeBody] = useState<string>('');

  // 공지사항 “추가” 또는 “수정” 버튼 클릭
  const handleOpenNoticeDialog = (notice?: Notice) => {
    if (notice) {
      setEditingNotice(notice);
      setNoticeTitle(notice.title);
      setNoticeDate(notice.date);
      setNoticeBody(notice.body);
    } else {
      setEditingNotice(null);
      setNoticeTitle('');
      setNoticeDate('');
      setNoticeBody('');
    }
    setOpenNoticeDialog(true);
  };
  const handleCloseNoticeDialog = () => {
    setOpenNoticeDialog(false);
    setEditingNotice(null);
    setNoticeTitle('');
    setNoticeDate('');
    setNoticeBody('');
  };
  const handleSubmitNotice = () => {
    if (editingNotice) {
      // 수정
      setNotices((prev) =>
        prev.map((n) =>
          n.id === editingNotice.id
            ? { ...n, title: noticeTitle, date: noticeDate, body: noticeBody }
            : n
        )
      );
    } else {
      // 추가
      const newNotice: Notice = {
        id: notices.length > 0 ? Math.max(...notices.map((n) => n.id)) + 1 : 1,
        title: noticeTitle,
        date: noticeDate,
        body: noticeBody,
      };
      setNotices((prev) => [...prev, newNotice]);
    }
    handleCloseNoticeDialog();
  };

  // 공지사항 삭제
  const handleDeleteNotice = (id: number) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ pt: 4, pb: 6 }}>
        <Typography variant="h5" gutterBottom>
          시스템 설정
        </Typography>

        {/* ─── 사용자 피드백 관리 섹션 ─── */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            사용자 피드백 관리
          </Typography>
          <Paper elevation={2}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">
                      번호
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">
                      작성날짜
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>사용자</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>이메일</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>내용</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">
                      상태
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">
                      관리
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedFeedbacks.map((fb) => (
                    <TableRow key={fb.id}>
                      <TableCell align="center">{fb.id}</TableCell>
                      <TableCell align="center">{fb.date}</TableCell>
                      <TableCell>{fb.username}</TableCell>
                      <TableCell>{fb.email}</TableCell>
                      <TableCell>{fb.content}</TableCell>
                      <TableCell align="center">{fb.status}</TableCell>
                      <TableCell align="center">
                        <Button
                          size="small"
                          variant="contained"
                          disabled={fb.status === '완료'}
                          onClick={() => handleOpenFeedbackDialog(fb.id)}
                        >
                          답변
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {displayedFeedbacks.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                        조회된 피드백이 없습니다.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* 피드백 페이징 */}
          {totalFeedbackPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Pagination
                count={totalFeedbackPages}
                page={feedbackPage}
                onChange={handleFeedbackPageChange}
                size="small"
              />
            </Box>
          )}
        </Box>

        {/* ─── 공지사항 관리 섹션 ─── */}
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1,
            }}
          >
            <Typography variant="h6">공지사항 관리</Typography>
            <Button
              size="small"
              variant="contained"
              onClick={() => handleOpenNoticeDialog()}
            >
              공지 등록
            </Button>
          </Box>
          <Paper elevation={2}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">
                      번호
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>제목</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">
                      날짜
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">
                      관리
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {notices.map((nt) => (
                    <TableRow key={nt.id}>
                      <TableCell align="center">{nt.id}</TableCell>
                      <TableCell>{nt.title}</TableCell>
                      <TableCell align="center">{nt.date}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenNoticeDialog(nt)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteNotice(nt.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {notices.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                        등록된 공지사항이 없습니다.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>

        {/* ─── 피드백 답변 Dialog ─── */}
        <Dialog
          open={openFeedbackDialog}
          onClose={handleCloseFeedbackDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>피드백 답변</DialogTitle>
          <DialogContent dividers>
            <TextField
              label="답변 내용"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={feedbackReply}
              onChange={(e) => setFeedbackReply(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFeedbackDialog}>취소</Button>
            <Button variant="contained" onClick={handleSubmitFeedbackReply}>
              제출
            </Button>
          </DialogActions>
        </Dialog>

        {/* ─── 공지사항 등록/수정 Dialog ─── */}
        <Dialog
          open={openNoticeDialog}
          onClose={handleCloseNoticeDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            {editingNotice ? '공지사항 수정' : '공지사항 등록'}
          </DialogTitle>
          <DialogContent dividers>
            <TextField
              label="제목"
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              value={noticeTitle}
              onChange={(e) => setNoticeTitle(e.target.value)}
            />
            <TextField
              label="날짜"
              type="date"
              fullWidth
              variant="outlined"
              
              sx={{ mb: 2 }}
              value={noticeDate}
              onChange={(e) => setNoticeDate(e.target.value)}
            />
            <TextField
              label="내용"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={noticeBody}
              onChange={(e) => setNoticeBody(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseNoticeDialog}>취소</Button>
            <Button variant="contained" onClick={handleSubmitNotice}>
              {editingNotice ? '수정 완료' : '등록'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
